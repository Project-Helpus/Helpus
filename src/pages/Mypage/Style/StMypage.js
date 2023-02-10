import styled from "styled-components";

export const StMyContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 16px;
  position: relative;
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
  border: 1px solid ${(props) => props.theme.colors.gray};
  background-color: rgb(245, 245, 245);
  object-fit: contain;
  box-sizing: content-box;
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
