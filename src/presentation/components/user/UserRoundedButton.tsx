import React, {useState} from 'react';
import styles from './UserRoundedButton.module.css';
import UserMenuModal from "../modals/user-menu-modal/UserMenuModal";
import {User} from "../../../domain/models/User";

interface UserRoundedButtonProps {
    user: User;
    users: User[];
}

const UserRoundedButton = ({ user, users }: UserRoundedButtonProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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

            {isMenuOpen && <UserMenuModal user={user} users={users} onClose={handleCloseMenu}/>}
        </>
    );
};

export default UserRoundedButton;
