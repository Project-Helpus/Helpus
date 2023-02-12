import React from "react";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import useDropDetectClose from "../hooks/useDropDetectClose";
import { __logout } from "../redux/modules/userSlice";
import icon_back from "../asset/icon_back.svg";

const DropdownMenu = ({ setSearch }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [myPageIsOpen, myPageRef, myPageHandler] = useDropDetectClose(false);
  const { userInfo } = useSelector((state) => state.userSlice);

  const mypageClickHandler = () => {
    setSearch("");
    navigate("/mypage");
  };
  const logoutClickHandler = (e) => {
    e.preventDefault();
    setSearch("");
    dispatch(__logout());
    navigate("/");
  };

  return (
    <Wrapper>
      <DropdownContainer>
        <StProfile onClick={myPageHandler} ref={myPageRef}>
          <img src={userInfo?.userImage} alt="" />
          <span>{userInfo?.userName}</span>
          <img src={icon_back} alt="" />
        </StProfile>
        <Menu isDropped={myPageIsOpen}>
          <p onClick={mypageClickHandler}>마이페이지</p>
          <p onClick={logoutClickHandler}>로그아웃</p>
        </Menu>
      </DropdownContainer>
    </Wrapper>
  );
};

export default DropdownMenu;

const Wrapper = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const DropdownContainer = styled.div`
  position: relative;
  text-align: center;
`;

const Menu = styled.div`
  position: absolute;
  width: 9em;
  text-align: center;
  margin-top: 1em;
  padding: 8px 0;
  border: 1px solid ${(props) => props.theme.colors.gray};
  box-shadow: 4px 6px 10px rgb(0 0 0 / 0.5%), 0 4px 6px rgb(0 0 0 / 5%);
  border-radius: 10px;
  opacity: 0;
  visibility: hidden;
  background-color: white;
  font-size: 0.9em;
  transform: translate(-5%, -20px);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  z-index: 9;

  p {
    cursor: pointer;
    padding: 8px;
  }

  ${({ isDropped }) =>
    isDropped &&
    css`
      opacity: 1;
      visibility: visible;
      transform: translate(-5%, 0);
    `};
`;

const StProfile = styled.button`
  text-align: center;
  img {
    width: 26px;
    height: 26px;
    border-radius: 10px;
    vertical-align: middle;
  }
  img:nth-child(3) {
    width: 10px;
    height: 10px;
    padding-left: 0.1em;
  }
  span {
    padding: 0 4px;
    font-size: 16px;
    vertical-align: middle;
    font-weight: 600;
  }
`;
