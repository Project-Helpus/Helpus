import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { __getHelpUsTrue } from "../../../../redux/modules/postSlice";
const HelpUsTrue = () => {
  const dispatch = useDispatch();
  // const real = useSelector((state))
  const data = useSelector((state) => state.postSlice.HelpUsTrueDate)
  console.log('useSelect 헬퍼스 true:', data)


  useEffect(() => { dispatch(__getHelpUsTrue()) }, [dispatch])

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