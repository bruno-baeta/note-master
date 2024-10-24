import React, { useState } from 'react';
import styles from './UserMenuModal.module.css';
import DeleteModal from "../delete-modal/DeleteModal";
import UserSelectionModal from "../user-selection-modal/UserSelectionModal";
import InputModal from "../input-modal/InputModal";
import { User } from "../../../../domain/models/User";
import { useManagementContext } from "../../../../infra/context-api/management/ManagementContextProvider";

interface UserMenuModalProps {
    onClose: () => void;
    user: User;
    users: User[];
}

const UserMenuModal = ({ onClose, user, users }: UserMenuModalProps) => {
    const { handleCreateUser, handleUpdateUser, handleDeleteUser } = useManagementContext();
    const [currentSubModal, setCurrentSubModal] = useState<string | null>(null);

    const onUpdateUser = async (value: string) => {
        await handleUpdateUser(value, user.id);
        setCurrentSubModal(null);
        onClose();
    };

    const onDeleteUser = async () => {
        await handleDeleteUser(user.id);
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
                <div className={styles.modalWrapper}>
                    <div className={styles.userCircle}>
                        {user ? user.name.charAt(0).toUpperCase() : '?'}
                    </div>
                    <p className={styles.userName}>
                        {user ? user.name : 'Desconhecido'}
                    </p>
                    <ul className={styles.optionList}>
                        <li className={styles.optionItem} onClick={() => openSubModal('changeUser')}>
                            Alterar Nome
                        </li>
                        <hr className={styles.divider} />
                        <li className={styles.optionItem} onClick={() => openSubModal('createUser')}>
                            Criar Novo Usuário
                        </li>
                        <hr className={styles.divider} />
                        <li className={styles.optionItem} onClick={() => openSubModal('selectUser')}>
                            Trocar Usuário
                        </li>
                        <hr className={styles.divider} />
                        <li className={styles.optionItem} onClick={() => openSubModal('deleteUser')}>
                            Apagar Usuário
                        </li>
                    </ul>
                </div>
            )}

            {currentSubModal === 'changeUser' && (
                <InputModal
                    title="Alterar Usuário"
                    placeholder="Digite o nome do usuário"
                    buttonText="Alterar"
                    onSubmit={onUpdateUser}
                    onClose={closeBothModals}
                />
            )}

            {currentSubModal === 'createUser' && (
                <InputModal
                    title="Criar Novo Usuário"
                    placeholder="Digite o nome do novo usuário"
                    buttonText="Criar"
                    onSubmit={handleCreateUser}
                    onClose={closeBothModals}
                />
            )}

            {currentSubModal === 'selectUser' && (
                <UserSelectionModal users={users} onClose={closeBothModals} />
            )}

            {currentSubModal === 'deleteUser' && (
                <DeleteModal
                    title="Apagar Usuário"
                    message={`Tem certeza de que deseja apagar o usuário "${user.name}"? Esta ação não pode ser desfeita.`}
                    confirmText="Confirmar"
                    cancelText="Cancelar"
                    onConfirm={onDeleteUser}
                    onClose={closeBothModals}
                />
            )}
        </>
    );
};

export default UserMenuModal;
