import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const HelpeeFalse = () => {
  const dispatch = useDispatch();
  // const real = useSelector((state))



  // useEffect()
  return (<>
    <StHelpeeWrapper>
      헬피(전국)
    </StHelpeeWrapper>
  </>)
}
export default HelpeeFalse;

const StHelpeeWrapper = styled.div`
width:95%;
margin:auto;
  border:1px solid #000;
`