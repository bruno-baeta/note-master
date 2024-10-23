import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createGlobalStyle} from 'styled-components';
import {UserProvider} from "./infra/context-api/user/UserManagementContext";

const rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error("Elemento 'root' não encontrado no documento.");
}

const root = ReactDOM.createRoot(rootElement);

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        background-color: #181A1B;
        color: #f5f5f5;
        font-family: 'Poppins', sans-serif;
    }
`;

root.render(
    <UserProvider>
        <GlobalStyle/>
        <App/>
    </UserProvider>
);
