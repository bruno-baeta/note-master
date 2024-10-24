import React, { useState } from 'react';
import DeleteModal from '../delete-modal/DeleteModal';
import InputModal from '../input-modal/InputModal';
import styles from './FolderOptionsModal.module.css';
import { useManagementContext } from "../../../../infra/context-api/user/UserManagementContext";
import {Folder} from "../../../../domain/models/Folder";

interface FolderOptionsModalProps {
    position: { x: number, y: number };
    folder: Folder;
    onClose: () => void;
}

const FolderOptionsModal = ({ position, folder, onClose }: FolderOptionsModalProps) => {
    const { handleDeleteFolder, handleUpdateFolder } = useManagementContext();

    const [currentModal, setCurrentModal] = useState<string | null>(null);

    const openModal = (modalType: string) => {
        setCurrentModal(modalType);
    };

    const handleRenameFolder = async (newFolderName: string) => {
        await handleUpdateFolder(newFolderName, folder);
        setCurrentModal(null);
        onClose();
    };

    const handleDeleteFolderConfirm = async () => {
        await handleDeleteFolder(folder.id!!, folder.userId);
        setCurrentModal(null);
        onClose();
    };

    const handleBackdropClick = () => {
        onClose();
    };

    return (
        <>
            <div className={styles.backdrop} onClick={handleBackdropClick} />
            <div
                className={styles.modalWrapper}
                style={{ top: position.y, left: position.x }}
            >
                <ul className={styles.optionList}>
                    <li className={styles.optionItem} onClick={() => openModal('inputModal')}>
                        Renomear
                    </li>
                    <hr className={styles.divider} />
                    <li className={styles.optionItem} onClick={() => openModal('deleteModal')}>
                        Deletar
                    </li>
                </ul>
            </div>

            {currentModal === 'inputModal' && (
                <InputModal
                    title="Renomear Pasta"
                    placeholder="Digite o novo nome"
                    buttonText="Renomear"
                    onSubmit={handleRenameFolder}
                    onClose={() => setCurrentModal(null)}
                />
            )}

            {currentModal === 'deleteModal' && (
                <DeleteModal
                    title="Apagar Pasta"
                    message={`Tem certeza de que deseja apagar a pasta "${folder.name}"? Esta ação não pode ser desfeita.`}
                    confirmText="Confirmar"
                    cancelText="Cancelar"
                    onConfirm={handleDeleteFolderConfirm}
                    onClose={() => setCurrentModal(null)}
                />
            )}
        </>
    );
};

export default FolderOptionsModal;
