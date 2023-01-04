import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { __getAllFalse } from "../../../../redux/modules/postSlice";
const AllFalse = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.postSlice.AllFalseDate)
  console.log('전체 true data:', data)

  useEffect(() => { dispatch(__getAllFalse()) }, [])
  return (<>

    <StAll>
      전체(전국) 게시물
    </StAll>
  </>)
}

export default AllFalse;

const StAll = styled.div`
width:95%;
margin:auto;
border:1px solid #000;

`