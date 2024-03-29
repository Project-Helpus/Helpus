import { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  __detailPost,
  __deletePost,
  __postZZim,
  __deadLinePost,
} from "../../redux/modules/postSlice";
import arrow_forward_ios from "../../asset/arrow_forward_ios.svg";
import emptyHeart from "../../asset/emptyHeart.svg";
import fullHeart from "../../asset/fullHeart.svg";
import CrsLeft from "../../asset/CrsLeft.svg";
import CrsRight from "../../asset/CrsRight.svg";
import { StWrapper } from "../../components/UI/StIndex";
import { StFlex, StSpaceBetween } from "../../components/UI/CardStyle/StCommon";
import {
  StBackBtn,
  StBtnBox,
  StChatBtn,
  StContainer,
  StContents,
  StContentsWrapper,
  StCrsContainer,
  StCrsImg,
  StCrsLeftButton,
  StCrsRightButton,
  StDeadLineButton,
  StDeleteButton,
  StGroupImgs,
  StHidden,
  StHopeDay,
  StLocation,
  StMagam,
  StMainImg,
  StNickname,
  StProfile,
  StTags,
  StTitle,
  StUpdateButton,
  StUserInfo,
  StWishBtn,
  StZZimCount,
  StZZimImg,
} from "./element/styles/StPostDetail";

const PostDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId } = useParams();

  const { userId, logedIn, kakaoLogedIn, zMsg, detail, dead } = useSelector(
    (state) => ({
      userId: state.userSlice.userInfo.userId,
      logedIn: state.userSlice.isLogin,
      kakaoLogedIn: state.userSlice.isLoginKakao,
      zMsg: state.postSlice.ZZimMsg?.message,
      detail: state.postSlice?.postInfo,
      dead: state.postSlice.deadLineMsg,
    })
  );

  const zzimRef = useRef(null);
  const preRef = useRef(null);
  const crsRef = useRef(null);

  const deadLine = detail.isDeadLine;
  const tag = detail.tag?.split(",");
  const curr = new Date(detail.appointed);
  const TotalSlides = detail?.imageUrls?.length - 4;
  const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;
  const kRTimeDiff = 9 * 60 * 60 * 1000;
  const KrCurr = new Date(utc + kRTimeDiff);
  const KoreaDate = !detail.appointed ? null : KrCurr.toLocaleDateString();

  const [currentSlide, setCurrentSlide] = useState(0);

  const changeDeadLine = () => {
    if (deadLine === 1) {
      dispatch(
        __deadLinePost({ isDeadLine: { isDeadLine: parseInt(2) }, id: postId })
      );
    } else {
      dispatch(
        __deadLinePost({ isDeadLine: { isDeadLine: parseInt(1) }, id: postId })
      );
    }
  };

  const linkUpdatePost = () => {
    navigate(`/post/update/${postId}`);
  };

  const deletePost = async () => {
    if (window.confirm("게시글을 삭제합니다")) {
      dispatch(__deletePost(postId));
    } else return;
  };

  const ZZim = async (e) => {
    dispatch(__postZZim(postId));
  };

  const moveCrsLeft = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TotalSlides);
    }
    // 마지막 사진으로 이동
    else {
      setCurrentSlide(currentSlide - 1);
    }
  };
  const moveCrsRight = () => {
    if (currentSlide >= TotalSlides) {
      //더 이상 넘어갈 슬라이드가 없으면 1번째 사진으로 넘어간다
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };
  const preview = (img) => {
    preRef.current.src = img;
  };

  useEffect(() => {
    dispatch(__detailPost(postId));
    if (zMsg !== undefined) {
      zMsg === "찜"
        ? (zzimRef.current.src = `${fullHeart}`)
        : (zzimRef.current.src = `${emptyHeart}`);
    }
  }, [dead, zMsg]);

  useEffect(() => {
    crsRef.current.style.transition = "all 0.5s ease-in-out";
    crsRef.current.style.transform = `translateX(-${currentSlide * 12.88}em)`;
  }, [currentSlide]);
  return (
    <StWrapper>
      <StContainer>
        <StSpaceBetween>
          <StBackBtn onClick={() => navigate("/postlist")}>
            <img src={arrow_forward_ios} alt="back_button" />
          </StBackBtn>
          <StFlex>
            {(logedIn || kakaoLogedIn) && (
              <>
                {userId === detail?.userId && (
                  <>
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
            {userId === detail?.userId && (
              <StUpdateButton onClick={linkUpdatePost}>수정</StUpdateButton>
            )}
            {(logedIn || kakaoLogedIn) && (
              <>
                {userId === detail.userId && (
                  <StDeleteButton onClick={deletePost}>삭제</StDeleteButton>
                )}
              </>
            )}
          </StFlex>
        </StSpaceBetween>
        <StFlex>
          <StTitle>{detail?.title}</StTitle>
          {deadLine === 2 && <StMagam>마감</StMagam>}
        </StFlex>
        <StUserInfo>
          <StFlex>
            <StProfile src={detail?.userImage}></StProfile>
            <div>
              <StNickname>{detail?.userName}</StNickname>
              <StLocation>
                {detail?.location1}&nbsp;{detail?.location2}
              </StLocation>
            </div>
          </StFlex>
        </StUserInfo>
        <StHopeDay>희망일:{KoreaDate}</StHopeDay>

        <StMainImg ref={preRef} src={detail.mainImage}></StMainImg>
        <StGroupImgs value={currentSlide + 1}>
          <StCrsLeftButton
            src={CrsLeft}
            onClick={moveCrsLeft}
          ></StCrsLeftButton>
          <StCrsRightButton
            src={CrsRight}
            onClick={moveCrsRight}
          ></StCrsRightButton>

          <StHidden>
            <StCrsContainer ref={crsRef}>
              {detail.imageUrls?.map((item, idx) => {
                return (
                  <StCrsImg
                    src={item}
                    key={idx}
                    onClick={() => preview(item)}
                  />
                );
              })}
            </StCrsContainer>
          </StHidden>
        </StGroupImgs>
        <StContentsWrapper>
          <StContents>{detail.content}</StContents>
        </StContentsWrapper>
        <StFlex>
          {tag?.map((item, idx) => {
            return <StTags key={idx}>{item}</StTags>;
          })}
        </StFlex>
        {
          <>
            {
              <StBtnBox>
                <StChatBtn
                  onClick={() => {
                    if (
                      (logedIn || kakaoLogedIn) &&
                      userId !== detail?.userId
                    ) {
                      navigate(`/chat/${postId}/${detail?.userId}`, {
                        state: { chatInfo: detail },
                      });
                    } else {
                      alert("로그인 후에 이용해 주세요");
                    }
                  }}
                >
                  채팅하기
                </StChatBtn>
                <StWishBtn
                  onClick={() => {
                    if (
                      (logedIn || kakaoLogedIn) &&
                      userId !== detail?.userId
                    ) {
                      ZZim();
                    } else {
                      alert("로그인 후에 이용해 주세요");
                    }
                  }}
                >
                  {detail.isWished === 0 ? (
                    <StZZimImg ref={zzimRef} src={emptyHeart} alt="wish" />
                  ) : (
                    <StZZimImg ref={zzimRef} src={fullHeart} alt="wish" />
                  )}
                  <StZZimCount>{detail.Wish}</StZZimCount>
                  찜하기
                </StWishBtn>
              </StBtnBox>
            }
          </>
        }
      </StContainer>
    </StWrapper>
  );
};

export default PostDetail;
