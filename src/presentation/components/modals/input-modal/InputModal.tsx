import React, {useState} from 'react';
import styles from './InputModal.module.css';
import {User} from "../../../../domain/models/User";

interface InputModalProps {
    title: string,
    placeholder: string,
    onSubmit: (value: string) => void,
    onClose: () => void,
    buttonText: string,
    user?: User,
}

const InputModal = ({title, placeholder, onSubmit, onClose, buttonText, user}: InputModalProps) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = () => {
        onSubmit(inputValue);
        onClose();
    };

    return (
        <>
            <div className={styles.backdrop} onClick={onClose}/>
            <div className={styles.modalWrapper}>
                <h3 className={styles.modalTitle}>{title}</h3>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={placeholder}
                    className={styles.input}
                />
                <div className={styles.buttonContainer}>
                    <button className={styles.button} onClick={onClose}>
                        Cancelar
                    </button>
                    <button className={`${styles.button} ${styles.primaryButton}`} onClick={handleSubmit}>
                        {buttonText}
                    </button>
                </div>
            </div>
        </>
    );
};

export default InputModal;
