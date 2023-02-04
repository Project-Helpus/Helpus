import React from "react";
import styled from "styled-components";
import login_bg from "../../asset/login_bg.png";
import login_object from "../../asset/login_object.svg";
import login_white_logo from "../../asset/login_white_logo.svg";
const StUserWrap = () => {
  return (
    <StLeft>
      <StLeftOj>
        <img src={login_object} alt=""></img>
        <img src={login_white_logo} alt=""></img>
      </StLeftOj>
    </StLeft>
  );
};

export default StUserWrap;

const StLeft = styled.div`
  display: flex;
  position: relative;
  width: 40%;
  height: 100vh;
  background: url(${login_bg});
  background-size: cover;
`;
const StLeftOj = styled.div`
  position: absolute;
  text-align: center;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  img {
    width: 100%;
  }
  img:nth-child(2) {
    width: 20%;
  }
`;
