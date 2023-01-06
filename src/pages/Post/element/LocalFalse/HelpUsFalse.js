import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { __getHelpUsFalse } from "../../../../redux/modules/postSlice";
import Card from "../../../../api/Card";
const HelpUsFalse = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.postSlice.helpUsFalseDate.result)
  console.log('헬퍼스 false data:', data)

  useEffect(() => { dispatch(__getHelpUsFalse('')) }, [dispatch])


  return (<>
    <StHelpeUsWrapper>
      헬퍼스(전국)
      <StCardWrapper>
        {data?.map((item, idx) => { return (<Card type={'세로'} data={item} key={idx} />) })}
      </StCardWrapper>
    </StHelpeUsWrapper>
  </>)
}
export default HelpUsFalse;

const StHelpeUsWrapper = styled.div`
width:95%;
margin:auto;
  border:1px solid #000;
`
const StCardWrapper = styled.div`
/* width:25em; */
/* height:15em; */
display:flex;
`