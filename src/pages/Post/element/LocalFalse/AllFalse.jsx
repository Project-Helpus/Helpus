import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getAllFalse } from "../../../../redux/modules/postSlice";
import ColCard from "../ColCard";

const AllFalse = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.postSlice.AllFalseDate);
  const input = useSelector((state) => state.postSlice.inputReciver);
  const { dataLength, isLoading } = useSelector((state) => state.postSlice);

  const observerTarget = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let observer = new IntersectionObserver(
      (e, io) => {
        e.forEach((e) => {
          if (e.isIntersecting) {
            io.unobserve(e.target);
            console.log(data);
            setTimeout(() => {
              if (data !== 0) {
                dispatch(__getAllFalse(count));
                setCount((prev) => prev + 12);
              }
            }, 300);
          }
        });
      },
      { threshold: 0.5 }
    );
    if (observerTarget.current) observer.observe(observerTarget.current);
    return () => observer.disconnect();
  }, [data]);

  return (
    <>
      {data?.map((item, idx) => {
        return <ColCard data={item} key={idx} />;
      })}
      {!isLoading && (
        <div
          ref={observerTarget}
          style={{
            height: "1px",
            width: "100%",
          }}
        ></div>
      )}
    </>
  );
};

export default AllFalse;
