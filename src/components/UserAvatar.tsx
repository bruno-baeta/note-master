import React from 'react';
import styled from 'styled-components';

const AvatarWrapper = styled.div`
  width: 40px;
  height: 40px;
  background-color: #4a90e2;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: 22px;
  font-weight: 600;
  cursor: pointer;
`;

const UserAvatar = ({ initial, onClick }) => {
  return (
    <AvatarWrapper onClick={onClick}>
      {initial}
    </AvatarWrapper>
  );
};

export default UserAvatar;
