import React, { useEffect } from "react";
import { StWrapper } from "../../components/UI/StIndex";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  __detailPost,
  __deletePost,
  __updatePost,
  __postZZim,
} from "../../redux/modules/postSlice";
import arrow_forward from "../../asset/arrow_forward.svg";
import emptyHeart from "../../asset/emptyHeart.svg";
import fullHeart from "../../asset/fullHeart.svg";
import {
  StFlex,
  StSpaceBetween,
} from "../../components/UI/CardStyle.js/StCommon";
import {
  Avatar,
  StBackBtn,
  StBox,
  StBtnBox,
  StChatBtn,
  StContainer,
  StContent,
  StDate,
  StDeadLineButton,
  StDeleteButton,
  StGroupImgs,
  StHopeDay,
  StImage,
  StInnerColBox,
  StInnerRowBox,
  StLocation,
  StMagam,
  StProfile,
  StProfileBox,
  StTags,
  StTitle,
  StUpdateButton,
  StUserInfo,
  StWishBtn,
  StZZimImg,
} from "./StPostDetail";

const PostDetail = () => {
  const zMsg = useSelector((state) => state.postSlice.ZZimMsg.message);
  const userId = useSelector((state) => state.mypageSlice.profile.userId);
  const deadLine = useSelector((state) => state.postSlice.postInfo.isDeadLine);
  const logedIn = useSelector((state) => state.userSlice.isLogin);
  const detail = useSelector((state) => state.postSlice.postInfo);
  const navigate = useNavigate();
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const curr = new Date(state.data?.createdAt);
  const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;
  const kRTimeDiff = 9 * 60 * 60 * 1000;
  const KrCurr = new Date(utc + kRTimeDiff);
  const KoreaDate = KrCurr.toLocaleDateString();
  const tag = detail.tag?.split(",");

  const deletePost = () => {
    dispatch(__deletePost(postId));
    alert("게시물이 삭제되었습니다.홈으로 돌아갑니다!");
    navigate("/");
  };
  const updatePost = () => {
    navigate(`/post/update/${postId}`);
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

  return (
    <StWrapper>
      <StContainer>
        <StSpaceBetween>
          <StBackBtn onClick={() => navigate(-1)}>
            <img src={arrow_forward} alt="back_button" />
          </StBackBtn>
          <StFlex>
            {logedIn === false || (
              <>
                {userId !== state.data.userId || (
                  <>
                    {" "}
                    {deadLine === 2 ? (
                      <>
                        <StDeadLineButton onClick={changeDeadLine}>
                          마감취소
                        </StDeadLineButton>
                      </>
                    ) : (
                      <StDeadLineButton onClick={changeDeadLine}>
                        마감
                      </StDeadLineButton>
                    )}
                  </>
                )}
              </>
            )}
            {logedIn === false || (
              <>
                {userId !== state.data.userId || (
                  <StUpdateButton onClick={updatePost}>수정</StUpdateButton>
                )}
              </>
            )}
            {logedIn === false || (
              <>
                {userId !== state.data.userId || (
                  <StDeleteButton onClick={deletePost}>삭제</StDeleteButton>
                )}
              </>
            )}
          </StFlex>
        </StSpaceBetween>
        <StUserInfo>
          <StFlex>
            <StProfile src={state.data.userImage}></StProfile>
            <div>
              <StFlex>
                <StTitle>{state.data.title}</StTitle>
              </StFlex>
              <div>{state.data?.userName}</div>
              <StLocation>
                {state.data?.location1}&gt;{state.data?.location2}
              </StLocation>
            </div>
          </StFlex>
        </StUserInfo>
        <StProfileBox>
          <StInnerRowBox>
            <StHopeDay>희망일:{KoreaDate}</StHopeDay>
          </StInnerRowBox>
        </StProfileBox>
        <StGroupImgs>
          <StImage src={detail.imageUrl1} />
          <StImage src={detail.imageUrl2} />
          <StImage src={detail.imageUrl3} />
        </StGroupImgs>
        <StFlex>
          {tag?.map((item, idx) => {
            return <StTags key={idx}>{item}</StTags>;
          })}
        </StFlex>
        <p>{detail.content}</p>
        <StFlex></StFlex>
        {logedIn === false || (
          <>
            {state.data.userId !== userId && (
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
          </>
        )}
      </StContainer>
    </StWrapper>
  );
};

export default PostDetail;
