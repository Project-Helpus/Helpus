import styled from "styled-components";
import topImg from "../../../asset/top.jpg";
import arrowLeft from "../../../asset/arrowLeft.svg";
import arrowRight from "../../../asset/arrowRight.svg";

export const StMainWrapper = styled.div`
  max-width: 1920px;
  margin: auto;
`;

export const StTopImg = styled.div`
  height: 540px;
  width: inherit;
  position: relative;
  z-index: -1;
  top: -6em;
  background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 60%,
      rgba(255, 255, 255, 0.2) 70%,
      rgba(255, 255, 255, 0.4) 75%,
      rgba(255, 255, 255, 0.6) 80%,
      rgba(255, 255, 255, 0.7) 85%,
      rgba(255, 255, 255, 0.8) 90%,
      rgba(255, 255, 255, 0.93) 100%
    ),
    url(${topImg});
  background-size: 100% 100%;
`;
export const StTitleWrapper = styled.div`
  top: 32%;
  margin-left: 80px;
  position: absolute;
`;
export const StTopTitle = styled.h1`
  font-size: 48px;
  font-weight: 700;
  color: #fff;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.65);
`;
export const StTopSubTilte = styled.h2`
  font-size: 36px;
  font-weight: 400;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.65);
`;
export const StTransFormY = styled.div`
  transform: translateY(-220px);
`;
export const StMain = styled.div`
  max-width: 1370px;
  margin: 0 auto;
`;
export const StCarouselWrapper = styled.div`
  margin: 0 auto 40px auto;
`;
export const StCarouselTitle = styled.h2`
  font-size: 24px;
  height: 29px;
  background-color: #fff;
  width: 373px;
  margin: 0 0 20px 40px;
  cursor: pointer;
`;
export const StSubTitle = styled.div`
  font-size: 12px;
  display: inline-block;
  margin-left: 10px;
  cursor: pointer;
`;
export const StCarouselContainer = styled.div`
  display: flex;
  overflow: hidden;
`;

export const StLeftButton = styled.button`
  width: 25px;
  height: 30px;
  left: 0;
  background-color: transparent;
  background-image: url(${arrowLeft});
  background-size: cover;
  border: none;
  margin-top: 67px;
  padding: 0;
`;

export const StRightButton = styled.button`
  width: 25px;
  height: 30px;
  right: 0;
  background-color: transparent;
  background-image: url(${arrowRight});
  background-size: cover;
  border: none;
  margin-top: 67px;
  padding: 0;
`;
export const StCarousel = styled.div`
  display: flex;
  padding: 0;
`;
export const StCarouselItem = styled.div`
  padding: 0;
`;
export const StCarouselWith = styled.div`
  width: 1280px;
  margin: 0 20px 0 20px;
  box-sizing: border-box;
  padding: 0;
`;
