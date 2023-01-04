import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";


const HelperFalse = () => {
  const dispatch = useDispatch();
  // const real = useSelector((state))

  // useEffect()
  return (<>
    <StHelperWrapper>
      헬퍼(전국)
    </StHelperWrapper>
  </>)
}
export default HelperFalse;

const StHelperWrapper = styled.div`
width:95%;
margin:auto;
  border:1px solid #000;
`