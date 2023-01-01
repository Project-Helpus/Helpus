import React from "react";
import styled from "styled-components";

const StChip = ({ mode, children, onClick }) => {
  const Chip = () => {
    switch (mode) {
      case "헬퍼스":
        return (
          <StHelpUs onClick={onClick}>{children}</StHelpUs>
        );
      case "헬퍼":
        return (
          <StHelper onClick={onClick}>{children}</StHelper>
        );
      case "헬피":
        return (
          <StHelpee onClick={onClick}>{children}</StHelpee>
        );
      default:
        return ;
    }
  };

  return <Chip />;
};

export default StChip;

const StHelpUs = styled.div`
  width:20%;
  height:5%;
  border:2px solid red;
`
const StHelper = styled.div`
  width:20%;
  height:5%;
  border:2px solid blue;
  
`
const StHelpee = styled.div`
  width:20%;
  height:5%;
  border:2px solid green;
`