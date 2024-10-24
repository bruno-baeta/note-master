import React, { useState } from 'react';
import styles from './InsertMenuModal.module.css';
import InputModal from "../input-modal/InputModal";
import { User } from "../../../../domain/models/User";
import { useManagementContext } from "../../../../infra/context-api/management/ManagementContextProvider";

interface InsertMenuModalProps {
    onClose: () => void,
    folderParentId: number,
    user: User,
}

const InsertMenuModal = ({ onClose, user, folderParentId }: InsertMenuModalProps) => {
    const { handleCreateFolder } = useManagementContext();
    const [ currentSubModal, setCurrentSubModal] = useState<string | null>(null);

    const handleNewFolder = async (folderName: string) => {
        await handleCreateFolder(folderName, user.id, folderParentId);
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
            <div className={styles.backdrop} onClick={handleBackdropClick}/>

            {!currentSubModal && (
                <div className={styles.modalWrapper}>
                    <ul className={styles.optionList}>
                        <li className={styles.optionItem} onClick={() => openSubModal('newFolder')}>
                            Nova Pasta
                        </li>
                        <hr className={styles.divider}/>
                        <li className={styles.optionItem}>Nova Anotação</li>
                    </ul>
                </div>
            )}

            {currentSubModal === 'newFolder' && (
                <InputModal
                    title="Nova Pasta"
                    placeholder="Digite o nome da pasta"
                    buttonText="Criar"
                    onSubmit={handleNewFolder}
                    onClose={closeBothModals}
                />
            )}
        </>
    );
};

export default InsertMenuModal;
