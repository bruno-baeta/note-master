import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/header/Header';
import FoldersList from "../components/folders-list/FoldersList";
import { useManagementContext } from "../../infra/context-api/management/ManagementContextProvider";

const Folder = () => {
    const location = useLocation();
    const { folder } = location.state || {};
    const { user, users, subfolders, handleGetSubfolders } = useManagementContext();

    useEffect(() => {
        handleGetSubfolders(folder.id);
    }, [folder.id]);

    return (
        <div>
            <Header
                newButtonIsEnabled={true}
                folderParentId={folder.id}
                user={user}
                users={users}
                title={folder.name}
            />
            <FoldersList folders={subfolders} />
        </div>
    );
};

export default Folder;
