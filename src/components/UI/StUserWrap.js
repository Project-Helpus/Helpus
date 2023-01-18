import React from "react";
import styled from "styled-components";
import login_bg from "../../asset/login_bg.png";
import login_object from "../../asset/login_object.png";

const StUserWrap = () => {
  return (
    <StLeft>
      <StLeftOj>
        <img src={login_object} alt=""></img>
      </StLeftOj>
    </StLeft>
  );
};

export default StUserWrap;

const StLeft = styled.div`
  display: flex;
  position: relative;
  width: 50%;
  height: 100vh;
  background: url(${login_bg});
  background-size: cover;
`;
const StLeftOj = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  img {
    width: 80%;
  }
`;
