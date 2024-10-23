import React, { ElementType } from 'react';
import styles from './Button.module.css';

interface ButtonProps {
    icon?: ElementType;
    label: string;
    onClick: () => void;
}

const Button = ({ icon: Icon, label, onClick }: ButtonProps) => (
    <button onClick={onClick} aria-label={label} className={styles.buttonWrapper}>
        {Icon && <Icon />}
        {label}
    </button>
);

export default Button;
