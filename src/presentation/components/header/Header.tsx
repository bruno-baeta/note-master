import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import UserRoundedButton from '../user/UserRoundedButton';
import Button from '../button/Button';
import styles from './Header.module.css';
import InsertMenuModal from '../modals/insert-menu-modal/InsertMenuModal';
import {User} from "../../../domain/models/User";

interface HeaderProps {
    title: string;
    user: User;
    users: User[];
}

const Header = ({ title, user, users }: HeaderProps) => {
    const [isInsertMenuOpen, setIsInsertMenuOpen] = useState(false);

    const handleOpenInsertMenu = () => {
        setIsInsertMenuOpen(true);
    };

    const handleCloseInsertMenu = () => {
        setIsInsertMenuOpen(false);
    };

    return (
        <header className={styles.headerWrapper}>
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.headerActions}>
                <Button
                    label="Novo"
                    icon={FiPlus}
                    onClick={handleOpenInsertMenu}
                />
                <UserRoundedButton user={user} users={users} />
            </div>

            {isInsertMenuOpen && (
                <InsertMenuModal user={user} onClose={handleCloseInsertMenu} />
            )}
        </header>
    );
};

export default Header;
