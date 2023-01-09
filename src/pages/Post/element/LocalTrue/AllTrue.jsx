import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { __getAllTrue } from "../../../../redux/modules/postSlice";
import Card from "../../../../components/Card";
const AllTrue = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.postSlice.AllTrueDate.result)
  // console.log('useSelect 전체 true:', data)
  const search = useSelector((state) => state.postSlice)
  const searched = useSelector((state) => state.postSlice.searched)
  // console.log('searched:', searched)
  // console.log('search:', search)



  useEffect(() => { dispatch(__getAllTrue()) }, [dispatch])
  return (<>

    <StAll>
      전체(로컬) 게시물
      {/* {searched ?
        search?.map((item, idx) => { return (<Card type={'세로'} data={item} key={idx} />) })
        :
        data?.map((item, idx) => { return (<Card type={'세로'} data={item} key={idx} />) })} */}
      {data?.map((item, idx) => { return (<Card type={'세로'} data={item} key={idx} />) })}


    </StAll>
  </>)
}

export default AllTrue;

const StAll = styled.div`
width:95%;
margin:auto;
border:1px solid #000;

`