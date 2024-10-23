import React, {useState} from 'react';
import styles from './InsertMenuModal.module.css';
import {useFolderManagement} from '../../../hooks/folder/useFolderManagement';
import InputModal from "../input-modal/InputModal";

interface InsertMenuModalProps {
    onClose: () => void;
}

const InsertMenuModal = ({onClose}: InsertMenuModalProps) => {
    const { handleCreateFolder } = useFolderManagement();

    const [currentSubModal, setCurrentModal] = useState<string | null>(null);

    const handleNewFolder = async (folderName: string) => {
        await handleCreateFolder(folderName);
        setCurrentModal(null);
        onClose();
    };

    const handleBackdropClick = () => {
        setCurrentModal(null);
        onClose();
    };

    return (
        <>
            <div className={styles.backdrop} onClick={handleBackdropClick}/>
            <div className={styles.modalWrapper}>
                <ul className={styles.optionList}>
                    <li
                        className={styles.optionItem}
                        onClick={() => setCurrentModal('newFolder')}
                    >
                        Nova Pasta
                    </li>
                    <hr className={styles.divider}/>
                    <li className={styles.optionItem}>
                        Nova Anotação
                    </li>
                    <hr className={styles.divider}/>
                    <li className={styles.optionItem}>
                        Novo Evento
                    </li>
                </ul>
            </div>

            {currentSubModal === 'newFolder' && (
                <>
                    <div className={styles.backdrop} onClick={handleBackdropClick}/>
                    <div className={styles.modalWrapper}>
                        <InputModal
                            title="Nova Pasta"
                            placeholder="Digite o nome da pasta"
                            buttonText="Criar"
                            onSubmit={handleNewFolder}
                            onClose={handleBackdropClick}
                        />
                    </div>
                </>
            )}
        </>
    );
};

export default InsertMenuModal;
