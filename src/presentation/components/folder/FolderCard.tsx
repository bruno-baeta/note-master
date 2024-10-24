import React, { useState } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import { ReactComponent as FolderSvgIcon } from '../../assets/ic-folder.svg';
import styles from './FolderCard.module.css';
import { Folder } from "../../../domain/models/Folder";
import FolderOptionsModal from "../modals/folder-options-modal/FolderOptionsModal";
import { useNavigate } from 'react-router-dom';

interface FolderProps {
    folder: Folder;
}

const FolderCard = ({ folder }: FolderProps) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalPosition, setModalPosition] = useState<{ x: number, y: number } | null>(null);
    const navigate = useNavigate();

    const handleOptionsClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        const rect = event.currentTarget.getBoundingClientRect();
        setModalPosition({ x: rect.right + 10, y: rect.top });
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleFolderClick = (event: React.MouseEvent) => {
        if (!isModalOpen) {
            navigate(`/folder/${folder.id}`, { state: { folder } });
        }
    };

    return (
        <div className={styles.folderWrapper} onClick={handleFolderClick}>
            <FolderSvgIcon className={styles.folderIcon} />
            <span className={styles.folderName}>{folder.name}</span>
            <FiMoreVertical
                className={styles.optionsIcon}
                onClick={handleOptionsClick}
            />

            {isModalOpen && modalPosition && (
                <FolderOptionsModal
                    position={modalPosition}
                    folder={folder}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default FolderCard;
