import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
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
  __giveInput,
} from "../../redux/modules/postSlice";
import icon_search from "../../asset/icon_search.svg";
import { StWrapper } from "../../components/UI/StIndex";
import { StSearch } from "./element/styles/StPostDetail";
import {
  StTitleButtonWrapper,
  StLocation,
  StWriteButton,
  StTabWrapper,
  StTap,
  StToggleWrapper,
  StLabelAll,
  StToggle,
  StLabelMy,
  StCardContainer,
} from "./element/styles/StPostList";

const PostList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const helpUsRef = useRef(null);
  const helperRef = useRef(null);
  const helpeeRef = useRef(null);
  const allRef = useRef(null);

  const {
    isLogin,
    isLoginKakao,
    userLocation1,
    userLocation2,
    storeBoolHelper,
    storeBoolHelpee,
    storeBoolHelpUs,
    storeBoolAll,
    storeBoolLocation,
  } = useSelector((state) => ({
    isLogin: state.userSlice.isLogin,
    isLoginKakao: state.userSlice.isLoginKakao,
    userLocation1: state.userSlice.userInfo.state1,
    userLocation2: state.userSlice.userInfo.state2,
    storeBoolHelper: state.postSlice.boolHelper,
    storeBoolHelpee: state.postSlice.boolHelpee,
    storeBoolHelpUs: state.postSlice.boolHelpUs,
    storeBoolAll: state.postSlice.boolAll,
    storeBoolLocation: state.postSlice.boolLocation,
  }));

  const [search, setSearch] = useState("");
  const [boolAll, setBoolAll] = useState(storeBoolAll);
  const [boolHelpUs, setBoollHelpUs] = useState(storeBoolHelpUs);
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
    if (isLogin === false && isLoginKakao === false) {
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
    if (isLogin === false && isLoginKakao === false) {
      alert("로그인시 이용할 수 있습니다");
    } else {
      testRef.current.style.transition = "0.3s";
      testRef.current.style.left = "0";
      rightRef.current.style.color = "#b4b4b4";
      leftRef.current.style.color = "#fff";
      dispatch(__setBoolLocationFalse());
    }
  };
  const searching = (e) => {
    e.preventDefault();
    dispatch(__giveInput(search));
  };

  useEffect(() => {
    if (boolAll) {
      allRef.current.style.color = "black";
      allRef.current.style.borderBottom = "4px solid #EA9DB4";
    } else if (boolHelpUs) {
      helpUsRef.current.style.color = "black";
      helpUsRef.current.style.borderBottom = "4px solid #EA9DB4";
    } else if (boolHelpee) {
      helpeeRef.current.style.color = "black";
      helpeeRef.current.style.borderBottom = "4px solid #EA9DB4";
    } else {
      helperRef.current.style.color = "black";
      helperRef.current.style.borderBottom = "4px solid #EA9DB4";
    }
  }, []);

  useEffect(() => {
    if (storeBoolLocation === false) {
      testRef.current.style.left = "0";
      leftRef.current.style.color = "#fff";
      rightRef.current.style.color = "#b4b4b4";
    } else {
      testRef.current.style.left = "50%";
      leftRef.current.style.color = "#b4b4b4";
      rightRef.current.style.color = "#fff";
    }
  }, [storeBoolLocation]);

  const navigatePostCreate = () => {
    if (isLogin || isLoginKakao) {
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
          <StSearch onSubmit={searching}>
            <input
              type="text"
              placeholder="검색어를 입력해주세요."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <img src={icon_search} alt="" />
          </StSearch>

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
          {storeBoolLocation ? (
            <>
              {boolHelpee && <HelpeeTrue />}
              {boolHelper && <HelperTrue />}
              {boolHelpUs && <HelpUsTrue />}
              {boolAll && <AllTrue />}
            </>
          ) : (
            <>
              {boolHelpee && <HelpeeFalse search={search} />}
              {boolHelper && <HelperFalse />}
              {boolHelpUs && <HelpUsFalse />}
              {boolAll && <AllFalse search={search} />}
            </>
          )}
        </StCardContainer>
      </StWrapper>
    </>
  );
};

export default PostList;
