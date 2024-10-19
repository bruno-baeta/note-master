import React from 'react';
import styled from 'styled-components';
import { colors, fonts, fontSizes } from '../styles/variables';

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const ModalWrapper = styled.div`
  background-color: ${colors.background};
  border-radius: 8px;
  padding: 20px;
  width: 240px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 8%;
  right: 1.6%;
  z-index: 1000;
  text-align: center;
`;

const UserCircle = styled.div`
  width: 60px;
  height: 60px;
  background-color: ${colors.primary};
  color: ${colors.textWhite};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${fontSizes.large};
  font-weight: 700;
  margin: 0 auto;
`;

const UserName = styled.p`
  font-family: ${fonts.primary};
  font-size: ${fontSizes.medium};
  font-weight: 500;
  color: ${colors.textWhite};
  margin: 15px 0;
  text-align: center;
`;

const OptionList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 28px 0 0;
`;

const OptionItem = styled.li`
  padding: 12px 8px;
  color: ${colors.textWhite};
  font-family: ${fonts.primary};
  font-size: ${fontSizes.medium};
  font-weight: 500;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  text-align: left;

  &:hover {
    background-color: ${colors.buttonHover};
    transform: scale(1.02);
  }
`;

const Divider = styled.hr`
  border: 0.5px solid ${colors.buttonHover};
  margin: 8px 0;
`;

const UserModal = ({ 
  userInitial, 
  userName, 
  onClose, 
  onChangeUserNameClick, 
  onCreateNewUserClick,
  onSwitchUserClick,
  onDeleteUserClick
}) => {
  const handleOptionClick = (action) => {
    action();   // Executa a função de ação
    onClose();  // Fecha o modal imediatamente após
  };

  return (
    <>
      <Backdrop onClick={onClose} />

      <ModalWrapper>
        <UserCircle>{userInitial}</UserCircle>

        <UserName>{userName}</UserName>

        <OptionList>
          <OptionItem onClick={() => handleOptionClick(onChangeUserNameClick)}>
            Alterar nome
          </OptionItem>
          <Divider />
          <OptionItem onClick={() => handleOptionClick(onCreateNewUserClick)}>
            Criar novo usuário
          </OptionItem>
          <Divider />
          <OptionItem onClick={() => handleOptionClick(onSwitchUserClick)}>
            Trocar usuário
          </OptionItem>
          <Divider />
          <OptionItem onClick={() => handleOptionClick(onDeleteUserClick)}>
            Apagar usuário
          </OptionItem>
        </OptionList>
      </ModalWrapper>
    </>
  );
};

export default UserModal;
