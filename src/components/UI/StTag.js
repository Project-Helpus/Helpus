import React from "react";
import styled from "styled-components";

const StTag = ({ children }) => {
  return <Tag>{children}</Tag>;
};

export default StTag;

export const Tag = styled.div`
  padding: 8px;
  height: 38px;
  border-radius: 8px;
  border: none;
  color: black;
  background-color: #efefef;
  line-height: 22px;
`;