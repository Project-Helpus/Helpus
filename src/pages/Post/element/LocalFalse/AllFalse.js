import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { __getAllFalse } from "../../../../redux/modules/postSlice";
import Card from "../../../../api/Card";
const AllFalse = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.postSlice.AllFalseDate.result)
  console.log('전체 true data:', data)

  useEffect(() => { dispatch(__getAllFalse()) }, [dispatch])
  return (<>

    <StAll>
      전체(전국) 게시물
      <StCardWrapper>
        {data?.map((item, idx) => { return (<Card type={'세로'} data={item} key={idx} />) })}
      </StCardWrapper>
    </StAll>
  </>)
}

export default AllFalse;

const StAll = styled.div`
width:95%;
margin:auto;
border:1px solid #000;

`
const StCardWrapper = styled.div`
/* width:25em; */
/* height:15em; */
display:flex;
`