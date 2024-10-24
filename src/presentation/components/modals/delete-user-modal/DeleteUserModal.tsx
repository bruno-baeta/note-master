import React from 'react';
import styles from './DeleteUserModal.module.css';
import {useUserManagement} from '../../../hooks/user/useUserManagement';
import {User} from "../../../../domain/models/User";
import {useManagementContext} from "../../../../infra/context-api/user/UserManagementContext";

interface DeleteUserModalProps {
    onClose: () => void,
    user: User,
}

const DeleteUserModal = ({onClose, user }: DeleteUserModalProps) => {
    const {handleDeleteUser} = useManagementContext();

    const handleConfirmDelete = async () => {
        await handleDeleteUser(user.id);
        onClose();
    };

    return (
        <>
            <div className={styles.backdrop} onClick={onClose}/>
            <div className={styles.modalWrapper}>
                <h3 className={styles.title}>Apagar Usuário</h3>
                <p className={styles.warningMessage}>
                    Você perderá todas as pastas e anotações associadas a este usuário. Deseja continuar?
                </p>
                <div className={styles.buttonContainer}>
                    <button className={styles.button} onClick={onClose}>
                        Cancelar
                    </button>
                    <button className={`${styles.button} ${styles.buttonConfirm}`} onClick={handleConfirmDelete}>
                        Confirmar
                    </button>
                </div>
            </div>
        </>
    );
};

export default DeleteUserModal;
