import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { __getHelpUsTrue } from "../../../../redux/modules/postSlice";
import Card from "../../../../components/Card";
const HelpUsTrue = () => {
  const dispatch = useDispatch();
  // const real = useSelector((state))
  const data = useSelector((state) => state.postSlice.helpUsTrueDate.result);
  // const searchData = useSelector((state) => state.postSlice.searchTrue.result);
  const searched = useSelector((state) => state.postSlice.searched);
  // console.log("searched", searchData);

  // console.log('useSelect 헬퍼스 true:', data)
  const input = useSelector((state) => state.postSlice.inputReciver);

  useEffect(() => {
    dispatch(__getHelpUsTrue());
  }, [input]);

  return (
    <>
      <StHelpeeWrapper>
        헬퍼스(로컬)
        {/* {searched
          ? searchData?.map((item, idx) => {
              return <Card type={"세로"} data={item} key={idx} />;
            })
          : data?.map((item, idx) => {
              return <Card type={"세로"} data={item} key={idx} />;
          })} */}
        {data?.map((item, idx) => {
          return <Card type={"세로"} data={item} key={idx} />;
        })}
      </StHelpeeWrapper>
    </>
  );
};
export default HelpUsTrue;

const StHelpeeWrapper = styled.div`
  width: 95%;
  margin: auto;
  border: 1px solid #000;
`;
