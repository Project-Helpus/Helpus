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
  /* text-align: center; */
  font-size: 2.25em;
  font-weight: 600;
  margin: 1.13em 0 1.25em 0;
`;
export const StProfileBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
export const StBox = styled.div`
  display: flex;
`;
export const StGroupImgs = styled.div`
  width: 50em;
  position: relative;
  margin: 1.25em 0 2.5em 0;
`;
export const StImage = styled.img`
  width: 400px;
  height: 225px;
  object-fit: cover;
  border-radius: 10px;
`;
export const StBtnBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
`;
export const StInnerColBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
export const StInnerRowBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;
export const Avatar = styled.div`
  width: 98px;
  height: 98px;
  object-fit: cover;
  border-radius: 100%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
export const StDate = styled.span`
  padding-top: 27px;
  font-weight: 700;
`;
export const StContent = styled.div``;
export const StChatBtn = styled.button`
  width: 200px;
  height: 44px;
  background: #ffc4d5;
  border-radius: 10px;
  color: white;
  font-weight: 700;
  font-size: 18px;
  border: none;
`;
export const StWishBtn = styled.button`
  width: 112px;
  vertical-align: middle;
  border: none;
  background: white;
  font-weight: 700;
  font-size: 24px;
`;
export const StDeadLineButton = styled.button`
  width: 8.25em;
  height: 2.75em;
  background-color: #ffcd4d;
  border: none;
  border-radius: 20px;
  color: #fff;
  cursor: pointer;
`;
export const StUpdateButton = styled.button`
  width: 8.25em;
  height: 2.75em;
  background-color: ${(props) => props.theme.colors.subPink};
  border: none;
  border-radius: 20px;
  cursor: pointer;
  color: #fff;
  margin: 0 1.25em 0 1.25em;
`;
export const StDeleteButton = styled.button`
  width: 5.5em;
  height: 2.75em;
  background-color: #ff5c00;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  color: #fff;
`;
export const StZZimImg = styled.img``;
export const StProfile = styled.img`
  width: 5em;
  height: 5em;
  border-radius: 50%;
  margin-right: 0.63em;
`;
export const StUserInfo = styled.div`
  /* width: 932px; */
  height: 6.19em;
  border-bottom: 1px solid gray;
`;
export const StMagam = styled.span`
  width: 80px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border: 1px solid #ffcd4d;
  border-radius: 20px;
  color: #ea9db4;
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
  border: 1px solid #000;
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
  min-width: 11.38em;
  border: 1px solid #000;
  height: 6.48em;
  margin-right: 1.5em;
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
  background-color: ${(props) => props.theme.colors.subPink};
  color: #000;
  margin: 40px 20px 40px 0;
`;
