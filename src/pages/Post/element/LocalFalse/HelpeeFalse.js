import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { __getHelpeeFalse } from "../../../../redux/modules/postSlice";
import Card from "../../../../components/Card";
const HelpeeFalse = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.postSlice.helpeeFalseDate.result)
  // console.log('헬피 false data:', data)


  useEffect(() => { dispatch(__getHelpeeFalse()) }, [dispatch])
  return (<>
    <StHelpeeWrapper>
      헬피(전국)
      <StCardWrapper>
        {data?.map((item, idx) => { return (<Card type={'세로'} data={item} key={idx} />) })}
      </StCardWrapper>
    </StHelpeeWrapper>
  </>)
}
export default HelpeeFalse;

const StHelpeeWrapper = styled.div`
width:95%;
margin:auto;
  border:1px solid #000;
`
const StCardWrapper = styled.div`
/* width:25em; */
/* height:15em; */
display:flex;
`