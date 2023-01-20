import styled from "styled-components";
export const StContainer = styled.div`
  width: 1220px;
  height: 724px;
`;
export const StBackBtn = styled.button`
  width: 36px;
  height: 36px;
  border: none;
  background-color: transparent;
`;
export const StTitle = styled.h2`
  text-align: center;
  margin-bottom: 10px;
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
  display: flex;
  gap: 10px;
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
  width: 132px;
  height: 44px;
  background-color: #ffcd4d;
  border: none;
  border-radius: 20px;
  color: #fff;
  cursor: pointer;
`;
export const StUpdateButton = styled.button`
  width: 132px;
  height: 44px;
  background-color: ${(props) => props.theme.colors.subPink};
  border: none;
  border-radius: 20px;
  cursor: pointer;
`;
export const StDeleteButton = styled.button`
  width: 132px;
  height: 44px;
  background-color: #ff5c00;
  border: none;
  border-radius: 20px;
  cursor: pointer;
`;
export const StZZimImg = styled.img``;
export const StProfile = styled.img`
  width: 100px;
  height: 100px;
`;
export const StUserInfo = styled.div`
  width: 932px;
  height: 100px;
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
export const StLocation = styled.p`
  font-size: 14px;
  margin-top: 10px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.53);
`;
export const StHopeDay = styled.p`
  font-size: 16px;
  font-weight: 700;
  margin: 30px 0 30px 0;
`;
export const StTags = styled.p`
  padding: 8px;
  line-height: 20px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 3px;
  background-color: ${(props) => props.theme.colors.subPink};
  margin-right: 10px;
  color: #000;
  margin: 40px 20px 40px 0;
`;
