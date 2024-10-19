import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createGlobalStyle } from 'styled-components';

const root = ReactDOM.createRoot(document.getElementById('root'));

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: #181A1B; /* Cor de fundo escura */
    color: #f5f5f5; /* Cor do texto para garantir contraste */
    font-family: 'Poppins', sans-serif; /* Aplicando a fonte globalmente */
  }
`;

root.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
