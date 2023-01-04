import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const HelpUsFalse = () => {
  const dispatch = useDispatch();
  // const real = useState((state))

  // useEffect()

  return (<>
    <StHelpeUsWrapper>
      헬퍼스
    </StHelpeUsWrapper>
  </>)
}
export default HelpUsFalse;

const StHelpeUsWrapper = styled.div`
width:95%;
margin:auto;
  border:1px solid #000;
`