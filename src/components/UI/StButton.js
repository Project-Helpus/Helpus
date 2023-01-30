import React from "react";
import styled from "styled-components";

const StButton = ({ mode, children, onClick, innerRef }) => {
  const Button = () => {
    switch (mode) {
      case "pinkLgBtn":
        return (
          <StPinkLgBtn ref={innerRef} onClick={onClick}>
            {children}
          </StPinkLgBtn>
        );
      case "pinkMdBtn":
        return (
          <StPinkMdBtn ref={innerRef} onClick={onClick}>
            {children}
          </StPinkMdBtn>
        );
      case "pinkSmBtn":
        return (
          <StPinkSmBtn ref={innerRef} onClick={onClick}>
            {children}
          </StPinkSmBtn>
        );
      case "greenBtn":
        return (
          <StGreenBtn ref={innerRef} onClick={onClick}>
            {children}
          </StGreenBtn>
        );
      case "yellowMdBtn":
        return (
          <StYellowMdBtn ref={innerRef} onClick={onClick}>
            {children}
          </StYellowMdBtn>
        );
      case "yellowSmBtn":
        return (
          <StYellowSmBtn ref={innerRef} onClick={onClick}>
            {children}
          </StYellowSmBtn>
        );
      case "orangeMdBtn":
        return (
          <StOrangeMdBtn ref={innerRef} onClick={onClick}>
            {children}
          </StOrangeMdBtn>
        );
      case "orangeSmBtn":
        return (
          <StOrangSmBtn ref={innerRef} onClick={onClick}>
            {children}
          </StOrangSmBtn>
        );
      case "outlineBtn":
        return (
          <StOutlineBtn ref={innerRef} onClick={onClick}>
            {children}
          </StOutlineBtn>
        );
      case "greenBlueBtn":
        return (
          <StGreenBlueBtn ref={innerRef} onClick={onClick}>
            {children}
          </StGreenBlueBtn>
        );
      default:
        return (
          <StDefaultBtn ref={innerRef} onClick={onClick}>
            {children}
          </StDefaultBtn>
        );
    }
  };
  return <Button />;
};

export default StButton;

StButton.defaultProps = {
  onClick: () => {},
};

const StDefaultBtn = styled.button`
  border: none;
  background-color: transparent;
`;

const StPinkLgBtn = styled.button`
  width: 260px;
  height: 44px;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  background-color: ${(props) => props.theme.colors.subPink};
`;

const StPinkMdBtn = styled.button`
  width: 200px;
  height: 44px;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  background-color: ${(props) => props.theme.colors.subPink};
`;

const StPinkSmBtn = styled.button`
  width: 88px;
  height: 44px;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  background-color: ${(props) => props.theme.colors.subPink};
`;

const StGreenBtn = styled.button`
  width: 245px;
  height: 44px;
  color: black;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  background-color: ${(props) => props.theme.colors.lightGreen};
`;

const StYellowMdBtn = styled.button`
  width: 132px;
  height: 44px;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  background-color: ${(props) => props.theme.colors.yellow};
`;

const StYellowSmBtn = styled.button`
  width: 88px;
  height: 44px;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  background-color: ${(props) => props.theme.colors.yellow};
`;

const StOrangeMdBtn = styled.button`
  width: 132px;
  height: 44px;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  background-color: ${(props) => props.theme.colors.orange};
`;

const StOrangSmBtn = styled.button`
  width: 88px;
  height: 44px;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  background-color: ${(props) => props.theme.colors.orange};
`;

const StOutlineBtn = styled.button`
  width: 200px;
  height: 44px;
  color: black;
  background-color: white;
  border-radius: 10px;
  font-weight: 600;
  border: 2px solid ${(props) => props.theme.colors.subPink};
`;

const StGreenBlueBtn = styled.button`
  width: 132px;
  height: 44px;
  color: black;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  background-color: ${(props) => props.theme.colors.greenBlue};
`;
