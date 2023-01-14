import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getHelpeeTrue } from "../../../../redux/modules/postSlice";
import Card from "../../../../components/Card";

const HelpeeTrue = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.postSlice.helpeeTrueDate.result);
  const input = useSelector((state) => state.postSlice.inputReciver);

  useEffect(() => {
    dispatch(__getHelpeeTrue());
  }, [input]);

  return (
    <>
      {data?.map((item, idx) => {
        return <Card type={"세로"} data={item} key={idx} />;
      })}
    </>
  );
};
export default HelpeeTrue;
