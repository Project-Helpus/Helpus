import React, { useEffect } from "react";
import { StWrapper } from "../../components/UI/StIndex";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { __detailPost } from "../../redux/modules/postSlice";
import arrow_forward from "../../asset/arrow_forward.svg";
import heart from "../../asset/heart.svg";

const PostDetail = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { postInfo } = useSelector((state) => state.postSlice);

  useEffect(() => {
    dispatch(__detailPost(postId));
  }, []);

  return (
    <StWrapper>
      <StContainer>
        <StBackBtn onClick={() => navigate(-1)}>
          <img src={arrow_forward} alt="back_button" />
        </StBackBtn>
        <StTitle>{postInfo?.title}</StTitle>

        <StProfileBox>
          <StBox>
            <Avatar>
              <img src={postInfo?.userImage} alt="profile" />
            </Avatar>
            <StInnerColBox>
              <div>{postInfo?.userName}</div>
              <div>{postInfo?.location1}</div>
            </StInnerColBox>
          </StBox>
          <StInnerRowBox>
            <span>조회수</span>
            <span>{postInfo?.createdAt}</span>
          </StInnerRowBox>
        </StProfileBox>
        <StGroupImgs>
          <img src={postInfo?.imageUrl1} />
          <img src={postInfo?.imageUrl2} />
          <img src={postInfo?.imageUrl3} />
        </StGroupImgs>
        <StDate>재능기부 희망일: {postInfo?.appointed}</StDate>
        <StContent>{postInfo?.content}</StContent>
        {/* {userInfo?.userId !== postInfo?.userId && ( */}
        <StBtnBox>
          <StChatBtn
            onClick={() => {
              navigate(`/chat/${postId}/${postInfo?.userId}`);
            }}
          >
            문의하기
          </StChatBtn>
          <StWishBtn>
            <img src={heart} alt="wish" />
            찜하기
          </StWishBtn>
        </StBtnBox>
      </StContainer>
    </StWrapper>
  );
};

export default PostDetail;

const StContainer = styled.div`
  width: 86.1%;
`;

const StBackBtn = styled.button`
  width: 36px;
  height: 36px;
  border: none;
  background-color: transparent;
`;

const StTitle = styled.h2`
  text-align: center;
`;

const StProfileBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StBox = styled.div`
  display: flex;
`;

const StGroupImgs = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;
const StBtnBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
`;
const StInnerColBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StInnerRowBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const Avatar = styled.div`
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

const StDate = styled.span`
  padding-top: 27px;
  font-weight: 700;
`;

const StContent = styled.div``;
const StChatBtn = styled.button`
  width: 200px;
  height: 44px;
  background: #ffc4d5;
  border-radius: 10px;
  color: white;
  font-weight: 700;
  font-size: 18px;
  border: none;
`;

const StWishBtn = styled.button`
  width: 112px;
  vertical-align: middle;
  border: none;
  background: white;
  font-weight: 700;
  font-size: 24px;
`;
