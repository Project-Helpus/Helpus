import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const HelpUsTrue = () => {
  const dispatch = useDispatch();
  // const real = useSelector((state))



  // useEffect()
  return (<>
    <StHelpeeWrapper>
      헬퍼스(로컬)
    </StHelpeeWrapper>
  </>)
}
export default HelpUsTrue;

const StHelpeeWrapper = styled.div`
width:95%;
margin:auto;
  border:1px solid #000;
`