import styled from "styled-components";
import topImg from "../../../asset/top.jpg";

export const StMainWrapper = styled.div`
  max-width: 120em;
  margin: auto;
`;

export const StTopImg = styled.div`
  height: 45em;
  width: 120em;
  padding-left: 14.06em;
  background: #f8eded;
  /* width: inherit;
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
  background-size: 100% 100%; */
  border: 1px solid #000;
`;
export const StTitleWrapper = styled.div`
  width: 39.81em;
`;
export const StTopMainTitle = styled.h1`
  font-size: 8.75em;
  font-weight: 400;
  color: #dc6b94;
`;
export const StTopTitle = styled.h1`
  font-size: 3em;
  font-weight: 700;
  color: #fff;
  margin: 0;
  color: #7c7c7c;
`;
export const StTopSubTilte = styled.h2`
  font-size: 2.25em;
  font-weight: 400;
  color: #7c7c7c;
`;
export const StMainImg = styled.img`
  width: 30em;
  height: 36.13em;
  margin-left: 15.19em;
  /* border: 0.05em solid #ea9db4; */
`;
export const StMainImg2 = styled.img`
  width: 28.1em;
  height: 13.94em;
  border-radius: 1em;
  position: relative;
  transform: translateY(-5.06em);
  z-index: 1;
`;
export const StWriteButton = styled.button`
  width: 6.25em;
  height: 2.5em;
  border: 0.13em solid #ea9db4;
  border-radius: 62.44em;
  font-size: 1em;
  color: #ea9db4;
  background-color: #fff;
  margin-bottom: 2.19em;
  cursor: pointer;
  &:hover {
    background-color: #dc6b94;
    color: #fff;
  }
`;

/////////
export const StTest = styled.div`
  width: 92.5em;
  margin: 5.5em auto;
`;
export const StContentsContainer = styled.div`
  height: 23.56em;
  display: flex;
  margin-bottom: 5em;
`;
export const StPostInfo = styled.div`
  width: 35em;
  margin-right: 2em;
  padding: 1em 0 1.5em 1.5em;
  background-color: #f8eded;
  border: 0.1em solid #ea9db4;
  border-radius: 1em;
`;
export const StPostInfoCenter = styled.div`
  width: 35em;
  margin-left: 2em;
  padding: 1em 0 1.5em 1.5em;
  background-color: #f8eded;
  border: 0.1em solid #ea9db4;
  border-radius: 1em;
`;
export const StPostTitle = styled.p`
  font-size: 5em;
  font-weight: 400;
  color: #dc6b94;
`;
export const StPostSubTitle = styled.p`
  font-size: 1.5em;
  font-weight: 600;
  color: #7c7c7c;
`;
export const StAutoCarousel = styled.div`
  width: 55em;
  display: flex;
`;
export const StHidden = styled.div`
  overflow: hidden;
`;
export const StCrsContainer = styled.div`
  display: flex;
`;
export const StMoreButton = styled.button`
  width: 5.69em;
  height: 2.5em;
  color: #fff;
  font-size: 1em;
  font-weight: 400;
  background: #ea9db4;
  border-radius: 49.95em;
  border: none;
  margin-top: 10.5em;
  &:hover {
    background-color: #dc6b94;
  }
`;
