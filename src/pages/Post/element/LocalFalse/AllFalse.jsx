import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getAllFalse } from "../../../../redux/modules/postSlice";
import Card from "../../../../components/Card";
import styled from "styled-components";
import { Spinner } from "../styles/Spinner";

const AllFalse = ({ search }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.postSlice?.AllFalseDate);
  const input = useSelector((state) => state.postSlice.inputReciver);
  const { isLoading } = useSelector((state) => state.postSlice);

  const observerTarget = useRef(null);
  const [count, setCount] = useState(0);
  const searched = useSelector((state) => state.postSlice.searchBool);

  let osbRef = useRef(null);
  const [searchCount, setSearchCount] = useState(0);
  const [target, setTarget] = useState(false);
  const boolRef = useRef(false);
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

  if (isLoading === true) return <Spinner />;
  else
    return (
      <>
        {data?.map((item, idx) => {
          return <Card type={"세로"} data={item} key={idx} />;
        })}
        <Stdiv ref={osbRef}></Stdiv>
      </>
    );
};

export default AllFalse;

const Stdiv = styled.div`
  width: 100%;
`;
