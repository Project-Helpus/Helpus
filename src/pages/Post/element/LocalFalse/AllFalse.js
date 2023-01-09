import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { __getAllFalse, } from "../../../../redux/modules/postSlice";
import Card from "../../../../components/Card";
const AllFalse = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.postSlice.AllFalseDate.result)
  const search = useSelector((state) => state.postSlice.searchFalse)
  const searched = useSelector((state) => state.postSlice.searched)
  // console.log('useSelect 전체 true:', data)
  // console.log('useSelect search:', search)
  // console.log('searched:', searched)

  useEffect(() => { dispatch(__getAllFalse()) }, [dispatch])

  return (<>

    <StAll>
      전체(전국) 게시물
      <StCardWrapper>
        {/* {searched ?
          search?.map((item, idx) => { return (<Card type={'세로'} data={item} key={idx} />) })
          :
          data?.map((item, idx) => { return (<Card type={'세로'} data={item} key={idx} />) })} */}
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