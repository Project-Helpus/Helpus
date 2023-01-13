import React, { useEffect } from "react";
import { StWrapper } from "../../components/UI/StIndex";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { __detailPost } from "../../redux/modules/postSlice";

const PostDetail = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userSlice);
  const { postInfo } = useSelector((state) => state.postSlice);
  const { userId } = postInfo;

  useEffect(() => {
    dispatch(__detailPost(postId));
  }, []);

  return (
    <StWrapper>
      <StFirstBox>
        <button onClick={() => navigate(-1)}>뒤로가기</button>
        <h2>{postInfo?.title}</h2>
      </StFirstBox>
      <StSecondBox>
        <img src={postInfo?.userImage} alt="profile" />
        <StInnerBox>
          <div>{postInfo?.Name}</div>
          <div>{postInfo?.location1}</div>
        </StInnerBox>
      </StSecondBox>
      <div>조회수</div>
      <div>{postInfo?.createdAt}</div>
      <StThirdBox>
        <img src={postInfo?.imageUrl1} />
        <img src={postInfo?.imageUrl2} />
        <img src={postInfo?.imageUrl3} />
      </StThirdBox>
      <div>{postInfo?.appointed}</div>
      <div>{postInfo?.content}</div>
      {/* {userInfo?.userId !== postInfo?.userId && ( */}
      <StFourthBox>
        <button
          onClick={() => {
            navigate(`/chat/${postId}/${postInfo?.userId}`);
          }}
        >
          문의하기
        </button>
        <button>찜하기</button>
      </StFourthBox>
      {/* )} */}
    </StWrapper>
  );
};
const StFirstBox = styled.div`
  display: flex;
`;
const StSecondBox = styled.div`
  display: flex;
  width: 300px;
  height: 200px;
`;
const StThirdBox = styled.div`
  display: flex;
  width: 300px;
  height: 300px;
`;
const StFourthBox = styled.div`
  display: flex;
`;
const StInnerBox = styled.div`
  display: flex;
  flex-direction: column;
`;
export default PostDetail;
