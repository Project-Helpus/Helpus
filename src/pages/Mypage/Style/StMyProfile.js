import styled from "styled-components";

export const StWarp = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  gap: 5%;
  padding-bottom: 100px;
  hr {
    overflow: hidden;
    border: 100%;
    border: thin solid ${(props) => props.theme.colors.subPink};
    margin-bottom: 20px;
  }
`;

export const Starrow = styled.div`
  margin: 48px;
  cursor: pointer;
`;
export const StMypage = styled.div`
  width: 55%;
`;

export const StProfile = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  text-align: center;
  margin-top: 100px;
  span {
    margin-top: 17px;
  }
  button {
    margin: 10px auto;
    width: 120px;
    height: 40px;
    background-color: ${(props) => props.theme.colors.subPink};
    border: none;
    border-radius: 7px;
    color: white;
  }
`;

export const StProfileImg = styled.img`
  margin: 0 auto;
  width: 120px;
  height: 120px;
  border-radius: 100px;
  border: 2px solid #f5f5f5;
`;

export const StZZimWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 36px;
`;

export const StMypageTitle = styled.div`
  display: flex;
  align-items: flex-end;
  margin-top: 100px;
  margin-bottom: 20px;
  h2 {
    color: ${(props) => props.theme.colors.subPink};
    padding-right: 10px;
    letter-spacing: -0.03em;
    font-weight: 600;
  }
  span {
    color: ${(props) => props.theme.colors.middleGray};
    font-size: 14px;
  }
`;

export const StName = styled.div`
  font-size: 1.5em;
  font-weight: 500;
  margin-top: 18px;
`;

export const StEmail = styled.div`
  font-size: 1em;
  margin: 12px;
  color: ${(props) => props.theme.colors.middleGray};
`;

export const StState = styled.div`
  color: ${(props) => props.theme.colors.subPink};
  margin-top: 12px;
`;
