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
  StTopContainer,
  StTopSubTilte,
  StImgContainer,
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
import HomeMain from "../../asset/main_image.png";
import HomeMain2 from "../../asset/HomeMain2.png";
import "../../static/fonts/font.css";
import { __giveInput } from "../../redux/modules/postSlice";
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
  const input = useSelector((state) => state.postSlice.inputReciver);
  const isLogIn = useSelector((state) => state.userSlice.isLogin);
  const isLoginKakao = useSelector((state) => state.userSlice.isLoginKakao);

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
  }, [input]);

  useEffect(() => {
    dispatch(__getHelperFalse(""));
  }, [input]);

  useEffect(() => {
    dispatch(__getHelpeeFalse(""));
  }, [input]);

  useEffect(() => {
    dispatch(__giveInput(""));
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
        <StTopContainer>
          <StTitleWrapper>
            <StTopMainTitle>HelpUs</StTopMainTitle>
            <StTopTitle>HelpUs Helper Helpee</StTopTitle>
            <StTopSubTilte>
              ????????????, ???????????? ????????? ??????,
              <br />
              ????????? ???????????? ????????? ????????? ????????? ???
            </StTopSubTilte>
          </StTitleWrapper>
          <StImgContainer>
            <StMainImg src={HomeMain}></StMainImg>
            <StMainImg2 src={HomeMain2}></StMainImg2>
          </StImgContainer>
        </StTopContainer>
      </StTopImg>
      <StTest>
        {(isLoginKakao || isLogIn) === true ? (
          <StWrBtnWrapper>
            <StWriteButton onClick={() => navigate("/post")}>
              ?????????
            </StWriteButton>
          </StWrBtnWrapper>
        ) : null}
        <StContentsContainer>
          <StPostInfo>
            <StPostTitle>HelpUs</StPostTitle>
            <StPostSubTitle>
              ?????? ????????? ???????????? ??????, Helpus??? ???????????? ?????? ????????? ??????
              ???????????? ??????????????? ??????????????? ?????????????
            </StPostSubTitle>
            <StMoreButton onClick={linkHelpUs}>More</StMoreButton>
          </StPostInfo>
          <StAutoCarousel>
            <StHidden>
              <StCrsContainer ref={crsHelpUsRef}>
                {HelpUsData?.map((item) => {
                  return (
                    <div key={item.postId}>
                      <Card type={"?????????"} data={item} />{" "}
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
                      <Card type={"?????????"} data={item} />{" "}
                    </div>
                  );
                })}
              </StCrsContainer>
            </StHidden>
          </StAutoCarousel>
          <StPostInfoCenter>
            <StPostTitle>Helpee</StPostTitle>
            <StPostSubTitle>
              ????????? ????????? ?????? ?????? ?????????.
              <br />
              ?????? ????????? ????????? ??????????????????.
            </StPostSubTitle>
            <StMoreButton onClick={linkHelpee}>More</StMoreButton>
          </StPostInfoCenter>
        </StContentsContainer>
        <StContentsContainer>
          <StPostInfo>
            <StPostTitle>Helper</StPostTitle>
            <StPostSubTitle>
              ??????????????? ???????????? ??????, ??????????????? ????????? ??? ?????? ????????? ??????
              ??????, Helper??? ?????? ?????? ?????? ????????? ???????????????.
            </StPostSubTitle>
            <StMoreButton onClick={linkHelper}>More</StMoreButton>
          </StPostInfo>
          <StAutoCarousel>
            <StHidden>
              <StCrsContainer ref={crsHelperRef}>
                {HelperData?.map((item) => {
                  return (
                    <div key={item.postId}>
                      <Card type={"?????????"} data={item} />{" "}
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
