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
} from "./Style/StHome";
import { StFlex } from "../../components/UI/CardStyle.js/StCommon";
import HomeMain from "../../asset/HomeMain.png";
import HomeMain2 from "../../asset/HomeMain2.png";
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
    }, 2000);
    setTimeout(() => {
      crsHelperRef.current.style.transform = `translateX(-115em)`;
      crsHelpUsRef.current.style.transform = `translateX(-115em)`;
      crsHelpeeRef.current.style.transform = `translateX(-115em)`;
    }, 4000);
    setTimeout(() => {
      crsHelperRef.current.style.transform = `translateX(0)`;
      crsHelpUsRef.current.style.transform = `translateX(0)`;
      crsHelpeeRef.current.style.transform = `translateX(0)`;
    }, 6000);
  }, []);

  return (
    <StMainWrapper>
      <StTopImg>
        <StFlex>
          <StTitleWrapper>
            <StTopMainTitle>HelpUs</StTopMainTitle>
            <StTopTitle>당신의 솜씨를 나눠주세요.</StTopTitle>
            <StTopSubTilte>
              재능기부로 따뜻한 지역사회를 만들어가요.
            </StTopSubTilte>
          </StTitleWrapper>
          <div>
            <StMainImg src={HomeMain}></StMainImg>
            <StMainImg2 src={HomeMain2}></StMainImg2>
          </div>
        </StFlex>
      </StTopImg>

      <StTest>
        <StWriteButton onClick={() => navigate("/post")}>글쓰기</StWriteButton>
        <StContentsContainer>
          <StPostInfo>
            <StPostTitle>HelpUs</StPostTitle>
            <StPostSubTitle>자원봉사 함께해요</StPostSubTitle>
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
            <StPostSubTitle>도움이 필요해요</StPostSubTitle>
            <StMoreButton onClick={linkHelpee}>More</StMoreButton>
          </StPostInfoCenter>
        </StContentsContainer>

        <StContentsContainer>
          <StPostInfo>
            <StPostTitle>Helper</StPostTitle>
            <StPostSubTitle>재능을 기부해요</StPostSubTitle>
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

const StDiv = styled.div`
  max-width: 1370px;
`;
