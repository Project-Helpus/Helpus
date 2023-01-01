import React from "react";
import styled from "styled-components";

const StWrapper = ({children}) => {
  return <Wrapper>{children}</Wrapper>;
};

export default StWrapper;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 50%;

`;