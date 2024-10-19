import React from 'react';
import styled from 'styled-components';
import { FiMoreVertical } from 'react-icons/fi';
import { ReactComponent as FolderSvgIcon } from '../assets/ic-folder.js';

// Tipagem das props do componente Folder
interface FolderProps {
  folderName: string; // Nome da pasta deve ser uma string
}

// Wrapper para o container da pasta
const FolderWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #1E2022;
  border-radius: 12px;
  padding: 10px 16px;
  width: 260px;
  height: 42px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #292D2E;
  }
`;

// Ícone da pasta à esquerda usando o SVG
const FolderIcon = styled(FolderSvgIcon)`
  width: 20px;
  height: 20px;
  margin-right: 12px;
  fill: #bdbdbd;
`;

// Nome da pasta com elipsização para textos longos
const FolderName = styled.span`
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 13px;
  color: #D4D1CB;
  flex-grow: 1;
  
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// Ícone de três pontos para o menu de opções
const OptionsIcon = styled(FiMoreVertical)`
  color: #bdbdbd;
  font-size: 20px;
`;

// Componente Folder com tipagem correta
const Folder: React.FC<FolderProps> = ({ folderName }) => {
  return (
    <FolderWrapper>
      <FolderIcon />
      <FolderName>{folderName}</FolderName>
      <OptionsIcon />
    </FolderWrapper>
  );
};

export default Folder;
