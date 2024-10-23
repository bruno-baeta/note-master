import React from 'react';
import Header from '../components/header/Header';
import FoldersList from "../components/folders-list/FoldersList";
import {useUserContext} from "../../infra/context-api/user/UserManagementContext";

const Home = () => {
    const { folders } = useUserContext();

    return (
        <div>
            <Header title="NoteMaster" />
            <FoldersList folders={folders} />
        </div>
    );
};

export default Home;
