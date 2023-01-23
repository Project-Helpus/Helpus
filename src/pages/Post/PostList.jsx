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
import { useNavigate } from "react-router";

const PostList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const helpUsRef = useRef(null);
  const helperRef = useRef(null);
  const helpeeRef = useRef(null);
  const allRef = useRef(null);
  const locationRef = useRef(null);

  const userLocation1 = useSelector(
    (state) => state.mypageSlice.profile?.state1
  );
  const userLocation2 = useSelector(
    (state) => state.mypageSlice.profile?.state2
  );
  const { isLogin } = useSelector((state) => state.userSlice);
  const storeBoolHelper = useSelector((state) => state.postSlice.boolHelper);
  const storeBoolHelpee = useSelector((state) => state.postSlice.boolHelpee);
  const storeBoolHepUs = useSelector((state) => state.postSlice.boolHelpUs);
  const storeBoolAll = useSelector((state) => state.postSlice.boolAll);
  const storeBooLocation = useSelector((state) => state.postSlice.boolLocation);

  const [boolAll, setBoolAll] = useState(storeBoolAll);
  const [boolHelpUs, setBoollHelpUs] = useState(storeBoolHepUs);
  const [boolHelper, setBoollHelper] = useState(storeBoolHelper);
  const [boolHelpee, setBoollHelpee] = useState(storeBoolHelpee);
  const setBoolAllTrue = () => {
    allRef.current.style.color = "black";
    allRef.current.style.borderBottom = "4px solid #ff00ff";
    setBoolAll(true);
    setBoollHelpUs(false);
    setBoollHelper(false);
    setBoollHelpee(false);
    helpUsRef.current.style.color = "#B4B4B4";
    helpeeRef.current.style.color = "#B4B4B4";
    helperRef.current.style.color = "#B4B4B4";
    helpUsRef.current.style.borderBottom = "4px solid #B4B4B4";
    helpeeRef.current.style.borderBottom = "4px solid #B4B4B4";
    helperRef.current.style.borderBottom = "4px solid #B4B4B4";
  };

  const setBoollHelpUsTrue = () => {
    helpUsRef.current.style.color = "black";
    helpUsRef.current.style.borderBottom = "4px solid #ff00ff";
    setBoollHelpUs(true);
    setBoollHelper(false);
    setBoollHelpee(false);
    setBoolAll(false);
    helpeeRef.current.style.color = "#B4B4B4";
    helperRef.current.style.color = "#B4B4B4";
    allRef.current.style.color = "#B4B4B4";
    helpeeRef.current.style.borderBottom = "4px solid #B4B4B4";
    helperRef.current.style.borderBottom = "4px solid #B4B4B4";
    allRef.current.style.borderBottom = "4px solid #B4B4B4";
  };
  const setBoollHelperTrue = () => {
    helperRef.current.style.color = "black";
    helperRef.current.style.borderBottom = "4px solid #ff00ff";
    setBoollHelpUs(false);
    setBoollHelper(true);
    setBoollHelpee(false);
    setBoolAll(false);
    helpeeRef.current.style.color = "#B4B4B4";
    helpUsRef.current.style.color = "#B4B4B4";
    allRef.current.style.color = "#B4B4B4";
    helpeeRef.current.style.borderBottom = "4px solid #B4B4B4";
    helpUsRef.current.style.borderBottom = "4px solid #B4B4B4";
    allRef.current.style.borderBottom = "4px solid #B4B4B4";
  };
  const setBoollHelpeeTrue = () => {
    helpeeRef.current.style.color = "black";
    helpeeRef.current.style.borderBottom = "4px solid #ff00ff";
    setBoollHelpUs(false);
    setBoollHelper(false);
    setBoollHelpee(true);
    setBoolAll(false);
    helperRef.current.style.color = "#B4B4B4";
    helpUsRef.current.style.color = "#B4B4B4";
    allRef.current.style.color = "#B4B4B4";
    helperRef.current.style.borderBottom = "4px solid #B4B4B4";
    helpUsRef.current.style.borderBottom = "4px solid #B4B4B4";
    allRef.current.style.borderBottom = "4px solid #B4B4B4";
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
        <StTitleButtonWrapper>
          <StLocation>
            {userLocation1}&gt;{userLocation2}
          </StLocation>
          <StWriteButton onClick={() => navigate("/post")}>
            글쓰기
          </StWriteButton>
        </StTitleButtonWrapper>
        <StTabWrapper>
          <StTap ref={allRef} onClick={setBoolAllTrue}>
            전체
          </StTap>
          <StTap ref={helpeeRef} onClick={setBoollHelpeeTrue}>
            헬피
          </StTap>
          <StTap ref={helperRef} onClick={setBoollHelperTrue}>
            헬퍼
          </StTap>
          <StTap ref={helpUsRef} onClick={setBoollHelpUsTrue}>
            헬퍼스
          </StTap>
          <StTap ref={locationRef} onClick={setBoolLocationTrue}>
            전국
          </StTap>
        </StTabWrapper>
        <StCardContainer>
          {storeBooLocation ? (
            <>{boolAll === false || <AllTrue />}</>
          ) : (
            <>{boolAll === false || <AllFalse />}</>
          )}
          {storeBooLocation ? (
            <>{boolHelpee === false || <HelpeeTrue />}</>
          ) : (
            <>{boolHelpee === false || <HelpeeFalse />}</>
          )}
          {storeBooLocation ? (
            <>{boolHelper === false || <HelperTrue />}</>
          ) : (
            <>{boolHelper === false || <HelperFalse />}</>
          )}
          {storeBooLocation ? (
            <>{boolHelpUs === false || <HelpUsTrue />}</>
          ) : (
            <>{boolHelpUs === false || <HelpUsFalse />}</>
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
  max-width: 1280px;
  margin: 3em 0 3em 0;
  div {
    padding-bottom: 10px;
    margin-right: 3px;
    border-bottom: 4px solid #b4b4b4;
  }
`;

const StCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1280px;
  width: 100%;
  gap: 2.25% 3.125%;
`;
const StTap = styled.div`
  width: 100px;
  color: #b4b4b4;
  text-align: center;
`;
const StTitleButtonWrapper = styled.div`
  max-width: 1280px;
  margin-top: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const StLocation = styled.p`
  font-size: 28px;
  color: #ea9db4;
`;
const StWriteButton = styled.button`
  width: 150px;
  height: 50px;
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  background-color: #ea9db4;
  border-radius: 20px;
  border: none;
`;
