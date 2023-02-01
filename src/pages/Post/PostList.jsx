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
import { StFlex } from "../../components/UI/CardStyle/StCommon";

const PostList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const helpUsRef = useRef(null);
  const helperRef = useRef(null);
  const helpeeRef = useRef(null);
  const allRef = useRef(null);

  const userLocation1 = useSelector((state) => state.userSlice.userInfo.state1);
  const userLocation2 = useSelector((state) => state.userSlice.userInfo.state2);
  const { isLogin } = useSelector((state) => state.userSlice);
  console.log(isLogin);
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
    allRef.current.style.borderBottom = "4px solid #EA9DB4";
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
    helpUsRef.current.style.borderBottom = "4px solid #EA9DB4";
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
    helperRef.current.style.borderBottom = "4px solid #EA9DB4";
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
    helpeeRef.current.style.borderBottom = "4px solid #EA9DB4";
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

  const testRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const toggleRight = () => {
    if (isLogin === false) {
      alert("로그인시 이용할 수 있습니다");
    } else {
      testRef.current.style.transition = "0.3s";
      testRef.current.style.left = "50%";
      leftRef.current.style.color = "#b4b4b4";
      rightRef.current.style.color = "#fff";
      dispatch(__setBoolLocationTrue());
    }
  };
  const toggleLeft = () => {
    if (isLogin === false) {
      alert("로그인시 이용할 수 있습니다");
    } else {
      testRef.current.style.transition = "0.3s";
      testRef.current.style.left = "0";
      rightRef.current.style.color = "#b4b4b4";
      leftRef.current.style.color = "#fff";
      dispatch(__setBoolLocationFalse());
    }
  };

  const navigatePostCreate = () => {
    if (isLogin) {
      navigate("/post");
    } else {
      window.alert("로그인이 필요 합니다.");
      navigate("/login");
    }
  };
  return (
    <>
      <StWrapper>
        <StTitleButtonWrapper>
          <StLocation>
            {userLocation1}&nbsp;{userLocation2}
          </StLocation>
          <StWriteButton onClick={navigatePostCreate}>글쓰기</StWriteButton>
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
          <StToggleWrapper>
            <StLabelAll ref={leftRef} onClick={toggleLeft}>
              전국
            </StLabelAll>
            <StToggle ref={testRef}></StToggle>
            <StLabelMy ref={rightRef} onClick={toggleRight}>
              내위치
            </StLabelMy>
          </StToggleWrapper>
        </StTabWrapper>
        <StCardContainer>
          {storeBooLocation ? (
            <>{boolAll && <AllTrue />}</>
          ) : (
            <>{boolAll && <AllFalse />}</>
          )}
          {storeBooLocation ? (
            <>{boolHelpee && <HelpeeTrue />}</>
          ) : (
            <>{boolHelpee && <HelpeeFalse />}</>
          )}
          {storeBooLocation ? (
            <>{boolHelper && <HelperTrue />}</>
          ) : (
            <>{boolHelper && <HelperFalse />}</>
          )}
          {storeBooLocation ? (
            <>{boolHelpUs && <HelpUsTrue />}</>
          ) : (
            <>{boolHelpUs && <HelpUsFalse />}</>
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
  height: 50px;
  width: 100%;
  max-width: 1280px;
  margin: 3em 0 3em 0;
  font-size: 20px;
  div {
    padding-bottom: 10px;
    margin-right: 3px;
    line-height: 50px;
    border-bottom: 4px solid #b4b4b4;
    &:nth-child(5) {
      border-bottom: 1px solid #ffc3d5;
    }
  }
`;
const StToggleWrapper = styled.div`
  display: inline-block;
  width: 200px;
  height: 50px;
  border-radius: 50px;
  border: 1px solid #ffc3d5;
  position: relative;
`;
const StLabelAll = styled.label`
  width: 50%;
  height: 100%;
  color: #b4b4b4;
  line-height: 50px;
  text-align: center;
  display: inline-block;
`;
const StLabelMy = styled.label`
  width: 50%;
  height: 100%;
  color: #fff;
  line-height: 50px;
  text-align: center;
  display: inline-block;
`;

const StToggle = styled.input`
  width: 50%;
  height: 100%;
  left: 50%;
  border-radius: 50px;
  background-color: #ea9db4;
  position: absolute;
  z-index: -1;
  transition: 0.3s;
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
