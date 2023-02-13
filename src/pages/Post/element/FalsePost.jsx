import { useEffect, useState, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  __getAllFalse,
  __getHelperFalse,
  __getHelpUsFalse,
  __getHelpeeFalse,
  __setPostEnd,
} from "../../../redux/modules/postSlice";

import Card from "../../../components/Card";

const FalsePost = ({ num, search }, osbRef) => {
  const dispatch = useDispatch();

  const { helpee, helper, helpUs, falseAll, input, postEnd } = useSelector(
    (state) => ({
      helpee: state.postSlice?.helpeeFalseDate,
      helper: state.postSlice?.helperFalseDate,
      helpUs: state.postSlice?.helpUsFalseDate,
      falseAll: state.postSlice?.AllFalseDate,
      input: state.postSlice.inputReciver,
      postEnd: state.postSlice.postEnd,
    })
  );
  let data;
  let func;
  const [count, setCount] = useState(0);
  const [searchCount, setSearchCount] = useState(0);
  switch (num) {
    case 0:
      data = falseAll;
      func = __getAllFalse;
      break;
    case 1:
      data = helpee;
      func = __getHelpeeFalse;
      break;
    case 2:
      data = helper;
      func = __getHelperFalse;
      break;
    case 3:
      data = helpUs;
      func = __getHelpUsFalse;
      break;
    default:
      data = falseAll;
      func = __getAllFalse;
  }

  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        dispatch(func({ count: count, input: input }));
        setCount((prev) => prev + 12);
        observer.unobserve(entry.target);
      } else return;
    });
  };

  useEffect(() => {
    dispatch(__setPostEnd(false));
  }, [num]);

  useEffect(() => {
    if (search.length > 0) {
      dispatch(func({ count: searchCount, input: input }));
      setSearchCount((prev) => prev + 12);
      setCount(0);
    } else {
      if (postEnd === false) {
        let observer;
        observer = new IntersectionObserver(callback, { threshold: 1 });
        observer.observe(osbRef.current);
        return () => {
          observer && observer.disconnect();
        };
      } else return;
    }
  }, [count, input]);

  useEffect(() => {
    setCount(0);
    dispatch(__setPostEnd(false));
  }, [num]);
  console.log("data:");
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
export default forwardRef(FalsePost);
