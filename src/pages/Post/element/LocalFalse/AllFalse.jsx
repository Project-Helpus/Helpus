import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getAllFalse } from "../../../../redux/modules/postSlice";
import Card from "../../../../components/Card";

const AllFalse = () => {
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
  useEffect(() => {
    dispatch(__getAllFalse());
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

export default AllFalse;
