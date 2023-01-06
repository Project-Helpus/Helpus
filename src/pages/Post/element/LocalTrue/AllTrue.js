import { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { __getAllTrue } from "../../../../redux/modules/postSlice";
const AllTrue = () => {
  const dispatch = useDispatch();



  useEffect(() => { dispatch(__getAllTrue()) }, [dispatch])
  return (<>

    <StAll>
      전체(로컬) 게시물
    </StAll>
  </>)
}

export default AllTrue;

const StAll = styled.div`
width:95%;
margin:auto;
border:1px solid #000;

`