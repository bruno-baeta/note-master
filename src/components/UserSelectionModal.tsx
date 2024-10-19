import React from 'react';
import styled from 'styled-components';
import { colors, fonts, fontSizes } from '../styles/variables';

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* Fundo semi-transparente */
  z-index: 999;
`;

const ModalWrapper = styled.div`
  background-color: ${colors.background};
  border-radius: 8px;
  padding: 20px;
  width: 300px; /* Ajustado para suportar o nome e o círculo */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 8%; /* Espaço do topo */
  right: 1.6%; /* Espaço da direita */
  z-index: 1000;
`;

const UserItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  font-family: ${fonts.primary};
  font-size: ${fontSizes.medium};
  font-weight: 500;
  color: ${colors.textWhite};
  
  &:hover {
    background-color: ${colors.buttonHover};
    transform: scale(1.02);
  }
`;

const UserCircle = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${colors.primary};
  color: ${colors.textWhite};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${fontSizes.medium};
  font-weight: 700;
  margin-right: 12px; /* Espaço entre o círculo e o nome */
`;

const UserName = styled.span`
  font-family: ${fonts.primary};
  font-size: ${fontSizes.medium};
  font-weight: 500;
  color: ${colors.textWhite};
`;

const UserList = styled.div`
  margin-top: 16px;
`;

const UserSelectionModal = ({ users, onSelectUser, onClose }) => {
  return (
    <>
      <Backdrop onClick={onClose} />
      <ModalWrapper>
        <UserList>
          {users.map((user) => (
            <UserItem key={user.id} onClick={() => onSelectUser(user)}>
              <UserCircle>{user.name.charAt(0).toUpperCase()}</UserCircle>
              <UserName>{user.name}</UserName>
            </UserItem>
          ))}
        </UserList>
      </ModalWrapper>
    </>
  );
};

export default UserSelectionModal;