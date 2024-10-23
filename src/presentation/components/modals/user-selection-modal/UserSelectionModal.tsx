import React from 'react';
import styles from './UserSelectionModal.module.css';
import { useUserManagement } from '../../../hooks/user/useUserManagement';
import {useUserContext} from "../../../../infra/context-api/user/UserManagementContext";

interface UserSelectionModalProps {
    onClose: () => void;
}

const UserSelectionModal = ({ onClose }: UserSelectionModalProps) => {
    const { users, handleSelectUser } = useUserContext();

    const handleBackdropClick = () => {
        onClose();
    };

    const handleUserSelect = async (user: { id: number; name: string }) => {
        await handleSelectUser(user);
        onClose();
    };

    return (
        <>
            <div className={styles.backdrop} onClick={handleBackdropClick} />
            <div className={styles.modalWrapper}>
                <div className={styles.userList}>
                    {users.map(({ id, name }) => (
                        <div
                            key={id}
                            className={styles.userItem}
                            onClick={() => handleUserSelect({ id, name })}
                        >
                            <div className={styles.userCircle}>
                                {name.charAt(0).toUpperCase()}
                            </div>
                            <span className={styles.userName}>{name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default UserSelectionModal;
