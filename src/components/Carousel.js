import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import CrsLeft from "../asset/CrsLeft.svg";
import CrsRight from "../asset/CrsRight.svg";
import { StFlex } from "./UI/CardStyle/StCommon";

const Carousel = ({ children }) => {
  const crsRef = useRef(null);
  const preRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const TotalSlides = children.length;
  const moveCrsLeft = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TotalSlides);
      // 마지막 사진으로 이동
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };
  const moveCrsRight = () => {
    if (currentSlide >= TotalSlides) {
      //더 이상 넘어갈 슬라이드가 없으면 //1번째 사진으로 넘어간다
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };
  const preview = (img) => {
    preRef.current.src = img;
  };

  useEffect(() => {
    crsRef.current.style.transition = "all 0.5s ease-in-out";
    crsRef.current.style.transform = `translateX(-${currentSlide * 12.88}em)`;
  }, [currentSlide]);

  return (
    <StGroupImgs value={currentSlide + 1}>
      <StCrsLeftButton src={CrsLeft} onClick={moveCrsLeft}></StCrsLeftButton>
      <StCrsRightButton
        src={CrsRight}
        onClick={moveCrsRight}
      ></StCrsRightButton>
      <StHidden>
        <StFlex ref={crsRef}>
          {children.imageUrls?.map((item, idx) => {
            return (
              <StCrsImg src={item} key={idx} onClick={() => preview(item)} />
            );
          })}
        </StFlex>
      </StHidden>
    </StGroupImgs>
  );
};
export default Carousel;

const StGroupImgs = styled.div`
  width: 50em;
  position: relative;
  margin: 1.25em 0 2.5em 0;
`;
const StHidden = styled.div`
  overflow: hidden;
  display: flex;
`;

export const StCrsLeftButton = styled.img`
  cursor: pointer;
  position: absolute;
  top: 40%;
  transform: translateX(-3em);
`;

export const StCrsRightButton = styled.img`
  cursor: pointer;
  position: absolute;
  top: 40%;
  right: 0;
  transform: translateX(3em);
`;

export const StCrsImg = styled.img`
  min-width: 11.38em;
  border: 0.06em solid rgb(240, 240, 240);
  height: 6.48em;
  margin-right: 1.5em;
  border-radius: 20px;
  cursor: pointer;
  object-fit: contain;
  background-color: rgb(245, 245, 245);
  box-sizing: content-box;
`;
