import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getAllFalse } from "../../../../redux/modules/postSlice";
import Card from "../../../../components/Card";
import styled from "styled-components";

const AllFalse = ({ search }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.postSlice?.AllFalseDate);
  const input = useSelector((state) => state.postSlice.inputReciver);
  const { isLoading } = useSelector((state) => state.postSlice);

  const observerTarget = useRef(null);
  const [count, setCount] = useState(0);

  // useEffect(() => {
  //   let observer = new IntersectionObserver(
  //     (e, io) => {
  //       e.forEach((e) => {
  //         if (e.isIntersecting) {
  //           io.unobserve(e.target);
  //           setTimeout(() => {
  //             if (data !== 0) {
  //               dispatch(__getAllFalse(count));
  //               setCount((prev) => prev + 12);
  //             }
  //           }, 300);
  //         }
  //       });
  //     },
  //     { threshold: 0.5 }
  //   );
  //   if (observerTarget.current) observer.observe(observerTarget.current);
  //   return () => observer.disconnect();
  // }, [data]);

  // let option = {
  //   //root: null, //타겟 요소가 어디에 들어왔을 때 콜백함수를 실행할 걸일지 결정,null 이면 뷰포트가 root
  //   //rootMargin: 0px // root에 마진값을 주어 범위를 확장 가능
  //   threshold: 1.0, //타겟 요소가 얼마나 들어왔을 떄 콜백함수를 실행할 것인지 결정 ,1이면 타겟 요소 전체가 들어와야 함
  // };
  // let observer = new IntersectionObserver(callback, option);
  let osbRef = useRef(null);
  const [searchCount, setSearchCount] = useState(0);
  const [target, setTarget] = useState(false);
  const boolRef = useRef(false);
  // observer.observe(target.current) 관측 시작
  // observer.unobserve(target.current);
  // console.log("검색값:", search);
  const [bool, setBool] = useState(false);
  const callback = (entries, observer) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        await dispatch(__getAllFalse({ count: count, input: input }));
        setCount((prev) => prev + 12);
        observer.unobserve(entry.target);
      } else return;
    });
  };
  useEffect(() => {
    if (search.length > 0) {
      dispatch(__getAllFalse({ count: searchCount, input: input }));
    } else {
      let observer;
      observer = new IntersectionObserver(callback, { threshold: 1 });
      observer.observe(osbRef.current);
      return () => {
        observer && observer.disconnect();
      };
    }
  }, [count, input]);

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
    </>
  );
};

export default AllFalse;

const Stdiv = styled.div`
  width: 100%;
`;
