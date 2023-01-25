import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
      {data?.length === 0 ? (
        <p>게시글이 없습니다</p>
      ) : (
        <>
          {data?.map((item, idx) => {
            return <Card type={"세로"} data={item} key={idx} />;
          })}
        </>
      )}
    </>
  );
};

export default HelpUsTrue;
