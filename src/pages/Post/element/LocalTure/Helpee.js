import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const Helpee = () => {
  const dispatch = useDispatch();
  // const real = useSelector((state))



  // useEffect()
  return (<>
    <StHelpeeWrapper>
      헬피
    </StHelpeeWrapper>
  </>)
}
export default Helpee;

const StHelpeeWrapper = styled.div`
width:95%;
margin:auto;
  border:1px solid #000;
`