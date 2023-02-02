import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";
import {
  __setBoolHelpUs,
  __setBoolHelpee,
  __setBoolHelper,
  __getHelpUsFalse,
  __getHelperFalse,
  __getHelpeeFalse,
} from "../../redux/modules/postSlice";
import Card from "../../components/Card";
import {
  StMainWrapper,
  StTopImg,
  StTopSubTilte,
  StTopTitle,
  StTitleWrapper,
  StTest,
  StAutoCarousel,
  StContentsContainer,
  StPostInfo,
  StPostInfoCenter,
  StPostTitle,
  StPostSubTitle,
  StMoreButton,
  StCrsContainer,
  StHidden,
  StTopMainTitle,
  StMainImg,
  StMainImg2,
  StWriteButton,
  StWrBtnWrapper,
} from "./Style/StHome";
import { StFlex } from "../../components/UI/CardStyle/StCommon";
import HomeMain from "../../asset/main_image.png";
import HomeMain2 from "../../asset/HomeMain2.png";
import "../../static/fonts/font.css";

const Home = () => {
  const HelpUsData = useSelector(
    (state) => state.postSlice.helpUsFalseDate?.result
  );
  const HelperData = useSelector(
    (state) => state.postSlice.helperFalseDate?.result
  );
  const HelpeeData = useSelector(
    (state) => state.postSlice.helpeeFalseDate?.result
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const crsHelperRef = useRef(null);
  const crsHelpUsRef = useRef(null);
  const crsHelpeeRef = useRef(null);
  const isLogIn = useSelector((state) => state.userSlice.isLogin);
  const isLoginKakao = useSelector((state) => state.userSlice.isLoginKakao);

  const linkHelpUs = () => {
    dispatch(__setBoolHelpUs());
    navigate("/postlist");
  };
  const linkHelper = () => {
    dispatch(__setBoolHelper());
    navigate("/postlist");
  };
  const linkHelpee = () => {
    dispatch(__setBoolHelpee());
    navigate("/postlist");
  };

  useEffect(() => {
    dispatch(__getHelpUsFalse());
  }, [dispatch]);

  useEffect(() => {
    dispatch(__getHelperFalse(""));
  }, [dispatch]);

  useEffect(() => {
    dispatch(__getHelpeeFalse(""));
  }, [dispatch]);

  useEffect(() => {
    crsHelperRef.current.style.transition = "all 1s ease-in-out";
    crsHelpUsRef.current.style.transition = "all 1s ease-in-out";
    crsHelpeeRef.current.style.transition = "all 1s ease-in-out";
    setTimeout(() => {
      crsHelperRef.current.style.transform = `translateX(-57.5em)`;
      crsHelpUsRef.current.style.transform = `translateX(-57.5em)`;
      crsHelpeeRef.current.style.transform = `translateX(-57.5em)`;
    }, 3000);
    setTimeout(() => {
      crsHelperRef.current.style.transform = `translateX(-115em)`;
      crsHelpUsRef.current.style.transform = `translateX(-115em)`;
      crsHelpeeRef.current.style.transform = `translateX(-115em)`;
    }, 6000);
    setTimeout(() => {
      crsHelperRef.current.style.transform = `translateX(0)`;
      crsHelpUsRef.current.style.transform = `translateX(0)`;
      crsHelpeeRef.current.style.transform = `translateX(0)`;
    }, 9000);
  }, []);

  return (
    <StMainWrapper>
      <StTopImg>
        <StFlex>
          <StTitleWrapper>
            <StTopMainTitle>HelpUs</StTopMainTitle>
            <StTopTitle>Help me, Help you, Help Us.</StTopTitle>
            <StTopSubTilte>
              도와주고, 도움받는 따뜻한 세상 누구나,
              <br /> 언제든지 따뜻한 손길이 필요할 때
            </StTopSubTilte>
          </StTitleWrapper>
          <div>
            <StMainImg src={HomeMain}></StMainImg>
            <StMainImg2 src={HomeMain2}></StMainImg2>
          </div>
        </StFlex>
      </StTopImg>

      <StTest>
        {(isLoginKakao || isLogIn) === true ? (
          <StWrBtnWrapper>
            <StWriteButton onClick={() => navigate("/post")}>
              글쓰기
            </StWriteButton>
          </StWrBtnWrapper>
        ) : null}

        <StContentsContainer>
          <StPostInfo>
            <StPostTitle>HelpUs</StPostTitle>
            <StPostSubTitle>
              모두가 힘을 합쳐 만드는 아름다운 세상
              <br />
              우리는 모두 헬퍼!
              <br /> 함께하면 더욱 즐거운 봉사활동 어때요?
            </StPostSubTitle>
            <StMoreButton onClick={linkHelpUs}>More</StMoreButton>
          </StPostInfo>
          <StAutoCarousel>
            <StHidden>
              <StCrsContainer ref={crsHelpUsRef}>
                {HelpUsData?.map((item) => {
                  return (
                    <div key={item.postId}>
                      <Card type={"케러셀"} data={item} />{" "}
                    </div>
                  );
                })}
              </StCrsContainer>
            </StHidden>
          </StAutoCarousel>
        </StContentsContainer>

        <StContentsContainer>
          <StAutoCarousel>
            <StHidden>
              <StCrsContainer ref={crsHelpeeRef}>
                {HelpeeData?.map((item) => {
                  return (
                    <div key={item.postId}>
                      <Card type={"케러셀"} data={item} />{" "}
                    </div>
                  );
                })}
              </StCrsContainer>
            </StHidden>
          </StAutoCarousel>
          <StPostInfoCenter>
            <StPostTitle>Helpee</StPostTitle>
            <StPostSubTitle>
              도움이 필요한 일이 있는 법이죠.
              <br />
              내게 필요한 재능을 어필해보세요.
            </StPostSubTitle>
            <StMoreButton onClick={linkHelpee}>More</StMoreButton>
          </StPostInfoCenter>
        </StContentsContainer>

        <StContentsContainer>
          <StPostInfo>
            <StPostTitle>Helper</StPostTitle>
            <StPostSubTitle>
              내가 가진 능력을 보여주세요.
              <br /> 사소하지만 자랑하고 싶은, 누군가에게 도움이 될 멋진 재능이
              있나요?
            </StPostSubTitle>
            <StMoreButton onClick={linkHelper}>More</StMoreButton>
          </StPostInfo>
          <StAutoCarousel>
            <StHidden>
              <StCrsContainer ref={crsHelperRef}>
                {HelperData?.map((item) => {
                  return (
                    <div key={item.postId}>
                      <Card type={"케러셀"} data={item} />{" "}
                    </div>
                  );
                })}
              </StCrsContainer>
            </StHidden>
          </StAutoCarousel>
        </StContentsContainer>
      </StTest>
    </StMainWrapper>
  );
};

export default Home;
