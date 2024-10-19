import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Modal from '../components/Modal';
import GenericModal from '../components/GenericModal';
import UserModal from '../components/UserModal';
import UserSelectionModal from '../components/UserSelectionModal';
import ConfirmDeleteUserModal from '../components/ConfirmDeleteUserModal';
import Folder from '../components/Folder';
import { fetchLastLoggedUser, fetchUsers, createUser, removeUser, saveLoggedUser } from '../data/repositories/userRepository';
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isGenericModalOpen, setIsGenericModalOpen] = useState(false);
  const [isUserSelectionModalOpen, setIsUserSelectionModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({});
  const [folders, setFolders] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);

  // Cria o usuário 'Desconhecido' se não houver usuários no banco
  const createUnknownUser = async () => {
    const unknownUser = { id: Date.now(), name: 'Desconhecido' };
    await createUser(unknownUser);
    await saveLoggedUser(unknownUser); // Salva 'Desconhecido' como último usuário
    setCurrentUser(unknownUser);
    setFolders([]);
  };

  // Carrega o último usuário logado, ou cria o usuário 'Desconhecido' se não houver usuários
  const loadLastLoggedUser = async () => {
    const userList = await fetchUsers(); // Carrega todos os usuários do banco
    if (userList.length === 0) {
      await createUnknownUser(); // Se não houver usuários, cria o 'Desconhecido'
    } else {
      const lastUser = await fetchLastLoggedUser(); // Tenta buscar o último usuário logado
      if (lastUser) {
        setCurrentUser(lastUser); // Se encontrar, define como usuário atual
        const userFolders = await fetchFoldersByUserId(lastUser.id); // Carrega pastas do usuário
        setFolders(userFolders);
      } else {
        setCurrentUser(userList[0]); // Se não encontrar, define o primeiro usuário da lista como o atual
        const userFolders = await fetchFoldersByUserId(userList[0].id);
        setFolders(userFolders);
        await saveLoggedUser(userList[0]); // Salva o primeiro usuário como o último logado
      }
    }
  };

  const loadUsers = async () => {
    const userList = await fetchUsers();
    setUsers(userList);
  };

  useEffect(() => {
    loadLastLoggedUser();
    loadUsers(); // Carregar a lista de usuários ao iniciar
  }, []);

  const handleNewClick = () => {
    setIsModalOpen(true);
  };

  const handleNewFolderClick = () => {
    setModalConfig({
      title: 'Nova Pasta',
      placeholder: 'Digite o nome da pasta',
      buttonText: 'Criar',
      onSubmit: handleCreateFolder,
    });
    setIsGenericModalOpen(true);
    setIsModalOpen(false);
  };

  const handleChangeUserNameClick = () => {
    setModalConfig({
      title: 'Alterar Nome',
      placeholder: 'Digite o novo nome',
      buttonText: 'Salvar',
      onSubmit: handleChangeUserName,
      defaultValue: currentUser?.name || ''
    });
    setIsModalOpen(false);
    setIsGenericModalOpen(true);
  };

  const handleCreateNewUserClick = () => {
    setModalConfig({
      title: 'Criar Novo Usuário',
      placeholder: 'Digite o nome do novo usuário',
      buttonText: 'Criar',
      onSubmit: handleCreateNewUser
    });
    setIsModalOpen(false);
    setIsGenericModalOpen(true);
  };

  const handleCreateFolder = async (folderName) => {
    const newFolder = { id: Date.now(), name: folderName, userId: currentUser.id };
    await createFolder(newFolder);
    setFolders([...folders, newFolder]);
    setIsGenericModalOpen(false);
  };

  const handleChangeUserName = (newName) => {
    setCurrentUser((prevUser) => ({ ...prevUser, name: newName }));
    saveLoggedUser({ ...currentUser, name: newName }); // Atualiza o último usuário logado
    setIsModalOpen(false);
    setIsGenericModalOpen(false);
  };

  const handleCreateNewUser = async (userName) => {
    const newUser = { id: Date.now(), name: userName };
    await createUser(newUser);
    setCurrentUser(newUser);
    await saveLoggedUser(newUser); // Salva o novo usuário como o último logado
    setFolders([]); // Resetar pastas ao criar novo usuário
    await loadUsers(); // Recarrega a lista de usuários após criar um novo
    setIsModalOpen(false);
    setIsGenericModalOpen(false);
  };

  const handleSelectUser = async (user) => {
    setCurrentUser(user);
    await saveLoggedUser(user); // Salva o usuário selecionado como o último logado
    const userFolders = await fetchFoldersByUserId(user.id);
    setFolders(userFolders);
    setIsModalOpen(false);
    setIsUserSelectionModalOpen(false);
  };

  // Função para abrir o modal de confirmação de exclusão
  const handleDeleteUser = () => {
    setIsConfirmDeleteModalOpen(true); // Abre o modal de confirmação de exclusão
    setIsUserModalOpen(false); // Fecha o modal de opções de usuário
  };

  // Função para confirmar a exclusão do usuário
  const confirmDeleteUser = async () => {
    if (currentUser) {
      await removeUser(currentUser.id);
      await loadUsers(); // Recarrega a lista de usuários
      await createUnknownUser(); // Define o usuário padrão "Desconhecido" após apagar o usuário
      setIsConfirmDeleteModalOpen(false); // Fecha o modal de confirmação
    }
  };

  return (
    <div>
      <Header
        title="NoteMaster"
        userInitial={currentUser ? currentUser.name.charAt(0).toUpperCase() : '?'}
        onNewClick={handleNewClick}
        onUserClick={() => setIsUserModalOpen(true)}
      />

      <Title>Pastas</Title>
      <FolderContainer>
        {folders.map((folder) => (
          <Folder key={folder.id} folderName={folder.name} />
        ))}
      </FolderContainer>

      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          onNewFolderClick={handleNewFolderClick}
        />
      )}

      {isUserModalOpen && (
        <UserModal
          userInitial={currentUser ? currentUser.name.charAt(0).toUpperCase() : '?'}
          userName={currentUser ? currentUser.name : 'Desconhecido'}
          onClose={() => setIsUserModalOpen(false)}
          onChangeUserNameClick={handleChangeUserNameClick}
          onCreateNewUserClick={handleCreateNewUserClick}
          onSwitchUserClick={() => setIsUserSelectionModalOpen(true)}
          onDeleteUserClick={handleDeleteUser}
        />
      )}

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

      {/* Modal de confirmação para apagar o usuário */}
      {isConfirmDeleteModalOpen && (
        <ConfirmDeleteUserModal
          onConfirm={confirmDeleteUser}
          onClose={() => setIsConfirmDeleteModalOpen(false)} // Fechar modal sem apagar
        />
      )}

      {/* Modal de seleção de usuário */}
      {isUserSelectionModalOpen && (
        <UserSelectionModal
          users={users} // Passa a lista de usuários para o modal
          onSelectUser={handleSelectUser} // Função ao clicar em um usuário
          onClose={() => setIsUserSelectionModalOpen(false)} // Fechar modal
        />
      )}
    </div>
  );
};

export default Home;
