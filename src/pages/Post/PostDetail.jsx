import React from "react";
import { StWrapper } from "../../components/UI/StIndex";
import styled from "styled-components";

const PostDetail = ({}) => {
  return (
    <StWrapper>
      <StFirstBox>
        <button>뒤로가기</button>
        <h2>제목</h2>
      </StFirstBox>
      <StSecondBox>
        <div>프로필 사진</div>
        <StInnerBox>
          <div>열정적인 쌤</div>
          <div>경상북도</div>
          <div>온도</div>
        </StInnerBox>
      </StSecondBox>
      <div>조회수</div>
      <div>작성일</div>
      <StThirdBox>
        <div>이미지1</div>
        <div>이미지2</div>
        <div>이미지3</div>
      </StThirdBox>
      <div>희망 날짜</div>
      <div>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </div>
      <StFourthBox>
        <button>문의하기</button>
        <button>찜하기</button>
      </StFourthBox>
    </StWrapper>
  );
};
const StFirstBox = styled.div`
  display: flex;
`;
const StSecondBox = styled.div`
  display: flex;
`;
const StThirdBox = styled.div`
  display: flex;
`;
const StFourthBox = styled.div`
  display: flex;
`;
const StInnerBox = styled.div`
  display: flex;
  flex-direction: column;
`;
export default PostDetail;
