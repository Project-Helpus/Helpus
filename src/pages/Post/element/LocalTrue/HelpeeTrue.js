import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { __getHelpeeTrue } from "../../../../redux/modules/postSlice";

const HelpeeTrue = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.postSlice.helpeeTrueDate)
  console.log('헬피 tre data:', data)



  useEffect(() => dispatch(__getHelpeeTrue()), [dispatch])

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