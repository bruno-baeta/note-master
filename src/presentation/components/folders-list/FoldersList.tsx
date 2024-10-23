import React from 'react';
import FolderCard from '../folder/FolderCard';
import styles from './FoldersList.module.css';
import {Folder} from "../../../domain/models/Folder";

interface FoldersListProps {
    folders: Folder[];
}

const FoldersList = ({folders}: FoldersListProps) => {
    return (
        <div>
            <h2 className={styles.title}>Pastas</h2>
            <div className={styles.folderContainer}>
                {folders.map((folder: Folder) => (
                    <FolderCard key={folder.id} folderName={folder.name}/>
                ))}
            </div>
        </div>
    );
};

export default FoldersList;
