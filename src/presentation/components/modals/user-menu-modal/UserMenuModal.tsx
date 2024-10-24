import React, { useState } from 'react';
import styles from './UserMenuModal.module.css';
import DeleteModal from "../delete-modal/DeleteModal";
import UserSelectionModal from "../user-selection-modal/UserSelectionModal";
import InputModal from "../input-modal/InputModal";
import { useManagementContext } from "../../../../infra/context-api/user/UserManagementContext";
import { User } from "../../../../domain/models/User";

interface UserMenuModalProps {
    onClose: () => void;
    user: User;
    users: User[];
}

const UserMenuModal = ({ onClose, user, users }: UserMenuModalProps) => {
    const [currentSubModal, setCurrentSubModal] = useState<string | null>(null);
    const { handleCreateUser, handleUpdateUser, handleDeleteUser } = useManagementContext();

    const onUpdateUser = async (value: string) => {
        await handleUpdateUser(value, user.id);
    };

    const onDeleteUser = async () => {
        await handleDeleteUser(user.id); // Função de deletar o usuário
        setCurrentSubModal(null);
        onClose();
    };

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
                        onSubmit={onUpdateUser}
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
                    <UserSelectionModal users={users} onClose={() => setCurrentSubModal(null)} />
                )}

                {currentSubModal === 'deleteUser' && (
                    <DeleteModal
                        title="Apagar Usuário"
                        message={`Tem certeza de que deseja apagar o usuário "${user.name}"? Esta ação não pode ser desfeita.`}
                        confirmText="Confirmar"
                        cancelText="Cancelar"
                        onConfirm={onDeleteUser}
                        onClose={() => setCurrentSubModal(null)}
                    />
                )}
            </div>
        </>
    );
};

export default UserMenuModal;
