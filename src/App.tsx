import React from 'react';
import Home from './presentation/pages/Home';
import {UserProvider} from "./infra/context-api/user/UserManagementContext";

function App() {
    return (
        <Home/>
    )
}

export default App;
