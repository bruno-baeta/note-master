import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Modal from '../components/Modal'; // O modal que exibe opções
import GenericModal from '../components/GenericModal'; // O modal genérico para ações diversas
import UserModal from '../components/UserModal';
import Folder from '../components/Folder';
import { fetchLastLoggedUser, createUser } from '../data/repositories/userRepository';
import { createFolder, fetchFoldersByUserId } from '../data/repositories/folderRepository';
import styled from 'styled-components';

const FolderContainer = styled.div`
  padding: 0px 40px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 20px;
`;

const Title = styled.h2`
  padding: 20px 0px 0px 40px;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #D4D1CB;
  margin-top: 44px;
`;

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal de opções (Novo)
  const [isUserModalOpen, setIsUserModalOpen] = useState(false); // Modal para usuário
  const [isGenericModalOpen, setIsGenericModalOpen] = useState(false); // Modal para ações genéricas
  const [modalConfig, setModalConfig] = useState({}); // Configurações dinâmicas do modal genérico
  const [folders, setFolders] = useState([]); // Pastas do usuário
  const [currentUser, setCurrentUser] = useState(null); // Usuário atual

  // Função para carregar o último usuário logado e suas pastas
  const loadLastLoggedUser = async () => {
    const lastUser = await fetchLastLoggedUser();
    if (lastUser) {
      setCurrentUser(lastUser);
      const userFolders = await fetchFoldersByUserId(lastUser.id); // Carrega as pastas do usuário
      setFolders(userFolders); // Atualiza as pastas do usuário
    } else {
      setCurrentUser(null);
      setFolders([]);
    }
  };

  // Executa ao montar o componente
  useEffect(() => {
    loadLastLoggedUser();
  }, []);

  // Abre o modal de opções (Novo)
  const handleNewClick = () => {
    setIsModalOpen(true);
  };

  // Abre o modal de criação de pasta
  const handleNewFolderClick = () => {
    setModalConfig({
      title: 'Nova Pasta',
      placeholder: 'Digite o nome da pasta',
      buttonText: 'Criar',
      onSubmit: handleCreateFolder,
    });
    setIsGenericModalOpen(true);
    setIsModalOpen(false); // Fecha o modal de opções
  };

  // Abre o modal de alterar o nome do usuário
  const handleChangeUserNameClick = () => {
    setModalConfig({
      title: 'Alterar Nome',
      placeholder: 'Digite o novo nome',
      buttonText: 'Salvar',
      onSubmit: handleChangeUserName,
      defaultValue: currentUser?.name || '' // Nome do usuário atual
    });
    setIsGenericModalOpen(true);
  };

  // Abre o modal para criar novo usuário
  const handleCreateNewUserClick = () => {
    setModalConfig({
      title: 'Criar Novo Usuário',
      placeholder: 'Digite o nome do novo usuário',
      buttonText: 'Criar',
      onSubmit: handleCreateNewUser
    });
    setIsGenericModalOpen(true);
  };

  // Cria uma nova pasta associada ao usuário atual
  const handleCreateFolder = async (folderName) => {
    const newFolder = { id: Date.now(), name: folderName, userId: currentUser.id }; // Associando pasta ao usuário atual
    await createFolder(newFolder);
    setFolders([...folders, newFolder]); // Adiciona a nova pasta à lista
    setIsGenericModalOpen(false); // Fecha o modal genérico
  };

  // Função para alterar o nome do usuário
  const handleChangeUserName = (newName) => {
    setCurrentUser((prevUser) => ({ ...prevUser, name: newName }));
    setIsGenericModalOpen(false);
  };

  // Função para criar novo usuário
  const handleCreateNewUser = async (userName) => {
    const newUser = { id: Date.now(), name: userName };
    await createUser(newUser);
    setCurrentUser(newUser);
    setFolders([]); // Resetar pastas ao criar novo usuário
    setIsGenericModalOpen(false);
  };

  return (
    <div>
      <Header 
        title="NoteMaster"
        userInitial={currentUser ? currentUser.name.charAt(0).toUpperCase() : '?'} // Exibe a primeira letra ou ?
        onNewClick={handleNewClick}
        onUserClick={() => setIsUserModalOpen(true)}
      />

      <Title>Pastas</Title>
      <FolderContainer>
        {folders.map((folder) => (
          <Folder key={folder.id} folderName={folder.name} />
        ))}
      </FolderContainer>

      {/* Modal para as opções (Novo) */}
      {isModalOpen && (
        <Modal 
          onClose={() => setIsModalOpen(false)}
          onNewFolderClick={handleNewFolderClick} // Ação ao clicar em "Nova Pasta"
        />
      )}

      {/* Modal para as opções do usuário */}
      {isUserModalOpen && (
        <UserModal 
          userInitial={currentUser ? currentUser.name.charAt(0).toUpperCase() : '?'} 
          userName={currentUser ? currentUser.name : 'Desconhecido'}
          onClose={() => setIsUserModalOpen(false)}
          onChangeUserNameClick={handleChangeUserNameClick} // Abre o modal para alterar nome
          onCreateNewUserClick={handleCreateNewUserClick} // Abre o modal para criar novo usuário
        />
      )}

      {/* Modal Genérico para criar pastas, alterar nome ou criar novo usuário */}
      {isGenericModalOpen && (
        <GenericModal
          title={modalConfig.title}
          placeholder={modalConfig.placeholder}
          buttonText={modalConfig.buttonText}
          defaultValue={modalConfig.defaultValue}
          onSubmit={modalConfig.onSubmit}
          onClose={() => setIsGenericModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Home;
