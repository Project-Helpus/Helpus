import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";


const Helper = () => {
  const dispatch = useDispatch();
  // const real = useSelector((state))

  // useEffect()
  return (<>
    <StHelperWrapper>
      헬퍼
    </StHelperWrapper>
  </>)
}
export default Helper;

const StHelperWrapper = styled.div`
width:95%;
margin:auto;
  border:1px solid #000;
`