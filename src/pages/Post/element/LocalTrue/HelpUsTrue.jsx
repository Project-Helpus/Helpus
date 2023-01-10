import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { __getHelpUsTrue } from "../../../../redux/modules/postSlice";
import Card from "../../../../components/Card";

const HelpUsTrue = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.postSlice.helpUsTrueDate.result);
  const input = useSelector((state) => state.postSlice.inputReciver);

  useEffect(() => {
    dispatch(__getHelpUsTrue());
  }, [input]);

  return (
    <>
      <StHelpeeWrapper>
        헬퍼스(로컬)
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
