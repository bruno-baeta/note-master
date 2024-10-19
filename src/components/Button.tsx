import React from 'react';
import styled from 'styled-components';
import { colors, fonts, fontSizes } from '../styles/variables';

// Tipagem das props para o componente Button
interface ButtonProps {
  icon?: React.ElementType; // Icon será um componente React opcional
  label: string; // Label é uma string obrigatória
  onClick: () => void; // onClick é uma função que não retorna nada (void)
}

// Estilos para o botão usando styled-components
const ButtonWrapper = styled.button`
  background: ${colors.buttonBackground};
  color: ${colors.textWhite};
  height: 40px;
  padding: 8px 18px; /* Ajuste para espaçamento mais equilibrado */
  border: none;
  border-radius: 10px; /* Deixa as bordas mais arredondadas */
  display: flex;
  align-items: center;
  font-family: ${fonts.primary};
  font-size: ${fontSizes.medium};
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${colors.buttonHover};
  }

  svg {
    width: 16px; /* Ajuste do tamanho do ícone */
    height: 16px; /* Tamanho do ícone mais equilibrado */
    margin-right: 8px; /* Espaço entre o ícone e o texto */
    stroke-width: 2; /* Deixa o ícone mais marcante */
  }
`;

const Button: React.FC<ButtonProps> = ({ icon: Icon, label, onClick }) => {
  return (
    <ButtonWrapper onClick={onClick}>
      {Icon && <Icon />} {/* Se Icon for passado, renderiza o ícone */}
      {label}
    </ButtonWrapper>
  );
};

export default Button;
