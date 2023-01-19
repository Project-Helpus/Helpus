import React from "react";
import styled from "styled-components";

const StButton = ({ mode, children, onClick }) => {
  const Button = () => {
    switch (mode) {
      case "pinkLgBtn":
        return <StPinkLgBtn onClick={onClick}>{children}</StPinkLgBtn>;
      case "pinkMdBtn":
        return <StPinkMdBtn onClick={onClick}>{children}</StPinkMdBtn>;
      case "pinkSmBtn":
        return <StPinkSmBtn onClick={onClick}>{children}</StPinkSmBtn>;
      case "greenBtn":
        return <StGreenBtn onClick={onClick}>{children}</StGreenBtn>;
      case "yellowBtn":
        return <StYellowBtn onClick={onClick}>{children}</StYellowBtn>;
      case "orangeMdBtn":
        return <StOrangeMdBtn onClick={onClick}>{children}</StOrangeMdBtn>;
      case "orangeSmBtn":
        return <StOrangSmBtn onClick={onClick}>{children}</StOrangSmBtn>;
      case "outlineBtn":
        return <StOutlineBtn onClick={onClick}>{children}</StOutlineBtn>;
      case "greenBlueBtn":
        return <StGreenBlueBtn onClick={onClick}>{children}</StGreenBlueBtn>;
      default:
        return;
    }
  };
  return <Button />;
};

export default StButton;

StButton.defaultProps = {
  onClick: () => {},
};
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
  width: 132px;
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

const StYellowBtn = styled.button`
  width: 132px;
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
