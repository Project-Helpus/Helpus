import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { __getHelpUsFalse } from "../../../../redux/modules/postSlice";

const HelpUsFalse = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.postSlice.HelpeeFalseDate)
  console.log('헬피 false data:', data)

  useEffect(() => dispatch(__getHelpUsFalse()), [dispatch])


  return (<>
    <StHelpeUsWrapper>
      헬퍼스(전국)
    </StHelpeUsWrapper>
  </>)
}
export default HelpUsFalse;

const StHelpeUsWrapper = styled.div`
width:95%;
margin:auto;
  border:1px solid #000;
`