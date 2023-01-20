import React, { useEffect } from "react";
import { StWrapper } from "../../components/UI/StIndex";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  __detailPost,
  __deletePost,
  __updatePost,
  __postZZim,
} from "../../redux/modules/postSlice";
import arrow_forward from "../../asset/arrow_forward.svg";
import { isCompositeComponent } from "react-dom/test-utils";
import emptyHeart from "../../asset/emptyHeart.svg";
import fullHeart from "../../asset/fullHeart.svg";
import { StFlex } from "../../components/UI/CardStyle.js/StCommon";
import { Avatar, StBackBtn, StBox, StBtnBox, StChatBtn, StContainer, StContent, StDate, StGroupImgs, StInnerColBox, StInnerRowBox, StProfile, StProfileBox, StTitle, StUpdateButton, StUserInfo, StWishBtn, StZZimImg } from "./StPostDetail";
const PostDetail = () => {
  const zMsg = useSelector((state) => state.postSlice.ZZimMsg.message);
  const userId = useSelector((state) => state.mypageSlice.profile.userId);
  const deadLine = useSelector((state) => state.postSlice.postInfo.isDeadLine); 
  const navigate = useNavigate();
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { postInfo } = useSelector((state) => state.postSlice);
  const { userInfo } = useSelector((state) => state.userSlice);

  const { state } = useLocation();
  console.log('info:',state)
  const deletePost = () => {
    if (userId != state.data.userId) {
      alert("게시물 생성자만 해당 게시글을 삭제할 수 있습니다");
    } else {
      dispatch(__deletePost(postId));
      alert("게시물이 삭제되었습니다.홈으로 돌아갑니다!");
      navigate("/");
    }
  };
  const updatePost = () => {
    if (userId != state.data.userId) {
      alert("게시물 생성자만 해당 게시글을 수정할 수 있습니다");
    } else {
      navigate(`/post/update/${postId}`);
    }
  };

  const changeDeadLine = () => {
    const formData = new FormData();
    if (deadLine === 1) {
      formData.append("isDeadLine", parseInt(2));
      dispatch(__updatePost({ formData, id: postId }));
    } else {
      formData.append("isDeadLine", 1);
      dispatch(__updatePost({ formData, id: postId }));
    }
  };
  const ZZim = (e) => {
    dispatch(__postZZim(postId));
    if (zMsg === "찜") {
      e.target.src = emptyHeart;
    } else {
      e.target.src = fullHeart;
    }
  };

  useEffect(() => {
    dispatch(__detailPost(postId));
  }, []);

  useEffect(() => {}, [deadLine]);
  console.log("userId:", userId);
  console.log("createId:", state.data.userId);
  return (
    <StWrapper>
      <StContainer>
        <StBackBtn onClick={() => navigate(-1)}>
          <img src={arrow_forward} alt="back_button" />
        </StBackBtn>

        <StUserInfo>
        <StFlex>
          <StProfile src={state.data.userImage}></StProfile>
          <div>
            <StFlex>
              <StTitle>{state.data.title}</StTitle>
              <p>마감</p>
              </StFlex>
          <div>{state.data?.userName}</div>
          <div>{state.data?.location1}</div>
          </div>
        </StFlex>
        <p>하트,2022.12.31</p>
        </StUserInfo>
        
        <StProfileBox>
          <StInnerRowBox>

        {userId !== state.data.userId || (
          <StUpdateButton onClick={updatePost}>수정</StUpdateButton>
        )}
        {userId !== state.data.userId || (
          <StUpdateButton onClick={deletePost}>삭제</StUpdateButton>
        )}
        {userId !== state.data.userId || (
          <>
            {deadLine === 2 ? (
              <>
                <StUpdateButton onClick={changeDeadLine}>
                  마감취소
                </StUpdateButton>
                <span>마감된 게시물</span>
              </>
            ) : (
              <StUpdateButton onClick={changeDeadLine}>마감</StUpdateButton>
            )}
          </>
        )}
            <span>조회수</span>
            <span>{state.data?.createdAt}</span>
          </StInnerRowBox>
        </StProfileBox>
        <StGroupImgs>
          <img src={state.data?.imageUrl1} />
          <img src={state.data?.imageUrl2} />
          <img src={state.data?.imageUrl3} />
        </StGroupImgs>
        <StDate>재능기부 희망일: {state.data?.appointed}</StDate>
        <StContent>{state.data?.content}</StContent>
        {postInfo.userId !== userInfo.userId && (
          <StBtnBox>
            <StChatBtn
              onClick={() => {
                navigate(`/chat/${postId}/${state.data?.userId}`);
              }}
            >
              문의하기
            </StChatBtn>
            <StWishBtn>
              <StZZimImg onClick={ZZim} src={emptyHeart} alt="wish" />
              찜하기
            </StWishBtn>
          </StBtnBox>
        )}
      </StContainer>
    </StWrapper>
  );
};

export default PostDetail;

