import styled from "styled-components";
import theme from "../../../styles/theme";

export const StColumnCard = styled.div`
  width: 31.25%;
  height: 342px;
`;

export const StColumnImgWrapper = styled.div`
  width: 100%;
  height: 65.7%;
`;

export const StColumnNickName = styled.p`
  margin-right: 10px;
  font-size: "";
  font-weight: "";
`;
export const StColumnCity = styled.p`
  font-size: "";
  font-weight: "";
`;
export const StColumnTitle = styled.p`
  margin: 10px 0 0 0;
  font-size: "";
  font-weight: "";
`;
export const StColumnDate = styled.p`
  margin: 10px 0 0 0;
  font-size: "";
  font-weight: "";
`;

export const StDeadLine = styled.div`
  color: #fff;
  width: 50px;
  height: 20px;
  position: relative;
  right: 242px;
  bottom: 105px;
  background-color: green;
`;

export const StAllPostDeadLine = styled.div`
  color: #fff;
  width: 50px;
  bottom: 300px;
  left: 10px;
  z-index: 1;
  position: relative;
  background-color: green;
`;

export const StHeart = styled.img`
  width: 20px;
  height: 20px;
  z-index: 1;
  position: relative;
  right: 53px;
  top: 16px;
  cursor: pointer;
`;

export const StSubmitButton = styled.button`
  width: 25px;
  height: 25px;
  z-index: 1;
  position: relative;
  left: 143px;
  top: -149px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export const StMainSquarePhoto = styled.img`
  width: 240px;
  height: 135px;
  border-radius: 20px;
  cursor: pointer;
`;
export const StMargin60 = styled.div`
  margin-left: 60px;
`;

export const StEmptyDiv = styled.div`
  width: 50px;
  top: -149px;
  z-index: 1;
  position: relative;
`;

//마이페이지 찜하기 card_Style

export const StZZimWrap = styled.div`
  width: 320px;
  position: relative;
`;

export const StZZimImg = styled.img`
  width: 320px;
  height: 180px;
  border-radius: 20px;
`;

export const StZZimHeart = styled.img`
  width: 25px;
  height: 25px;
  z-index: 1;
  position: absolute;
  right: 12px;
  top: 12px;
  cursor: pointer;
`;

export const StZZimDeadLine = styled.div`
  position: absolute;
  z-index: 1;
  width: 50px;
  top: 12px;
  left: 12px;
  border-radius: 8px;
  text-align: center;
  padding: 2px 6px;
  font-size: 12px;
  line-height: 22px;
  font-weight: 600;
  background-color: ${(props) => props.theme.colors.yellow};
`;

export const StZZimTitle = styled.p`
  font-size: 18px;
  font-weight: 600;
  padding: 10px 0;
`;

// export const St
//   width:50px;
//   top: -149px;
//   z-index: 1;
//   position: relative;
// `;

export const StMarginTop10 = styled.div`
  margin-top: 10px;
`;

export const StZZimWrapContents = styled.div`
  width: 320px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;
export const StZZimWrapTag = styled.div`
  align-items: flex-end;
`;
export const StZZimWrapPhoto = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 8px;
  box-shadow: 0 0 0 2px #efefef inset;
  padding: 4px;
  cursor: pointer;
`;

export const StZZimTag = styled.span`
  padding: 4px;
  line-height: 20px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 3px;
  background-color: ${(props) => props.theme.colors.subPink};
  margin-right: 10px;
  color: white;
`;
