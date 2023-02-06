import React from "react";
import styled from "styled-components";
import logo_heart from "../asset/logo_heart.svg";
import helpus from "../asset/Helpus.svg";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const locationNow = useLocation();
  if (locationNow.pathname === "/login") return null;
  if (locationNow.pathname === "/signup") return null;
  if (locationNow.pathname === "/auth/kakao/state") return null;

  return (
    <StFooter>
      <StLogoWrap>
        <img src={logo_heart} alt=""></img>
        <img src={helpus} alt=""></img>
        <p>Copyright ©helpus All Rights Reserved.</p>
      </StLogoWrap>
    </StFooter>
  );
};

const StFooter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 140px;
  margin-top: 80px;
  margin-bottom: 20px;
  bottom: 0;
  img {
    width: 3em;
  }
  p {
    font-size: 0.6em;
    color: ${(props) => props.theme.colors.middleGray};
  }
`;
const StLogoWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 8px;
`;

export default Footer;
