import React from 'react';
import styles from './UserSelectionModal.module.css';
import { useManagementContext } from "../../../../infra/context-api/management/ManagementContextProvider";
import { User } from "../../../../domain/models/User";

interface UserSelectionModalProps {
    onClose: () => void;
    users: User[];
}

const UserSelectionModal = ({ onClose, users }: UserSelectionModalProps) => {
    const { handleSelectUser } = useManagementContext();

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
                    {users.map(({ id, name }, index) => (
                        <React.Fragment key={id}>
                            <div
                                className={styles.userItem}
                                onClick={() => handleUserSelect({ id, name })}
                            >
                                <div
                                    className={styles.userCircle}
                                >
                                    {name.charAt(0).toUpperCase()}
                                </div>
                                <span className={styles.userName}>{name}</span>
                            </div>
                            {index < users.length - 1 && <hr className={styles.divider} />}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </>
    );
};

export default UserSelectionModal;
