import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const ColCard = ({ data }) => {
  return (
    <StColCard>
      <NavLink
        to={`/post/${data.postId}`}
        style={{ textDecoration: "none", color: "black", cursor: "ponter" }}
      >
        <StColImgWrapper>
          <StImg alt="thumbnail" src={data.imageUrl1} />
        </StColImgWrapper>
        <StFlex>
          <StColNickName>{data.userName}</StColNickName>
          <StColCity>
            {data.location1} {data.location2}
          </StColCity>
        </StFlex>
        <StColTitle>{data.title}</StColTitle>
        <StColDate>{data.createdAt}</StColDate>
      </NavLink>
    </StColCard>
  );
};

export default ColCard;

const StColCard = styled.div`
  width: 31.25%;
  height: 342px;
`;

const StColImgWrapper = styled.div`
  width: 100%;
  height: 65.7%;
`;

const StImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 20px;
`;

const StFlex = styled.div`
  display: flex;
`;

const StColNickName = styled.p`
  margin-right: 10px;
  font-size: "";
  font-weight: "";
`;
const StColCity = styled.p`
  font-size: "";
  font-weight: "";
`;
const StColTitle = styled.p`
  margin: 10px 0 0 0;
  font-size: "";
  font-weight: "";
`;

const StColDate = styled.p`
  margin: 10px 0 0 0;
  font-size: "";
  font-weight: "";
`;
