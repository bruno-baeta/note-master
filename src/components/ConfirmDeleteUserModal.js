import React from 'react';
import styled from 'styled-components';
import { colors, fonts, fontSizes } from '../styles/variables';

// Backdrop que cobre a tela ao abrir o modal
const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

// Wrapper para o modal
const ModalWrapper = styled.div`
  background-color: ${colors.background};
  border-radius: 8px;
  padding: 24px;
  width: 400px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  text-align: center;
`;

// Título do modal
const Title = styled.h3`
  font-family: ${fonts.primary};
  font-size: ${fontSizes.large};
  font-weight: 600;
  color: ${colors.textWhite};
  margin-bottom: 16px;
`;

// Mensagem de aviso
const WarningMessage = styled.p`
  font-family: ${fonts.primary};
  font-size: ${fontSizes.medium};
  color: ${colors.textWhite};
  margin-bottom: 24px;
`;

// Container para os botões
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

// Estilo para os botões
const Button = styled.button`
  padding: 12px 24px;
  font-family: ${fonts.primary};
  font-size: ${fontSizes.medium};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  color: ${colors.textWhite};
  background-color: ${props => (props.confirm ? colors.primary : '#2C2C2C')};

  &:hover {
    background-color: ${props => (props.confirm ? colors.buttonHover : '#3A3A3A')};
  }
`;

const ConfirmDeleteUserModal = ({ onConfirm, onClose }) => {
  return (
    <>
      <Backdrop />
      <ModalWrapper>
        <Title>Apagar Usuário</Title>
        <WarningMessage>
          Você perderá todas as pastas e anotações associadas a este usuário. Deseja continuar?
        </WarningMessage>
        <ButtonContainer>
          <Button onClick={onClose}>Cancelar</Button>
          <Button confirm onClick={onConfirm}>Confirmar</Button>
        </ButtonContainer>
      </ModalWrapper>
    </>
  );
};

export default ConfirmDeleteUserModal;
