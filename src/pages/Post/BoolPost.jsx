import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  __getAllFalse,
  __getHelperFalse,
  __getHelpUsFalse,
  __getHelpeeFalse,
} from "../../redux/modules/postSlice";
import Card from "../../components/Card";
import { forwardRef } from "react";

const BoolPost = ({ num, search }, osbRef) => {
  const dispatch = useDispatch();

  // const osbRef = useRef(null);
  const endRef = useRef(null);

  // console.log("num:", num);

  const { helpee, helper, helpUs, falseAll, input } = useSelector((state) => ({
    helpee: state.postSlice?.helpeeFalseDate,
    helper: state.postSlice.helperFalseDate?.result,
    helpUs: state.postSlice.helpUsFalseDate?.result,
    falseAll: state.postSlice?.AllFalseDate,
    input: state.postSlice.inputReciver,
  }));
  const a = useSelector((state) => state.postSlice);
  console.log("컴포넌트:", a);

  let data;
  let func;
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
  console.log("data:", data, "func:", func);

  const [count, setCount] = useState(0);
  const [searchCount, setSearchCount] = useState(0);

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
    if (search.length > 0) {
      dispatch(func({ count: searchCount, input: input }));
      setSearchCount((prev) => prev + 12);
      setCount(0);
    } else {
      let observer;
      observer = new IntersectionObserver(callback, { threshold: 1 });
      observer.observe(osbRef.current);
      return () => {
        observer && observer.disconnect();
      };
    }
  }, [count, input]);

  useEffect(() => {
    setCount(0);
  }, [num]);

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
      {/* <Stdiv ref={osbRef}></Stdiv> */}
      {/* <Stdiv ref={endRef}>로딩중...</Stdiv> */}
    </>
  );
};
export default forwardRef(BoolPost);

const Stdiv = styled.p`
  margin-top: 400px;
  font-size: 50px;
`;
