import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import HelpUsFalse from "./element/LocalFalse/HelpUsFalse";
import HelperFalse from "./element/LocalFalse/HelperFalse";
import HelpeeFalse from "./element/LocalFalse/HelpeeFalse";
import HelpUsTrue from "./element/LocalTrue/HelpUsTrue";
import HelperTrue from "./element/LocalTrue/HelperTrue";
import HelpeeTrue from "./element/LocalTrue/HelpeeTrue";
import AllTrue from "./element/LocalTrue/AllTrue";
import AllFalse from "./element/LocalFalse/AllFalse";
import {
  __setBoolLocationTrue,
  __setBoolLocationFalse,
} from "../../redux/modules/postSlice";
import { StWrapper } from "../../components/UI/StIndex";

const PostList = () => {
  const dispatch = useDispatch();
  const helpUsRef = useRef(null);
  const helperRef = useRef(null);
  const helpeeRef = useRef(null);
  const allRef = useRef(null);
  const locationRef = useRef(null);

  const { isLogin } = useSelector((state) => state.userSlice);
  const storeBoolHelper = useSelector((state) => state.postSlice.boolHelper);
  const storeBoolHelpee = useSelector((state) => state.postSlice.boolHelpee);
  const storeBoolAll = useSelector((state) => state.postSlice.boolAll);
  const storeBooLocation = useSelector((state) => state.postSlice.boolLocation);

  const [boolAll, setBoolAll] = useState(storeBoolAll);
  const [boolHelpUs, setBoollHelpUs] = useState(false);
  const [boolHelper, setBoollHelper] = useState(storeBoolHelper);
  const [boolHelpee, setBoollHelpee] = useState(storeBoolHelpee);

  const setBoolAllTrue = () => {
    allRef.current.style.color = "black";
    setBoolAll(true);
    setBoollHelpUs(false);
    setBoollHelper(false);
    setBoollHelpee(false);
    helpUsRef.current.style.color = "blue";
    helpeeRef.current.style.color = "blue";
    helperRef.current.style.color = "blue";
  };

  const setBoollHelpUsTrue = () => {
    helpUsRef.current.style.color = "black";
    setBoollHelpUs(true);
    setBoollHelper(false);
    setBoollHelpee(false);
    setBoolAll(false);
    helpeeRef.current.style.color = "blue";
    helperRef.current.style.color = "blue";
    allRef.current.style.color = "blue";
  };
  const setBoollHelperTrue = () => {
    helperRef.current.style.color = "black";
    setBoollHelpUs(false);
    setBoollHelper(true);
    setBoollHelpee(false);
    setBoolAll(false);
    helpeeRef.current.style.color = "blue";
    helpUsRef.current.style.color = "blue";
    allRef.current.style.color = "blue";
  };
  const setBoollHelpeeTrue = () => {
    helpeeRef.current.style.color = "black";
    setBoollHelpUs(false);
    setBoollHelper(false);
    setBoollHelpee(true);
    setBoolAll(false);
    helperRef.current.style.color = "blue";
    helpUsRef.current.style.color = "blue";
    allRef.current.style.color = "blue";
  };

  const setBoolLocationTrue = () => {
    if (isLogin === false) {
      alert("로그인시 이용할 수 있습니다");
    } else {
      if (storeBooLocation === true) {
        locationRef.current.style.color = "black";
        dispatch(__setBoolLocationFalse());
      } else {
        locationRef.current.style.color = "blue";
        dispatch(__setBoolLocationTrue());
      }
    }
  };

  return (
    <>
      <StWrapper>
        <StTabWrapper>
          <StAll ref={allRef} onClick={setBoolAllTrue}>
            전체
          </StAll>
          <StHelpUs ref={helpUsRef} onClick={setBoollHelpUsTrue}>
            헬퍼스 게시판
          </StHelpUs>
          <StHelper ref={helperRef} onClick={setBoollHelperTrue}>
            헬퍼 게시판
          </StHelper>
          <StHelpee ref={helpeeRef} onClick={setBoollHelpeeTrue}>
            헬피 게시판
          </StHelpee>
          <StLocation ref={locationRef} onClick={setBoolLocationTrue}>
            전국
          </StLocation>
          <button>글쓰기</button>
        </StTabWrapper>
        <StCardContainer>
          {storeBooLocation ? (
            <>{boolAll ? <AllTrue /> : null}</>
          ) : (
            <>{boolAll ? <AllFalse /> : null}</>
          )}
          {storeBooLocation ? (
            <>{boolHelpUs ? <HelpUsTrue /> : null}</>
          ) : (
            <>{boolHelpUs ? <HelpUsFalse /> : null}</>
          )}
          {storeBooLocation ? (
            <>{boolHelper ? <HelperTrue /> : null}</>
          ) : (
            <>{boolHelper ? <HelperFalse /> : null}</>
          )}
          {storeBooLocation ? (
            <>{boolHelpee ? <HelpeeTrue /> : null}</>
          ) : (
            <>{boolHelpee ? <HelpeeFalse /> : null}</>
          )}
        </StCardContainer>
      </StWrapper>
    </>
  );
};

export default PostList;

const StTabWrapper = styled.div`
  display: flex;
  flex-direction: flex-start;
  width: 100%;
  margin: 3em 0 3em 0;
  div {
    margin-right: 3em;
    border-bottom: 2px solid #000;
  }
`;

const StCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1280px;
  width: 100%;
  gap: 2.25% 3.125%;
`;

const StHelpUs = styled.div`
  color: blue;
`;
const StHelper = styled.div`
  color: blue;
`;
const StHelpee = styled.div`
  color: blue;
`;

const StAll = styled.div`
  color: blue;
`;
const StLocation = styled.div`
  color: blue;
`;
