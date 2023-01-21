import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import CardList from "./CardList";
import styled from "styled-components";
import {
  __getHelpUsFalse,
  __setBoolHelpUs,
} from "../../redux/modules/postSlice";
import Card from "../../components/Card";
import {
  StMainWrapper,
  StCarouselTitle,
  StCarouselContainer,
  StLeftButton,
  StRightButton,
  StCarousel,
  StCarouselItem,
  StTransFormY,
  StTopImg,
  StCarouselWrapper,
  StMain,
  StSubTitle,
  StTopSubTilte,
  StTopTitle,
  StTitleWrapper,
  StCarouselWith,
} from "./Style/StHome";
import { __getWishPost, __test } from "../../redux/modules/mypageSlice";
import { StFlex } from "./Style/StCardList";

const Home = () => {
  const data = useSelector((state) => state.postSlice.helpUsFalseDate.result);
  const [currentSlide, setCurrentSlide] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const slideRef = useRef(null);
  const helpUsRef = useRef(null);
  const TotalSlides = 10;
  //    < next button >
  const NextSlide = () => {
    if (currentSlide >= TotalSlides) {
      //더 이상 넘어갈 슬라이드가 없으면
      setCurrentSlide(0); //1번째 사진으로 넘어간다
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  //    <  prev button  >
  const PrevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TotalSlides);
      // 마지막 사진으로 이동
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const linkHelpUs = () => {
    dispatch(__setBoolHelpUs());
    navigate("/postlist");
  };
  const onMouseOverHandlerHelpUs = () => {
    helpUsRef.current.style.color = "#7C7C7C";
  };
  const onMouseOutHandlerHelpUs = () => {
    helpUsRef.current.style.color = "#fff";
  };

  const logedIn = useSelector((state) => state.userSlice);
  useEffect(() => {
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${currentSlide * 1300}px)`;
  }, [currentSlide]);
  useEffect(() => {
    dispatch(__getHelpUsFalse());
  }, [dispatch]);
  useEffect(() => {
    dispatch(__getWishPost());
  }, [dispatch]);

  useEffect(() => {
    dispatch(__test());
  }, [dispatch]);

  return (
    <StMainWrapper>
      <StTopImg>
        <StTitleWrapper>
          <StDiv>
            <StTopTitle>당신의 솜씨를 나눠주세요.</StTopTitle>
          </StDiv>
          <StTopSubTilte>
            재능기부로 따뜻한 지역사회를 만들어가요.
          </StTopSubTilte>
        </StTitleWrapper>
      </StTopImg>
      <StTransFormY>
        <StMain>
          <StCarouselWrapper value={currentSlide + 1}>
            <StCarouselTitle
              onClick={linkHelpUs}
              onMouseOver={onMouseOverHandlerHelpUs}
              onMouseOut={onMouseOutHandlerHelpUs}
            >
              함께해요 Helpus
              <StSubTitle ref={helpUsRef} onClick={linkHelpUs}>
                더보기
              </StSubTitle>
            </StCarouselTitle>
            <StFlex>
              <StLeftButton onClick={PrevSlide}></StLeftButton>
              <StCarouselWith>
                <StCarouselContainer>
                  <StCarousel ref={slideRef}>
                    {data?.map((item, idx) => {
                      return (
                        <StCarouselItem key={idx}>
                          <Card type={"케러셀"} data={item} />{" "}
                        </StCarouselItem>
                      );
                    })}
                  </StCarousel>
                </StCarouselContainer>
              </StCarouselWith>
              <StRightButton onClick={NextSlide}></StRightButton>
            </StFlex>
          </StCarouselWrapper>
          <CardList></CardList>
        </StMain>
      </StTransFormY>
    </StMainWrapper>
  );
};

export default Home;

const StDiv = styled.div`
  max-width: 1370px;
`;
