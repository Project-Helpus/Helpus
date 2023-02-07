import React from "react";
import styled, { css } from "styled-components";
import useDetectClose from "../hooks/DropDetectClose";
import icon_bell from "../asset/icon_bell.svg";

const DropdownNotification = ({
  notifications,
  handleRead,
  displayNotification,
  data,
}) => {
  const [notificationIsOpen, notificationRef, notificationHandler] =
    useDetectClose(false);

  return (
    <Wrapper>
      <DropdownContainer onClick={notificationHandler} ref={notificationRef}>
        <img src={icon_bell} alt="notification" />
        {notifications.length !== 0 && <StCounter></StCounter>}
        <StNotification isDropped={notificationIsOpen}>
          {data.map((n) => displayNotification(n))}

          <StCheckNotification onClick={handleRead}>읽음</StCheckNotification>
        </StNotification>
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
  padding-right: 15px;
`;

const StNotification = styled.div`
  position: absolute;
  width: 20em;
  text-align: center;
  margin-top: 1em;
  padding: 8px 0;
  border: 1px solid ${(props) => props.theme.colors.gray};
  box-shadow: 4px 6px 10px rgb(0 0 0 / 1%), 0 4px 6px rgb(0 0 0 / 5%);
  border-radius: 10px;
  opacity: 0;
  visibility: hidden;
  background-color: white;
  font-size: 0.9em;
  transform: translate(-42%, -20px);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  ${({ isDropped }) =>
    isDropped &&
    css`
      opacity: 1;
      visibility: visible;
      transform: translate(-42%, 0px);
    `};
`;

const StCounter = styled.div`
  position: absolute;
  width: 4px;
  height: 4px;
  top: 0;
  right: 18px;
  background-color: red;
  border-radius: 50%;
  padding: 4px;
  display: flex;
  align-items: center;
`;

const StCheckNotification = styled.div`
  font-weight: 600;
  padding: 4px 6px;
`;
