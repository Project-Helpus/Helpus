import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { __getHelperFalse } from "../../../../redux/modules/postSlice";


const HelperFalse = () => {
  const dispatch = useDispatch();
  const real = useSelector((state) => state.postSlice.HelperFalseDate)
  console.log('헬퍼 false real:', real)


  useEffect(() => dispatch(__getHelperFalse()), [dispatch])
  return (<>
    <StHelperWrapper>
      헬퍼(전국)
    </StHelperWrapper>
  </>)
}
export default HelperFalse;

const StHelperWrapper = styled.div`
width:95%;
margin:auto;
  border:1px solid #000;
`