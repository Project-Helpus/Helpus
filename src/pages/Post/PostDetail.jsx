import React, { useEffect } from "react";
import { StWrapper } from "../../components/UI/StIndex";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { __detailPost,__deletePost,__updatePost,__postZZim} from "../../redux/modules/postSlice";
import arrow_forward from "../../asset/arrow_forward.svg";
// import heart from "../../asset/heart.svg";
import { isCompositeComponent } from "react-dom/test-utils";
import emptyHeart from '../../asset/emptyHeart.svg'
import fullHeart from '../../asset/fullHeart.svg'
const PostDetail = () => {
  const zMsg = useSelector((state) => state.postSlice.ZZimMsg.message)
  const userId = useSelector((state) => state.mypageSlice.data?.userId)
  const deadLine = useSelector((state)=>state.postSlice.postInfo.isDeadLine)
  const navigate = useNavigate();
  const { postId } = useParams();
  const dispatch = useDispatch();
  
  const  {state} = useLocation();
  const deletePost = () => {
    if (userId != state.data.userId) { alert('게시물 생성자만 해당 게시글을 삭제할 수 있습니다') }
    else {
      dispatch(__deletePost(postId))
      alert('게시물이 삭제되었습니다.홈으로 돌아갑니다!')
      navigate('/')
    }
  }
  const updatePost = () => {
    if (userId != state.data.userId) { alert('게시물 생성자만 해당 게시글을 수정할 수 있습니다') }
    else{navigate(`/post/update/${postId}`)}
  }

  const changeDeadLine = () => {
    const formData = new FormData();
    if (deadLine === 1) {
      formData.append("isDeadLine", parseInt(2))
      dispatch(__updatePost({ formData, id: postId }))
    }
    else {
      formData.append("isDeadLine",1)
      dispatch(__updatePost({ formData, id: postId }))
    }
  }
const ZZim =e => {
      dispatch(__postZZim(postId))
      if (zMsg === "찜") {e.target.src = emptyHeart }
      else{e.target.src = fullHeart}
    }
  useEffect(() => {
    dispatch(__detailPost(postId));
  }, []);

  useEffect(() => { }, [deadLine])

  return (
    <StWrapper>
      <StContainer>
        <StBackBtn onClick={() => navigate(-1)}>
          <img src={arrow_forward} alt="back_button" />
        </StBackBtn>
        <StTitle>{state.data.title}</StTitle>
        {(userId !== state.data.userId) ||<StUpdateButton onClick={updatePost}>수정</StUpdateButton>}
        {(userId !== state.data.userId) ||<StUpdateButton onClick={deletePost}>삭제</StUpdateButton>}
          {(userId !== state.data.userId) || <>{deadLine === 2 ?(
            <><StUpdateButton onClick={changeDeadLine}>마감취소</StUpdateButton><span>마감된 게시물</span></>)
          :<StUpdateButton onClick={changeDeadLine}>마감</StUpdateButton>}</>}
        <StProfileBox>
          <StBox>
            <Avatar>
              <img src={state.data?.userImage} alt="profile" />
            </Avatar>
            <StInnerColBox>
              <div>{state.data?.userName}</div>
              <div>{state.data?.location1}</div>
            </StInnerColBox>
          </StBox>
          <StInnerRowBox>
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
        <StBtnBox>
          <StChatBtn
            onClick={() => {
              navigate(`/chat/${postId}/${state.data?.userId}`);
            }}
          >
            문의하기
          </StChatBtn>
          <StWishBtn>
            <StZZimImg onClick={ZZim}src={emptyHeart} alt="wish" />
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
  width:300px;
  height:100px;
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

const StUpdateButton =styled.button`
  width:100px;
  height:50px;
  cursor: pointer;
`
const StZZimImg = styled.img`
  
`