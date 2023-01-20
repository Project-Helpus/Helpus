import React from "react";
import styled from "styled-components";

const Category = React.memo(({ children, value, changeInputHandler }) => {
  return (
    <StCategory
      name="category"
      id="category"
      value={value}
      onClick={changeInputHandler}
      readOnly
    >
      {children}
    </StCategory>
  );
});

const StCategory = styled.button`
  width: 200px;
  height: 44px;
  cursor: pointer;
  border: none;
  border-radius: 10px;
`;

export default Category;
