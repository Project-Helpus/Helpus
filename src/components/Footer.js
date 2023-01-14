import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <StFooter>
      <p>Copyright &copy; Helpus</p>
    </StFooter>
  );
};

const StFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(120, 120, 120);
`;

export default Footer;
