import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import {
  __setBoolHelpUs,
  __setBoolHelpee,
  __setBoolHelper,
  __getHelpUsFalse,
  __getHelperFalse,
  __getHelpeeFalse,
  __giveInput,
  __clearPost,
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
import HomeMain from "../../asset/main_image.webp";
import HomeMain2 from "../../asset/HomeMain2.webp";
import "../../static/fonts/font.css";
const Home = () => {
  const locationNow = useLocation();
  const HelpUsData = useSelector((state) => state.postSlice?.helpUsFalseDate);
  const HelperData = useSelector((state) => state.postSlice?.helperFalseDate);
  const HelpeeData = useSelector((state) => state.postSlice?.helpeeFalseDate);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const input = useSelector((state) => state.postSlice.inputReciver);
  const isLogIn = useSelector((state) => state.userSlice.isLogin);
  const isLoginKakao = useSelector((state) => state.userSlice.isLoginKakao);

  const crsHelperRef = useRef(null);
  const crsHelpUsRef = useRef(null);
  const crsHelpeeRef = useRef(null);

  const linkHelpUs = () => {
    if (locationNow.pathname === "/") {
      dispatch(__clearPost());
    }
    dispatch(__setBoolHelpUs());
    navigate("/postlist");
  };
  const linkHelper = () => {
    if (locationNow.pathname === "/") {
      dispatch(__clearPost());
    }
    dispatch(__setBoolHelper());
    navigate("/postlist");
  };
  const linkHelpee = () => {
    if (locationNow.pathname === "/") {
      dispatch(__clearPost());
    }
    dispatch(__setBoolHelpee());
    navigate("/postlist");
  };

  useEffect(() => {
    dispatch(__getHelpUsFalse({ count: 0, input: input }));
  }, [input]);

  useEffect(() => {
    dispatch(__getHelperFalse({ count: 0, input: input }));
  }, [input]);

  useEffect(() => {
    dispatch(__getHelpeeFalse({ count: 0, input: input }));
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
              도와주고, 도움받는 따뜻한 세상,
              <br />
              누구나 언제든지 따뜻한 손길이 필요할 때
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
              글쓰기
            </StWriteButton>
          </StWrBtnWrapper>
        ) : null}
        <StContentsContainer>
          <StPostInfo>
            <StPostTitle>HelpUs</StPostTitle>
            <StPostSubTitle>
              함께 만드는 아름다운 세상, Helpus에 참여해서 함께 가지고 있는
              재능으로 봉사활동을 해보시는건 어떤가요?
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
              사소하지만 자랑하고 싶은, 누군가에게 도움이 될 멋진 재능이 있는
              당신, Helper가 되어 내가 가진 능력을 보여주세요.
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
