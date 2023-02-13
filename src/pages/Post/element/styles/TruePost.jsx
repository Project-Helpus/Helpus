import { useEffect, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  __getAllTrue,
  __getHelpeeTrue,
  __getHelperTrue,
  __getHelpUsTrue,
} from "../../../../redux/modules/postSlice";
import Card from "../../../../components/Card";

const TruePost = ({ num }) => {
  const dispatch = useDispatch();

  const { helpee, helper, helpUs, trueAll, input } = useSelector((state) => ({
    helpee: state.postSlice.helpeeTrueDate?.result,
    helper: state.postSlice.helperTrueDate?.result,
    helpUs: state.postSlice.helpUsTrueDate?.result,
    trueAll: state.postSlice.AllTrueDate?.result,
    input: state.postSlice.inputReciver,
    postEnd: state.postSlice.postEnd,
  }));
  let data;
  let func;
  switch (num) {
    case 0:
      data = trueAll;
      func = __getAllTrue;
      break;
    case 1:
      data = helpee;
      func = __getHelpeeTrue;
      break;
    case 2:
      data = helper;
      func = __getHelperTrue;
      break;
    case 3:
      data = helpUs;
      func = __getHelpUsTrue;
      break;
    default:
      data = trueAll;
      func = __getAllTrue;
  }

  useEffect(() => {
    dispatch(func());
  }, [input, num]);
  console.log("data:", data);
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
export default forwardRef(TruePost);
