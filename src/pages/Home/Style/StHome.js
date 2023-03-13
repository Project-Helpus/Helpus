import styled from "styled-components";

export const StMainWrapper = styled.div`
  max-width: 120em;
  margin: auto;
`;

export const StTopImg = styled.div`
  max-width: 120em;
  min-width: 77em;
  background: #f8eded;
  border: 1px solid #ea9db4;
`;
export const StTitleWrapper = styled.div``;

export const StTopContainer = styled.div`
  display: flex;
  width: 78em;
  height: 45em;
  margin: 0 auto;
`;

export const StImgContainer = styled.div`
  margin: auto;
  width: 40em;
  height: 618px;
`;

export const StTopMainTitle = styled.h2`
  font-size: 8.75em;
  font-weight: 400;
  color: #dc6b94;
  margin-top: 1em;
  font-family: "LedkerliOne-Regular";
`;
export const StTopTitle = styled.h1`
  font-size: 3em;
  font-weight: 700;
  color: #fff;
  margin: 0.4em 0;
  color: #7c7c7c;
`;
export const StTopSubTilte = styled.h2`
  font-size: 1.8em;
  font-weight: 400;
  color: #7c7c7c;
  line-height: 1.5em;
  font-weight: 600;
`;
export const StMainImg = styled.img`
  width: 30em;
  height: 30.13em;
  margin-left: 10.19em;
  border-radius: 1em;
  border: 2px solid ${(props) => props.theme.colors.subPink};
`;
export const StMainImg2 = styled.img`
  width: 28.1em;
  height: 11.94em;
  border-radius: 1em;
  position: relative;
  transform: translateY(-5.3em);
`;
export const StWrBtnWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

export const StWriteButton = styled.button`
  width: 8.25em;
  height: 2.85em;
  border: 0.13em solid #ea9db4;
  border-radius: 62.44em;
  font-size: 1.3em;
  color: #ea9db4;
  background-color: #fff;
  margin-bottom: 2.19em;
  cursor: pointer;
  &:hover {
    background-color: #dc6b94;
    color: #fff;
  }
`;

export const StTest = styled.div`
  max-width: 92.5em;
  margin: 5.5em auto;
`;
export const StContentsContainer = styled.div`
  position: relative;
  height: 23.56em;
  display: flex;
  margin-bottom: 5em;
`;
export const StPostInfo = styled.div`
  position: relative;
  width: 34.5em;
  margin-right: 2em;
  padding: 1.5em 1.5em 1.5em 1.5em;
  background-color: #f8eded;
  border: 0.1em solid #ea9db4;
  border-radius: 1em;
`;
export const StPostInfoCenter = styled.div`
  position: relative;
  width: 34.5em;
  margin-left: 2em;
  padding: 1.5em 1.5em 1.5em 1.5em;
  background-color: #f8eded;
  border: 0.1em solid #ea9db4;
  border-radius: 1em;
`;
export const StPostTitle = styled.p`
  font-size: 5em;
  font-weight: 400;
  color: #dc6b94;
  font-family: "LedkerliOne-Regular";
`;
export const StPostSubTitle = styled.p`
  font-size: 1.5em;
  font-weight: 600;
  color: #7c7c7c;
  margin-top: 0.8em;
  line-height: 1.5em;
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
  position: absolute;
  bottom: 10%;
  right: 5%;
  width: 5.69em;
  height: 2.5em;
  color: #fff;
  font-size: 1em;
  font-weight: 400;
  background: #ea9db4;
  border-radius: 49.95em;
  border: none;
  &:hover {
    background-color: #dc6b94;
  }
`;
