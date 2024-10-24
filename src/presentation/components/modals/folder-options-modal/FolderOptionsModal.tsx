import React, { useState, useEffect } from 'react';
import DeleteModal from '../delete-modal/DeleteModal';
import InputModal from '../input-modal/InputModal';
import styles from './FolderOptionsModal.module.css';
import { useManagementContext } from "../../../../infra/context-api/management/ManagementContextProvider";
import { Folder } from "../../../../domain/models/Folder";

interface FolderOptionsModalProps {
    position: { x: number, y: number };
    folder: Folder;
    onClose: () => void;
}

const FolderOptionsModal = ({ position, folder, onClose }: FolderOptionsModalProps) => {
    const { handleDeleteFolder, handleUpdateFolder } = useManagementContext();
    const [currentSubModal, setCurrentSubModal] = useState<string | null>(null);
    const [adjustedPosition, setAdjustedPosition] = useState(position);

    useEffect(() => {
        const modalWidth = 200;
        const modalHeight = 100;

        const adjustedX = position.x + modalWidth > window.innerWidth ? window.innerWidth - modalWidth - 20 : position.x;
        const adjustedY = position.y + modalHeight > window.innerHeight ? window.innerHeight - modalHeight - 20 : position.y;

        setAdjustedPosition({ x: adjustedX, y: adjustedY });
    }, [position]);

    const handleRenameFolder = async (newFolderName: string) => {
        await handleUpdateFolder(newFolderName, folder);
        setCurrentSubModal(null);
        onClose();
    };

    const handleDeleteFolderConfirm = async () => {
        await handleDeleteFolder(folder.id!!, folder.userId);
        setCurrentSubModal(null);
        onClose();
    };

    const openSubModal = (modalType: string) => {
        setCurrentSubModal(modalType);
    };

    const handleBackdropClick = () => {
        if (!currentSubModal) {
            onClose();
        }
    };

    const closeBothModals = () => {
        setCurrentSubModal(null);
        onClose();
    };

    return (
        <>
            <div className={styles.backdrop} onClick={handleBackdropClick} />

            {!currentSubModal && (
                <div className={styles.modalWrapper} style={{ top: adjustedPosition.y, left: adjustedPosition.x }}>
                    <ul className={styles.optionList}>
                        <li className={styles.optionItem} onClick={() => openSubModal('inputModal')}>
                            Renomear
                        </li>
                        <hr className={styles.divider} />
                        <li className={styles.optionItem} onClick={() => openSubModal('deleteModal')}>
                            Deletar
                        </li>
                    </ul>
                </div>
            )}

            {currentSubModal === 'inputModal' && (
                <InputModal
                    title="Renomear Pasta"
                    placeholder="Digite o novo nome"
                    buttonText="Renomear"
                    onSubmit={handleRenameFolder}
                    onClose={closeBothModals}
                />
            )}

            {currentSubModal === 'deleteModal' && (
                <DeleteModal
                    title="Apagar Pasta"
                    message={`Tem certeza de que deseja apagar a pasta "${folder.name}"? Esta ação não pode ser desfeita.`}
                    confirmText="Confirmar"
                    cancelText="Cancelar"
                    onConfirm={handleDeleteFolderConfirm}
                    onClose={closeBothModals}
                />
            )}
        </>
    );
};

export default FolderOptionsModal;
