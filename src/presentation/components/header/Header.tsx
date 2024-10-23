import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import UserRoundedButton from '../user/UserRoundedButton';
import Button from '../button/Button';
import styles from './Header.module.css';
import InsertMenuModal from '../modals/insert-menu-modal/InsertMenuModal';

const Header = ({ title }: { title: string }) => {
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
                <UserRoundedButton />
            </div>

            {isInsertMenuOpen && (
                <InsertMenuModal onClose={handleCloseInsertMenu} />
            )}
        </header>
    );
};

export default Header;
