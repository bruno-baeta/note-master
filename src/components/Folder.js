import React from 'react';
import styled from 'styled-components';
import { FiMoreVertical } from 'react-icons/fi';
import { ReactComponent as FolderSvgIcon } from '../assets/ic-folder.svg'; // Importa o SVG como componente

// Wrapper para o container da pasta
const FolderWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #1E2022; /* Cor de fundo escura */
  border-radius: 12px; /* Borda arredondada */
  padding: 10px 16px;
  width: 260px; /* Largura fixa para as pastas */
  height: 42px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #292D2E; /* Cor de fundo ao passar o mouse */
  }
`;

// Ícone da pasta à esquerda usando o SVG
const FolderIcon = styled(FolderSvgIcon)`
  width: 20px;
  height: 20px;
  margin-right: 12px;
  fill: #bdbdbd; /* Cor de preenchimento para o SVG */
`;

// Nome da pasta com elipsização para textos longos
const FolderName = styled.span`
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 13px;
  color: #D4D1CB;
  flex-grow: 1; /* Faz o nome da pasta ocupar o espaço restante */
  
  /* Propriedades para truncar o texto com reticências */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// Ícone de três pontos para o menu de opções
const OptionsIcon = styled(FiMoreVertical)`
  color: #bdbdbd; /* Cor do ícone de opções */
  font-size: 20px;
`;

const Folder = ({ folderName }) => {
  return (
    <FolderWrapper>
      {/* Ícone de pasta usando SVG personalizado */}
      <FolderIcon />
      {/* Nome da pasta */}
      <FolderName>{folderName}</FolderName>
      {/* Ícone de três pontos */}
      <OptionsIcon />
    </FolderWrapper>
  );
};

export default Folder;
