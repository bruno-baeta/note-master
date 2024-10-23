import React from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import { ReactComponent as FolderSvgIcon } from '../../assets/ic-folder.svg';
import styles from './FolderCard.module.css';

interface FolderProps {
    folderName: string;
}

const FolderCard = ({ folderName }: FolderProps) => {
    return (
        <div className={styles.folderWrapper}>
            <FolderSvgIcon className={styles.folderIcon} />
            <span className={styles.folderName}>{folderName}</span>
            <FiMoreVertical className={styles.optionsIcon} />
        </div>
    );
};

export default FolderCard;
