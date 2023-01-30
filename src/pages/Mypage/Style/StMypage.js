import styled from "styled-components";

export const StMyContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 16px;
`;
export const StMyImgWrap = styled.div`
  width: 20em;
  height: 11.25em;
  position: relative;
`;

export const StMyImg = styled.img`
  width: 20em;
  height: 11.25em;
  border-radius: 10px;
  cursor: pointer;
`;

export const StMyContents = styled.div`
  display: flex;
  flex-direction: column;
  width: 19.25em;
`;

export const StMyCirclePhoto = styled.img`
  width: 3.13em;
  height: 3.13em;
  box-shadow: 0 0 0 2px #efefef inset;
  padding: 4px;
  border-radius: 100%;
`;

export const StMyNickName = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 8px;
  span {
    font-size: 1.13em;
  }
`;
export const StMyTitle = styled.div`
  font-size: 1.25em;
  font-weight: 600;
  padding-bottom: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
export const StMySubTitle = styled.div`
  font-size: 0.88em;
  color: ${(props) => props.theme.colors.middleGray};
  padding-bottom: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
export const StMyCaption = styled.div`
  display: flex;
  justify-content: space-between;
  span {
    color: ${(props) => props.theme.colors.middleGray};
    font-size: 0.75em;
    padding-bottom: 14px;
  }
`;
