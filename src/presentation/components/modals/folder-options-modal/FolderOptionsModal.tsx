import React, { useState } from 'react';
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
                <div className={styles.modalWrapper} style={{ top: position.y, left: position.x }}>
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
