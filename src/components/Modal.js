import React, { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import icon_back from "../asset/icon_back.svg";
import theme from "../styles/theme";

const Modal = () => {
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      <button
        onClick={() => {
          setModal(!modal);
        }}
      >
        {!modal ? (
          <img src={icon_back} alt="" />
        ) : (
          <img src={icon_back} alt="" />
        )}
      </button>
      {modal === true ? (
        <StModal>
          <p onClick={() => navigate("/mypage")}>마이페이지</p>
          <p>로그아웃</p>
        </StModal>
      ) : null}
    </div>
  );
};

export default Modal;

const StModal = styled.div`
  position: absolute;
  z-index: 100;
  right: 2.5em;
  padding: 20px 26px;
  text-align: left;
  border: 1px solid ${(props) => props.theme.colors.gray};
  border-radius: 10px;
  margin-top: 18px;
  box-shadow: 4px 6px 10px rgb(0 0 0 / 0.5%), 0 4px 6px rgb(0 0 0 / 5%);
  background-color: white;
  font-size: 0.9em;
  p {
    cursor: pointer;
  }
`;
