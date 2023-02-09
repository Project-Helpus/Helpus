import { useState, useEffect } from "react";
import { forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getAllFalse } from "../redux/modules/postSlice";

export const useInfinite = (
  num,
  func,
  input
  // search,
  // calldis,
  // setCount,
  // setSearchCount,
  // count,
  // searchCount,
  // osbRef
) => {
  console.log("__getAllFalse:", __getAllFalse);

  // const input = useSelector((state) => state.postSlice.inputReciver);
  const dispatch = useDispatch();
  // const [count, setCount] = useState(0);
  const [searchCount, setSearchCount] = useState(0);

  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        dispatch(func({ count: num, input: input }));
        // setCount((prev) => prev + 12);
        num += 12;
        observer.unobserve(entry.target);
      } else return;
    });
  };
  // useEffect(() => {
  //   if (search.length > 0) {
  //     dispatch(calldis({ count: searchCount, input: input }));
  //     setSearchCount((prev) => prev + 12);
  //     setCount(0);
  //   } else {
  //     let observer;
  //     observer = new IntersectionObserver(callback, { threshold: 0.1 });
  //     observer.observe(osbRef.current);
  //     return () => {
  //       observer && observer.disconnect();
  //     };
  //   }
  // }, []);

  return [callback];
};
export default forwardRef(useInfinite);
