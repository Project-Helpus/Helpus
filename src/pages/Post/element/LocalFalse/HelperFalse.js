import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { __getHelperFalse } from "../../../../redux/modules/postSlice";
import Card from "../../../../api/Card";

const HelperFalse = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.postSlice.helperFalseDate.result)
  console.log('헬퍼 false data:', data)


  useEffect(() => { dispatch(__getHelperFalse()) }, [dispatch])
  return (<>
    <StHelperWrapper>
      헬퍼(전국)
      <StCardWrapper>
        {data?.map((item, idx) => { return (<Card type={'세로'} data={item} key={idx} />) })}
      </StCardWrapper>
    </StHelperWrapper>
  </>)
}
export default HelperFalse;

const StHelperWrapper = styled.div`
width:95%;
margin:auto;
  border:1px solid #000;
`
const StCardWrapper = styled.div`
/* width:25em; */
/* height:15em; */
display:flex;
`