import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
      {data?.map((item, idx) => {
        return <Card type={"세로"} data={item} key={idx} />;
      })}
    </>
  );
};

export default AllTrue;
