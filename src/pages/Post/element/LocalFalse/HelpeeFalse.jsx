import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getHelpeeFalse } from "../../../../redux/modules/postSlice";
import Card from "../../../../components/Card";

const HelpeeFalse = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.postSlice.helpeeFalseDate.result);
  const input = useSelector((state) => state.postSlice.inputReciver);

  useEffect(() => {
    dispatch(__getHelpeeFalse());
  }, [input]);

  return (
    <>
      {data?.map((item, idx) => {
        return <Card type={"세로"} data={item} key={idx} />;
      })}
    </>
  );
};
export default HelpeeFalse;
