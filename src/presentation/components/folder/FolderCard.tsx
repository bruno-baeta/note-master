import React, { useState } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import { ReactComponent as FolderSvgIcon } from '../../assets/ic-folder.svg';
import styles from './FolderCard.module.css';
import { Folder } from "../../../domain/models/Folder";
import FolderOptionsModal from "../modals/folder-options-modal/FolderOptionsModal";

interface FolderProps {
    folder: Folder;
}

const FolderCard = ({ folder }: FolderProps) => {
    const [isModalOpen, setModalOpen] = useState(false); // Estado para abrir o modal
    const [modalPosition, setModalPosition] = useState<{ x: number, y: number } | null>(null);

    const handleOptionsClick = (event: React.MouseEvent) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setModalPosition({ x: rect.right + 10, y: rect.top });
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <div className={styles.folderWrapper}>
            <FolderSvgIcon className={styles.folderIcon} />
            <span className={styles.folderName}>{folder.name}</span>
            <FiMoreVertical className={styles.optionsIcon} onClick={handleOptionsClick} />

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
