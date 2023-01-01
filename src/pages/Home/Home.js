import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { StButton, StChip, StTag, StWrapper } from '../../components/UI/StIndex'
const Home = () => {
  const TotalSlides = 8;
  const [currentSlide, setCurrentSlide] = useState(0)
  const slideRef = useRef(null)
  //    < next button >
  const NextSlide = () => {
    if (currentSlide >= TotalSlides) {
      //더 이상 넘어갈 슬라이드가 없으면
      setCurrentSlide(0)  //1번째 사진으로 넘어간다
    }
    else { setCurrentSlide(currentSlide + 1) }
  }

  //    <  prev button  >
  const PrevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TotalSlides)
      // 마지막 사진으로 이동
    }
    else { setCurrentSlide(currentSlide - 1) }


    useEffect(() => {
      slideRef.current.style.transition = "all 0.5s ease-in-out";
      slideRef.current.style.transform = `translateX(-${currentSlide}00%)`; // 백틱을 사용하여 슬라이드로 이동하는 에니메이션을 만듭니다.
    }, [currentSlide]);
  }
  return (
    <div>
      {/* <StWrapper> */}
      {/* <StButton>dd</StButton> */}
      {/* <StChip mode="헬퍼스">헬퍼스</StChip> */}
      <StHeaderImg src='https://www.urbanbrush.net/web/wp-content/uploads/edd/2022/11/urbanbrush-20221112200500085684.jpg'></StHeaderImg>
      <StHotClip>
        <StCarouselTitle value={currentSlide + 1}>우리 함께해요</StCarouselTitle>
        <StFlex>
          <StLeftButton onClick={NextSlide}>왼쪽</StLeftButton>
          <StCarousel ref={slideRef}>
            <StCarouselItem></StCarouselItem>
            <StCarouselItem></StCarouselItem>
            <StCarouselItem></StCarouselItem>
            <StCarouselItem></StCarouselItem>
            <StCarouselItem></StCarouselItem>

          </StCarousel>
          <StRightButton onClick={PrevSlide}>오른쪽</StRightButton>
        </StFlex>
      </StHotClip>

      <StChip></StChip>
      <StTag>d</StTag>
      {/* </StWrapper> */}
    </div>
  );
};

export default Home;

const StHeaderImg = styled.img`
height:24em;
width:100%;
background-size:cover;
position:relative;
z-index:-1;
top:-6em;
`
const StHotClip = styled.div`
border:1px solid #000;
width:90%;
margin:auto;

`
const StCarouselTitle = styled.h2`
`
const StFlex = styled.div`
display:flex;`
const StLeftButton = styled.button`
`
const StCarousel = styled.div`
border:2px solid #000;
width:100%;
`
const StRightButton = styled.button`
`
const StCarouselItem = styled.img`
border:2px solid #000;
width:18em;
height:10em;
margin-right:2em;
`
