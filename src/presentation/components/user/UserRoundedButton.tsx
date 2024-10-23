import React, { useState } from 'react';
import styles from './UserRoundedButton.module.css';
import UserMenuModal from "../modals/user-menu-modal/UserMenuModal";
import {useUserContext} from "../../../infra/context-api/user/UserManagementContext";

const UserRoundedButton = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user } = useUserContext();

    const getInitial = (name: string) => {
        return name.charAt(0).toUpperCase();
    };

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleCloseMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            <div className={styles.avatarWrapper} onClick={handleMenuToggle}>
                <span className={styles.avatarText}>
                    {getInitial(user.name)}
                </span>
            </div>

            {isMenuOpen && <UserMenuModal onClose={handleCloseMenu} />}
        </>
    );
};

export default UserRoundedButton;
