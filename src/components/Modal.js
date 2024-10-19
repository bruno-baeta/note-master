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
  padding: 10px;
  width: 220px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 8%;
  right: 3.7%;
  z-index: 1000;
`;

const OptionList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const OptionItem = styled.li`
  display: flex;
  align-items: center;
  padding: 12px 8px;
  color: ${colors.textWhite};
  font-family: ${fonts.primary};
  font-size: ${fontSizes.medium};
  font-weight: 500;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: ${colors.buttonHover};
    transform: scale(1.02);
  }
`;

const Divider = styled.hr`
  border: 0.5px solid ${colors.buttonHover};
  margin: 8px 0;
`;

const Modal = ({ onClose, onNewFolderClick }) => {
  return (
    <>
      {/* Backdrop para fechar o modal ao clicar fora */}
      <Backdrop onClick={onClose} />

      {/* Modal para exibir as opções */}
      <ModalWrapper>
        <OptionList>
          <OptionItem onClick={onNewFolderClick}>
            Nova Pasta
          </OptionItem>
          <Divider />
          <OptionItem>
            Nova Anotação
          </OptionItem>
          <Divider />
          <OptionItem>
            Novo Evento
          </OptionItem>
        </OptionList>
      </ModalWrapper>
    </>
  );
};

export default Modal;
