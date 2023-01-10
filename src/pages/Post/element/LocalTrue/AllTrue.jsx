import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { __getAllTrue } from "../../../../redux/modules/postSlice";
import Card from "../../../../components/Card";

const AllTrue = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.postSlice.AllTrueDate.result);
  const input = useSelector((state) => state.postSlice.inputReciver);

  useEffect(() => {
    dispatch(__getAllTrue());
  }, [input]);
  return (
    <>
      <StAll>
        전체(로컬) 게시물
        {data?.map((item, idx) => {
          return <Card type={"세로"} data={item} key={idx} />;
        })}
      </StAll>
    </>
  );
};

export default AllTrue;

const StAll = styled.div`
  width: 95%;
  margin: auto;
  border: 1px solid #000;
`;
