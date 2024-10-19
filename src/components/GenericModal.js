import React, { useState } from 'react';
import styled from 'styled-components';
import { colors, fonts, fontSizes } from '../styles/variables';

// Backdrop para cobrir a tela e detectar cliques fora do modal
const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

// Modal centralizado com largura fixa adequada
const ModalWrapper = styled.div`
  background-color: ${colors.background};
  border-radius: 12px;
  padding: 24px 24px;  /* Mantendo espaçamento correto */
  width: 400px; /* Card com largura maior para acomodar o conteúdo */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Título ajustado para ficar no topo
const ModalTitle = styled.h3`
  font-family: ${fonts.primary};
  font-size: ${fontSizes.large};
  font-weight: 600;
  color: ${colors.textWhite};
  margin: 0px 0px 24px 12px;
  text-align: left;
  width: 100%;
`;

// Input ajustado para ficar alinhado com os botões
const Input = styled.input`
  width: calc(100% - 40px);  /* Alinhado perfeitamente com os botões */
  padding: 12px;
  margin-bottom: 24px;
  border: 1px solid #3a3a3a;
  border-radius: 6px;
  font-size: ${fontSizes.medium};
  font-family: ${fonts.primary};
  background-color: #1E1E1E;
  color: ${colors.textWhite};
  outline: none;

  &::placeholder {
    color: #8a8a8a;
  }

  &:focus {
    border-color: ${colors.primary}; /* Cor de destaque ao focar */
  }
`;

// Container para os botões, alinhado com o input
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%; /* Largura total para alinhar com o input */
`;

// Botões com padding adequado e alinhados com o input
const Button = styled.button`
  padding: 12px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-family: ${fonts.primary};
  font-size: ${fontSizes.medium};
  font-weight: 500;
  background-color: ${props => props.primary ? colors.primary : '#2C2C2C'};
  color: ${colors.textWhite};
  flex: 1;
  margin: 0 8px; /* Espaço entre os botões */

  &:hover {
    background-color: ${props => props.primary ? colors.buttonHover : '#3A3A3A'};
  }
`;

const GenericModal = ({ title, placeholder, onClose, onSubmit, buttonText, defaultValue }) => {
  const [inputValue, setInputValue] = useState(defaultValue || ''); // Estado do valor do input

  const handleSubmit = () => {
    if (inputValue.trim()) {
      onSubmit(inputValue); // Chama a função de callback com o valor
      onClose(); // Fecha o modal
    }
  };

  return (
    <>
      <Backdrop onClick={onClose} />
      <ModalWrapper>
        <ModalTitle>{title}</ModalTitle>
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
        />
        <ButtonContainer>
          <Button onClick={onClose}>Cancelar</Button>
          <Button primary onClick={handleSubmit}>{buttonText}</Button>
        </ButtonContainer>
      </ModalWrapper>
    </>
  );
};

export default GenericModal;
