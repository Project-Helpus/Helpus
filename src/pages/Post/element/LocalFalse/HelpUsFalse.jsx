import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { __getHelpUsFalse } from "../../../../redux/modules/postSlice";
import Card from "../../../../components/Card";
const HelpUsFalse = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.postSlice.helpUsFalseDate.result);
  // const searchData = useSelector((state) => state.postSlice.searchFalse.result);
  const searched = useSelector((state) => state.postSlice.searched);
  // console.log("searched", searchData);
  const input = useSelector((state) => state.postSlice.inputReciver);

  useEffect(() => {
    dispatch(__getHelpUsFalse(""));
  }, [input]);

  return (
    <>
      <StHelpeUsWrapper>
        헬퍼스(전국)
        <StCardWrapper>
          {/* {searched ? (searchData?.map((item, idx) => { return (<Card type={'세로'} data={item} key={idx} />) }))
          : (data?.map((item, idx) => { return (<Card type={'세로'} data={item} key={idx} />) }))} */}
          {data?.map((item, idx) => {
            return <Card type={"세로"} data={item} key={idx} />;
          })}
        </StCardWrapper>
      </StHelpeUsWrapper>
    </>
  );
};
export default HelpUsFalse;

const StHelpeUsWrapper = styled.div`
  width: 95%;
  margin: auto;
  border: 1px solid #000;
`;
const StCardWrapper = styled.div`
  /* width:25em; */
  /* height:15em; */
  display: flex;
`;
