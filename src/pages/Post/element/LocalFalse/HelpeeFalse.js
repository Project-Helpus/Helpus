import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { __getHelpeeFalse } from "../../../../redux/modules/postSlice";
const HelpeeFalse = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.postSlice.HelpeeFalseDate)
  console.log('헬피 false data:', data)


  useEffect(() => dispatch(__getHelpeeFalse()), [dispatch])
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