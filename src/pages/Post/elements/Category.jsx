import React from "react";
import styled from "styled-components";

const Category = React.memo(({ ref, children, value, changeInputHandler }) => {
  console.log('ref:',ref)
  return (
    <StCategory
      name="category"
      id="category"
      value={value}
      ref={ref}
      onClick={changeInputHandler}
      readOnly
    >
      {children}
    </StCategory>
  );
});

const StCategory = styled.button`
  width: 100px;
  height: 50px;
  cursor: pointer;
`;

export default Category;
