import React from 'react';
import styles from './DeleteModal.module.css';

interface DeleteModalProps {
    onClose: () => void,
    onConfirm: () => void,
    title: string,
    message: string,
    confirmText: string,
    cancelText: string,
}

const DeleteModal = ({ onClose, onConfirm, title, message, confirmText, cancelText }: DeleteModalProps) => {
    return (
        <>
            <div className={styles.backdrop} onClick={onClose}/>
            <div className={styles.modalWrapper}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.warningMessage}>
                    {message}
                </p>
                <div className={styles.buttonContainer}>
                    <button className={styles.button} onClick={onClose}>
                        {cancelText}
                    </button>
                    <button className={`${styles.button} ${styles.buttonConfirm}`} onClick={onConfirm}>
                        {confirmText}
                    </button>
                </div>
            </div>
        </>
    );
};

export default DeleteModal;
