import styled from "styled-components";

export const StContainer = styled.div`
  width: 52.6em;
`;
export const StBackBtn = styled.button`
  width: 36px;
  height: 36px;
  border: none;
  background-color: transparent;
`;
export const StTitle = styled.h2`
  font-size: 2.25em;
  font-weight: 600;
  margin: 1.13em 0 1.25em 0;
`;
export const StGroupImgs = styled.div`
  width: 50em;
  position: relative;
  margin: 1.25em 0 2.5em 0;
`;
export const StBtnBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;
export const StChatBtn = styled.button`
  width: 200px;
  height: 44px;
  background: #ffc4d5;
  border-radius: 10px;
  color: white;
  font-weight: 700;
  font-size: 20px;
  border: none;
  &:hover {
    background-color: #ea9db4;
  }
`;
export const StWishBtn = styled.button`
  display: flex;
  border: none;
  background-color: white;
  border-radius: 10px;
  font-weight: 700;
  font-size: 20px;
`;
export const StDeadLineButton = styled.button`
  width: 5.25em;
  height: 2.75em;
  background-color: #ffcd4d;
  border: none;
  border-radius: 20px;
  color: #fff;
  cursor: pointer;
`;
export const StUpdateButton = styled.button`
  width: 5.25em;
  height: 2.75em;
  background-color: ${(props) => props.theme.colors.subPink};
  border: none;
  border-radius: 20px;
  cursor: pointer;
  color: #fff;
  margin: 0 1.25em 0 1.25em;
`;
export const StDeleteButton = styled.button`
  width: 5.25em;
  height: 2.75em;
  background-color: #ff5c00;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  color: #fff;
`;
export const StZZimImg = styled.img``;
export const StMagam = styled.span`
  width: 5em;
  height: 1.88em;
  line-height: 1.88em;
  text-align: center;
  font-size: 1.13em;
  color: #ea9db4;
  border: 1px solid #ffcd4d;
  border-radius: 1.25em;
  margin: 2.26em 0;
`;
export const StProfile = styled.img`
  width: 5em;
  height: 5em;
  border-radius: 50%;
  margin-right: 0.63em;
`;
export const StUserInfo = styled.div`
  width: 50em;
  height: 6.19em;
  border-bottom: 1px solid #d9d9d9;
`;
export const StNickname = styled.p`
  font-size: 1.13em;
  margin-top: 0.94em;
`;
export const StLocation = styled.p`
  font-size: 14px;
  margin-top: 10px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.53);
`;
export const StMainImg = styled.img`
  width: 50em;
  height: 28.13em;
  border: 1px solid rgb(240, 240, 240);
  border-radius: 10px;
  object-fit: contain;
  background-color: rgb(240, 240, 240);
  box-sizing: content-box;
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
export const StHidden = styled.div`
  overflow: hidden;
  display: flex;
`;
export const StCrsImg = styled.img`
  min-width: 11.26em;
  /* min-width: 11.38em; */
  border: 0.06em solid rgb(240, 240, 240);
  border-radius: 0.63em;
  height: 6.48em;
  margin-right: 1.5em;
  object-fit: contain;
  background-color: rgb(240, 240, 240);
  box-sizing: content-box;
`;
export const StHopeDay = styled.p`
  font-size: 1em;
  font-weight: 700;
  margin: 1.25em 0 2.5em 0;
`;
export const StTags = styled.p`
  padding: 0.5em;
  height: 1.88em;
  font-size: 1em;
  font-weight: 600;
  border-radius: 3px;
  background-color: rgb(0, 0, 0, 0.1);
  color: rgb(0, 0, 0, 0.7);
  margin: 0 20px 40px 0;
`;
export const StRedFont = styled.h2`
  color: red;
`;
export const StCrsContainer = styled.div`
  display: flex;
  width: 50.02em;
`;
export const StContents = styled.p`
  font-size: 26px;
`;
export const StContentsWrapper = styled.div`
  margin: 52px 0;
  font: caption;
`;
export const StZZimCount = styled.p`
  margin: 0 10px 0 5px;
`;
