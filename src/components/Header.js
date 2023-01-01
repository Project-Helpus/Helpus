import React from 'react';
import styled from "styled-components";

const Header = () => {
  return (
    <StHeaderWrapper>
      Header
    </StHeaderWrapper>
  );
};

const StHeaderWrapper = styled.header`
  width: 100%;
  height: 70px;
  align-items: center;
  top: 0;
  display: flex;
  justify-content: center;
  background-color: white;
`;

export default Header;