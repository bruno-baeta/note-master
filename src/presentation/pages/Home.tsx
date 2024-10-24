import React from 'react';
import Header from '../components/header/Header';
import FoldersList from "../components/folders-list/FoldersList";
import {useManagementContext} from "../../infra/context-api/management/ManagementContextProvider";

const Home = () => {
    const { user, users, folders } = useManagementContext();

    return (
        <div>
            <Header folderParentId={0} title="NoteMaster" user={user} users={users}/>
            <FoldersList folders={folders} />
        </div>
    );
};

export default Home;
