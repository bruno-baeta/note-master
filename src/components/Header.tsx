import React from 'react';
import styled from 'styled-components';
import { FiPlus } from 'react-icons/fi';
import UserAvatar from './UserAvatar'; // Avatar do usuário
import Button from './Button'; // Avatar do usuário

const HeaderWrapper = styled.header`
  background-color: #1B1D1E;
  padding: 0px 40px;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 32px;
  color: #ffffff;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 28px;
`;


const Header = ({ title, onNewClick, onUserClick, userInitial }) => {
    return (
        <HeaderWrapper>
            <Title>{title}</Title>
            <HeaderActions>
                <Button
                    label="Novo"
                    icon={FiPlus}
                    onClick={onNewClick}
                />
                <UserAvatar initial={userInitial} onClick={onUserClick} />
            </HeaderActions>
        </HeaderWrapper>
    );
};

export default Header;
