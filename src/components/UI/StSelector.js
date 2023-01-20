import React from "react";
import styled from "styled-components";

const StSelector = ({ name, children, onChange, defaultValue, value }) => {
  return (
    <Select
      name={name}
      onChange={onChange}
      value={value}
      defaultValue={defaultValue}
    >
      {children}
    </Select>
  );
};

export default StSelector;

const Select = styled.select`
  width: 50%;
  height: 45px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  &:focus {
    outline: none;
    background-color: #efefef;
  }
`;
