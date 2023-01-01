import React from "react";
import styled from "styled-components";

const StButton = ({ mode, children, onClick }) => {
  const Button = () => {
    switch (mode) {
      case "lgpr":
        return (
          <StLgPrButton onClick={onClick}>
            {children}
          </StLgPrButton>
        );
      case "lgsd":
        return (
          <StLgSdButton onClick={onClick}>
            {children}
          </StLgSdButton>
        );
      case "mdpr":
        return (
          <StMdPrButton onClick={onClick}>
            {children}
          </StMdPrButton>
        );
      case "mdsd":
        return (
          <StMdSdButton onClick={onClick}>
            {children}
          </StMdSdButton>
        );
      case "smpr":
        return (
          <StSmPrButton onClick={onClick}>
            {children}
          </StSmPrButton>
        );
      case "smsd":
        return (
          <StSmSdButton onClick={onClick}>
            {children}
          </StSmSdButton>
        );
      default:
        return (
          <StLgPrButton onClick={onClick}>
            {children}
          </StLgPrButton>
        );
    }
  };
  return <Button />;
};

export default StButton;
StButton.defaultProps = {
  onClick: () => {},
};
const StLgPrButton = styled.button`
  width: 300px;
  height: 60px;
  color: white;
  border: none;
  border-radius: 5px;
  background-color: green;
  &:hover {
    background: rgb(49, 101, 195);
  }
`;

const StLgSdButton = styled.button`
  width: 300px;
  height: 60px;
  color: black
  background-color: green;
  border: 1px solid black;
  border-radius: 5px;
  &:hover {
    background: rgb(255, 255, 255);
  }
`;

const StMdSdButton = styled.button`
  width: 180px;
  height: 60px;
  color: white;
  background-color: black;
  border: 1px solid black;
  border-radius: 5px;
  &:hover {
    background: rgb(255, 255, 255);
  }
`;

const StMdPrButton = styled.button`
  width: 180px;
  height: 60px;
  color: black
  background-color: white;
  border: 1px solid black;
  border-radius: 5px;
  &:hover {
    background: rgb(255, 255, 255);
  }
`;

const StSmPrButton = styled.button`
  width: 90px;
  height: 60px;
  color: black;
  background-color: white;
  border: 1px solid black;
  border-radius: 5px;
  &:hover {
    background: rgb(0, 0, 0);
  }
`;


const StSmSdButton = styled.button`
  width: 90px;
  height: 60px;
  color: black;
  background-color: white;
  border: 1px solid black;
  border-radius: 5px;
  &:hover {
    background: rgb(0, 0, 0);
  }
`;
