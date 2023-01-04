import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const HelpeeTrue = () => {
  const dispatch = useDispatch();
  // const real = useSelector((state))



  // useEffect()
  return (<>
    <StHelpeeWrapper>
      헬피(로컬)
    </StHelpeeWrapper>
  </>)
}
export default HelpeeTrue;

const StHelpeeWrapper = styled.div`
width:95%;
margin:auto;
  border:1px solid #000;
`