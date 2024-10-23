import React, { useState } from 'react';
import styles from './UserMenuModal.module.css';
import DeleteUserModal from "../delete-user-modal/DeleteUserModal";
import UserSelectionModal from "../user-selection-modal/UserSelectionModal";
import InputModal from "../input-modal/InputModal";
import {useUserContext} from "../../../../infra/context-api/user/UserManagementContext";

interface UserMenuModalProps {
    onClose: () => void;
}

const UserMenuModal = ({ onClose }: UserMenuModalProps) => {
    const [currentSubModal, setCurrentSubModal] = useState<string | null>(null);
    const {
        user,
        handleCreateUser,
        handleUpdateUser
    } = useUserContext();

    const handleBackdropClick = () => {
        setCurrentSubModal(null);
        onClose();
    };

    return (
        <>
            <div className={styles.backdrop} onClick={handleBackdropClick} />
            <div className={styles.modalWrapper}>
                <div className={styles.userCircle}>
                    {user ? user.name.charAt(0).toUpperCase() : '?'}
                </div>
                <p className={styles.userName}>
                    {user ? user.name : 'Desconhecido'}
                </p>
                <ul className={styles.optionList}>
                    <li
                        className={styles.optionItem}
                        onClick={() => setCurrentSubModal('changeUser')}
                    >
                        Alterar Nome
                    </li>
                    <hr className={styles.divider} />
                    <li
                        className={styles.optionItem}
                        onClick={() => setCurrentSubModal('createUser')}
                    >
                        Criar Novo Usuário
                    </li>
                    <hr className={styles.divider} />
                    <li
                        className={styles.optionItem}
                        onClick={() => setCurrentSubModal('selectUser')}
                    >
                        Trocar Usuário
                    </li>
                    <hr className={styles.divider} />
                    <li
                        className={styles.optionItem}
                        onClick={() => setCurrentSubModal('deleteUser')}
                    >
                        Apagar Usuário
                    </li>
                </ul>

                {currentSubModal === 'changeUser' && (
                    <InputModal
                        title="Alterar Usuário"
                        placeholder="Digite o nome do usuário"
                        buttonText="Alterar"
                        onSubmit={handleUpdateUser}
                        onClose={() => setCurrentSubModal(null)}
                    />
                )}

                {currentSubModal === 'createUser' && (
                    <InputModal
                        title="Criar Novo Usuário"
                        placeholder="Digite o nome do novo usuário"
                        buttonText="Criar"
                        onSubmit={handleCreateUser}
                        onClose={() => setCurrentSubModal(null)}
                    />
                )}

                {currentSubModal === 'selectUser' && (
                    <UserSelectionModal onClose={() => setCurrentSubModal(null)} />
                )}

                {currentSubModal === 'deleteUser' && (
                    <DeleteUserModal onClose={() => setCurrentSubModal(null)} />
                )}
            </div>
        </>
    );
};

export default UserMenuModal;
