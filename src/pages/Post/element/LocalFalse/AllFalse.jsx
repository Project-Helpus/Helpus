import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getAllFalse } from "../../../../redux/modules/postSlice";
import Card from "../../../../components/Card";
import styled from "styled-components";
import useInfinite from "../../../../components/useInfiniteScroll";
const AllFalse = ({ search }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.postSlice?.AllFalseDate);
  const input = useSelector((state) => state.postSlice.inputReciver);
  const postEnd = useSelector((state) => state.postSlice.postEnd);
  const osbRef = useRef(null);
  const endRef = useRef(null);

  const [count, setCount] = useState(0);
  // const [callback] = useInfinite(count, __getAllFalse, input);
  const [searchCount, setSearchCount] = useState(0);

  if (postEnd === true) {
    endRef.current.innerHTML = "마지막 게시글 입니다";
  }
  // console.log(postEnd);
  // if (postEnd === true) {

  // }
  useEffect(() => {
    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          dispatch(__getAllFalse({ count: count, input: input }));
          setCount((prev) => prev + 12);
          observer.unobserve(entry.target);
        } else return;
      });
    };
    if (search.length > 0) {
      dispatch(__getAllFalse({ count: searchCount, input: input }));
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

  useEffect(() => {});
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
      <Stdiv ref={osbRef}></Stdiv>
      <Stdiv ref={endRef}>로딩중...</Stdiv>
    </>
  );
};

export default AllFalse;

const Stdiv = styled.p`
  margin-top: 400px;
  font-size: 50px;
`;
