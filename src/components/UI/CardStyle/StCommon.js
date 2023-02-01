import styled from "styled-components";
import theme from "../../../styles/theme";

export const StFlex = styled.div`
  display: flex;
`;

export const StCirclePhoto = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 0 7px 16px 0;
  cursor: pointer;
`;
export const StMySquarePhoto = styled.img`
  width: 240px;
  height: 135px;
  border-radius: 20px;
  cursor: pointer;
`;

export const StAllPostSquarePhoto = styled.img`
  width: 400px;
  height: 225px;
  border-radius: 20px;
  cursor: pointer;
  margin-bottom: 12px;
`;

export const StZZimSquarePhote = styled.img`
  position: relative;
  width: 272px;
  height: 153px;
  cursor: pointer;
`;

export const StCategoryName = styled.p`
  font-size: "";
  font-weight: "";
`;

export const StDate = styled.p`
  font-size: 12px;
  color: #7c7c7c;
  line-height: 50px;
  font-weight: "";
`;

export const StContentsTitle = styled.p`
  font-size: 18px;
  font-weight: 700;
  width: 327px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const StMainContentsTitle = styled.p`
  font-size: 18px;
  font-weight: 400;
`;

export const StNickname = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 50px;
  color: ${(props) => props.theme.colors.middleGray};
`;

export const StAllPostNickName = styled.p`
  font-size: 14px;
  font-weight: 400;
`;

export const StAddress = styled.p`
  font-size: 12px;
  font-weight: "";
  line-height: 50px;
  color: ${(props) => props.theme.colors.middleGray};
`;

export const StContentsInfo = styled.p`
  font-size: 14px;
  font-weight: "";
  color: ${(props) => props.theme.colors.middleGray};
`;

export const StMainContentsWrapper = styled.div`
  width: 366px;
  height: 125px;
  padding: 24px 0 25px 10px;
`;

export const StMarginRight = styled.div`
  margin-right: 20px;
`;

export const StMainWrapper = styled.div`
  width: 605px;
  height: 135px;
  margin-bottom: 20px;
`;

export const StAllPostWrapper = styled.div`
  width: 400px;
  height: 324px;
  margin: 0 40px 50px 0;
  position: relative;
`;

export const StSpaceBetween = styled.div`
  justify-content: space-between;
  display: flex;
  width: 50em;
`;

export const StEmpty = styled.div`
  width: 20px;
  height: 20px;
`;

export const StTag = styled.span`
  padding: 4px;
  font-size: 12px;
  font-weight: 400;
  border-radius: 3px;
  background-color: rgb(0, 0, 0, 0.1);
  margin-right: 10px;
`;
