import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const HelperTrue = () => {
  const dispatch = useDispatch();
  // const real = useSelector((state))



  // useEffect()
  return (<>
    <StHelpeeWrapper>
      헬퍼(로컬)
    </StHelpeeWrapper>
  </>)
}
export default HelperTrue;
const StHelpeeWrapper = styled.div`
width:95%;
margin:auto;
  border:1px solid #000;
`