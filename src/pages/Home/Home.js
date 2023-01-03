import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { StButton, StChip, StTag, StWrapper } from '../../components/UI/StIndex'
import CardList from './CardList';
const Home = () => {
  const TotalSlides = 10;
  const [currentSlide, setCurrentSlide] = useState(0)
  const slideRef = useRef(null)
  //    < next button >
  const NextSlide = () => {
    console.log('다음으로')
    // console.log('ref:', slideRef.current.style)
    if (currentSlide >= TotalSlides) {
      //더 이상 넘어갈 슬라이드가 없으면
      setCurrentSlide(0)  //1번째 사진으로 넘어간다
    }
    else { setCurrentSlide(currentSlide + 1) }
    console.log(currentSlide)
  }

  //    <  prev button  >
  const PrevSlide = () => {
    console.log('이전으로')
    if (currentSlide === 0) {
      setCurrentSlide(TotalSlides)
      // 마지막 사진으로 이동
    }
    else { setCurrentSlide(currentSlide - 1) }
    console.log(currentSlide)
  }


  useEffect(() => {
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${currentSlide * 5}0%)`; // 백틱을 사용하여 슬라이드로 이동하는 에니메이션을 만듭니다.
  }, [currentSlide]);



  return (
    <div>
      {/* <StWrapper> */}
      {/* <StButton>dd</StButton> */}
      {/* <StChip mode="헬퍼스">헬퍼스</StChip> */}
      <StHeaderImg src='https://www.urbanbrush.net/web/wp-content/uploads/edd/2022/11/urbanbrush-20221112200500085684.jpg'></StHeaderImg>

      <StHotClip value={currentSlide + 1}>
        <StCarouselTitle >우리 함께해요</StCarouselTitle>

        <StLeftButton onClick={PrevSlide}>왼쪽</StLeftButton>
        <StCarouselContainer >
          <StCarousel ref={slideRef}>
            1<StCarouselItem ></StCarouselItem>
            2<StCarouselItem></StCarouselItem>
            3<StCarouselItem></StCarouselItem>
            4<StCarouselItem></StCarouselItem>
            5<StCarouselItem></StCarouselItem>
            6<StCarouselItem></StCarouselItem>
            7<StCarouselItem></StCarouselItem>
            8<StCarouselItem></StCarouselItem>
            9<StCarouselItem></StCarouselItem>
            10<StCarouselItem></StCarouselItem>
          </StCarousel>
        </StCarouselContainer>

        <StRightButton onClick={NextSlide}>오른쪽</StRightButton>

      </StHotClip>

      <CardList></CardList>

      <StFooterImg>
        <Sth3>About up</Sth3>
        <Stp>헬퍼스는 재능기부, 자원보사를 돕는 커뮤니티 입니다
          따뜻한 마음과 봉사가 더 나은 지역 사뢰를 만들어 봅니다
        </Stp>

      </StFooterImg>

      {/* <StChip></StChip> */}
      {/* <StTag>d</StTag> */}
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
position:relative;
`
const StCarouselTitle = styled.h2`
`
const StCarouselContainer = styled.div`
display:flex;
width:inherit;
height:12em;
overflow:hidden;
position:relative;
border: 1px solid #000;
margin-left:2em;
`

const StLeftButton = styled.button`
width:2em;
position:absolute;
/* margin-right:100px; */
top:50%;
`

const StCarousel = styled.div`
border:2px solid #000;
/* width:100%; */
padding-left:2em;
z-index:-1;
display:flex;
/* overflow:hidden; */
`
const StRightButton = styled.button`
width:2em;
position:absolute;
right:0;
top:50%;
`
const StCarouselItem = styled.img`
border:2px solid #000;
width:18em;
height:100%;
margin-right:2em;
z-index:-1;
/* display:inline-block */
`


//    <  Foot  >
const StFooterImg = styled.div`
height:20em;
width:100%;
position:relative;
z-index:-1;
bottom:-100px;
background-image:url('http://jaemisupil.com/files/attach/images/162/941/043/b7811b30d31d07e0f589f18f2bd274fa.png');
background-size:100% 100%;
text-align:center;
`
const Sth3 = styled.h3`
`
const Stp = styled.p`
`

