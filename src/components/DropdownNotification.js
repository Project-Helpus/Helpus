import React from "react";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import useDetectClose from "../hooks/DropDetectClose";
import { __logout } from "../redux/modules/userSlice";
import icon_back from "../asset/icon_back.svg";

const DropdownNotification = ({
  notifications,
  handleRead,
  setSearch,
  displayNotification,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [notificationIsOpen, notificationRef, notificationHandler] =
    useDetectClose(false);

  return (
    <Wrapper>
      <DropdownContainer onClick={notificationHandler} ref={notificationRef}>
        {/* <StProfile
          onClick={notificationHandler}
          ref={notificationRef}
        ></StProfile> */}
        <Menu isDropped={notificationIsOpen}>
          {notifications.map((n) => displayNotification(n))}
          <button onClick={handleRead}>알림 확인</button>
        </Menu>
      </DropdownContainer>
    </Wrapper>
  );
};

export default DropdownNotification;

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
  width: 12em;
  text-align: center;
  padding: 8px 0;
  border: 1px solid #f5f5f5;
  box-shadow: 4px 6px 10px rgb(0 0 0 / 1%), 0 4px 6px rgb(0 0 0 / 5%);
  border-radius: 10px;
  opacity: 0;
  visibility: hidden;
  background-color: white;
  font-size: 0.9em;
  transform: translate(-60%, 20px);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  z-index: 9;

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
