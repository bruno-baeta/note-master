import React from 'react';
import Header from '../components/header/Header';
import FoldersList from "../components/folders-list/FoldersList";
import {useManagementContext} from "../../infra/context-api/user/UserManagementContext";

const Home = () => {
    const { user, users, folders } = useManagementContext();

    return (
        <div>
            <Header title="NoteMaster" user={user} users={users}/>
            <FoldersList folders={folders} />
        </div>
    );
};

export default Home;
