import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { __getHelperTrue } from "../../../../redux/modules/postSlice";
const HelperTrue = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.postSlice.helperTrueDate)
  console.log('헬퍼 true data:', data)



  useEffect(() => { dispatch(__getHelperTrue()) }, [dispatch])

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