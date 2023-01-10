import React from "react";
import styled from "styled-components";

const Card = ({ type, data, onClick }) => {
  const Model = () => {
    const curr = new Date(data.createdAt);
    const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;
    const kRTimeDiff = 9 * 60 * 60 * 1000;
    const KrCurr = new Date(utc + kRTimeDiff);
    const KoreaDate = KrCurr.toLocaleDateString();
    // toLocaleDateString = 브라우저에서 설정된 국가에서 사용되는 날짜를 뽑아줌

    switch (type) {
      case "가로":
        return (
          <StRowCard onClick={onClick}>
            <StRowImgWrapper>
              <StImg src={data.imageUrl}></StImg>
            </StRowImgWrapper>
            <div>
              <StRowTitle>{data.title}</StRowTitle>
              <StRowContent>{data.content}</StRowContent>
            </div>
          </StRowCard>
        );
      case "세로":
        return (
          <StColumnCard onClick={onClick}>
            <StColumnImgWrapper>
              <StImg alt="thumbnail" src={data.imageUrl1} />
            </StColumnImgWrapper>
            <StFlex>
              <StColumnNickName>{data.userName}</StColumnNickName>
              <StColumnCity>
                {data.location1} {data.location2}
              </StColumnCity>
            </StFlex>
            <StColumnTitle>{data.title}</StColumnTitle>
            <StColumnDate>{data.createdAt}</StColumnDate>
          </StColumnCard>
        );
      default:
        return;
    }
  };

  return <Model />;
};

export default Card;

// < 가로 >
const StRowCard = styled.div`
  width: inherit;
  height: inherit;
  display: flex;
`;

const StRowImgWrapper = styled.div`
  width: 40%;
  height: 100%;
`;

const StImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  border: 1px solid gray;
`;

const StRowTitle = styled.p`
  font-size: 30px;
  font-weight: 700;
`;

const StRowContent = styled.p`
  font-size: 10px;
  font-weight: 500;
`;

// < 세로 >
const StColumnCard = styled.div`
  width: 31.25%;
  height: 342px;
`;

const StColumnImgWrapper = styled.div`
  width: 100%;
  height: 65.7%;
`;

const StFlex = styled.div`
  display: flex;
`;

const StColumnNickName = styled.p`
  margin-right: 10px;
  font-size: "";
  font-weight: "";
`;
const StColumnCity = styled.p`
  font-size: "";
  font-weight: "";
`;
const StColumnTitle = styled.p`
  margin: 10px 0 0 0;
  font-size: "";
  font-weight: "";
`;
const StColumnContent = styled.p`
  margin: 10px 0 0 0;
  font-size: "";
  font-weight: "";
`;
const StColumnDate = styled.p`
  margin: 10px 0 0 0;
  font-size: "";
  font-weight: "";
`;
