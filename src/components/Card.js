import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { __postZZim } from "../redux/modules/postSlice";
import {
  StColumnCard,
  StColumnImgWrapper,
  StColumnNickName,
  StColumnCity,
  StColumnTitle,
  StColumnDate,
  StDeadLine,
  StZZimHeart,
  StHeart,
  StZZimDeadLine,
  StMainSquarePhoto,
  StMargin60,
  StSubmitButton,
  StEmptyDiv,
  StZZimWrap,
  StZZimImg,
  StZZimTitle,
  StZZimWrapContents,
  StZZimWrapTag,
  StZZimWrapPhoto,
  StZZimTag,
  StMarginTop10,
  StAllPostDeadLine,
} from "./UI/CardStyle/StElements";
import {
  StRowCard,
  StRowImgWrapper,
  StImg,
  StRowTitle,
  StRowContent,
  StCrsPost,
  StCrsProfile,
  StCrsTitle,
  StCrsNickname,
  StProfileWrapper,
} from "./UI/CardStyle/Row";
import {
  StFlex,
  StCirclePhoto,
  StContentsTitle,
  StCategoryName,
  StDate,
  StNickname,
  StAddress,
  StContentsInfo,
  StMainContentsWrapper,
  StMySquarePhoto,
  StZZimSquarePhote,
  StMainContentsTitle,
  StMarginRight,
  StMainWrapper,
  StSpaceBetween,
  StEmpty,
  StTag,
  StAllPostWrapper,
  StAllPostSquarePhoto,
  StAllPostNickName,
} from "./UI/CardStyle/StCommon";

import {
  StMyContainer,
  StMyImg,
  StMyCirclePhoto,
  StMyContents,
  StMyNickName,
  StMyTitle,
  StMySubTitle,
  StMyCaption,
  StMyImgWrap,
} from "../pages/Mypage/Style/StMypage";

import emptyHeart from "../asset/emptyHeart.svg";
import fullHeart from "../asset/fullHeart.svg";
const Card = ({ type, data, onClick }) => {
  const [count, setCount] = useState(1);

  const tag = data.tag?.split(",", 3);
  const Model = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const curr = new Date(data.appointed);
    const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;
    const kRTimeDiff = 9 * 60 * 60 * 1000;
    const KrCurr = new Date(utc + kRTimeDiff);
    const KoreaDate = KrCurr.toLocaleDateString();
    // toLocaleDateString = 브라우저에서 설정된 국가에서 사용되는 날짜를 뽑아줌
    const category = data.category == 1 ? "헬피" : "헬퍼";
    const content = data.content.slice(0, 26);
    const title15 = data.title.slice(0, 15);
    const deadLine = data.isDeadLine;
    const moveDetail = (id) => {
      navigate(`/post/${id}`);
    };

    const ZZim = (e) => {
      dispatch(__postZZim(data.postId));
      setCount(count + 1);
    };

    switch (type) {
      case "가로 ":
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
          <StColumnCard>
            <StAllPostWrapper>
              <StAllPostSquarePhoto
                src={data.thumbnail}
                onClick={() => moveDetail(data.postId)}
              ></StAllPostSquarePhoto>
              <StFlex>
                <StCirclePhoto src={data.userImage}></StCirclePhoto>
                <StMarginTop10>
                  <StContentsTitle>{data.title}</StContentsTitle>
                  <StAllPostNickName>{data.userName}</StAllPostNickName>
                </StMarginTop10>
              </StFlex>
              <StFlex>
                {deadLine === 1 ? (
                  <StEmptyDiv />
                ) : (
                  <StAllPostDeadLine>마감</StAllPostDeadLine>
                )}
                {tag.map((item, idx) => {
                  return <StTag key={idx}>{item}</StTag>;
                })}
              </StFlex>
            </StAllPostWrapper>
          </StColumnCard>
        );
      case "채팅":
        return (
          <>
            <StFlex>
              <div>
                <StCirclePhoto src={data.ownerImage}></StCirclePhoto>
                <StNickname>{data.ownerName}</StNickname>
              </div>
              <div>
                <StFlex>
                  <StCategoryName>{category} 게시판</StCategoryName>
                  <StDate>&nbsp;{KoreaDate}</StDate>
                  {deadLine === 1 ? null : <StDeadLine>마감</StDeadLine>}
                </StFlex>
                <StContentsTitle>{data.title}</StContentsTitle>
                {data.content}
              </div>
            </StFlex>
          </>
        );
      case "내 게시물":
        return (
          <>
            <StMyContainer>
              <StMyImg
                src={data.thumbnail}
                onClick={() => moveDetail(data.postId)}
                alt=""
              ></StMyImg>
              <StMyContents>
                <StMyNickName>
                  <StMyCirclePhoto
                    src={data.userImage}
                    alt=""
                  ></StMyCirclePhoto>
                  <span>{data.userName}</span>
                </StMyNickName>
                <StMyTitle>{data.title}</StMyTitle>
                <StMySubTitle>{data.content}</StMySubTitle>
                <StMyCaption>
                  <span>{KoreaDate}</span>
                  <span>
                    {data.location1} {data.location2}
                  </span>
                </StMyCaption>
                {deadLine === 1 ? null : <StDeadLine>마감</StDeadLine>}
                <StZZimWrapTag>
                  {tag.map((item, idx) => {
                    return <StZZimTag key={idx}>{item}</StZZimTag>;
                  })}
                </StZZimWrapTag>
              </StMyContents>
            </StMyContainer>
          </>
        );
      case "찜 가로 게시물":
        return (
          <>
            <StMyContainer>
              <StMyImgWrap>
                <StMyImg
                  src={data.thumbnail}
                  onClick={() => moveDetail(data.postId)}
                  alt=""
                ></StMyImg>
                {count % 2 === 1 ? (
                  <StZZimHeart
                    onClick={ZZim}
                    src={fullHeart}
                    alt="wish1"
                  ></StZZimHeart>
                ) : (
                  <StZZimHeart
                    onClick={ZZim}
                    src={emptyHeart}
                    alt="wish2"
                  ></StZZimHeart>
                )}
              </StMyImgWrap>
              <StMyContents>
                <StMyNickName>
                  <StMyCirclePhoto
                    src={data.userImage}
                    alt=""
                  ></StMyCirclePhoto>
                  <span>{data.userName}</span>
                </StMyNickName>
                <StMyTitle>{data.title}</StMyTitle>
                <StMySubTitle>{data.content}</StMySubTitle>
                <StMyCaption>
                  <span>{KoreaDate}</span>
                  <span>
                    {data.location1} {data.location2}
                  </span>
                </StMyCaption>
                {deadLine === 1 ? null : <StDeadLine>마감</StDeadLine>}
                <StZZimWrapTag>
                  {tag.map((item, idx) => {
                    return <StZZimTag key={idx}>{item}</StZZimTag>;
                  })}
                </StZZimWrapTag>
              </StMyContents>
            </StMyContainer>
          </>
        );
      case "찜 게시물":
        return (
          <>
            <StZZimWrap>
              <StZZimImg
                src={data.thumbnail}
                onClick={() => moveDetail(data.postId)}
              ></StZZimImg>
              {count % 2 === 1 ? (
                <StZZimHeart
                  onClick={ZZim}
                  src={fullHeart}
                  alt="wish1"
                ></StZZimHeart>
              ) : (
                <StZZimHeart
                  onClick={ZZim}
                  src={emptyHeart}
                  alt="wish2"
                ></StZZimHeart>
              )}
              <StZZimTitle>{data.title}</StZZimTitle>
              {deadLine === 1 ? (
                <StEmptyDiv />
              ) : (
                <StZZimDeadLine>마감</StZZimDeadLine>
              )}
              <StZZimWrapContents>
                <StFlex>
                  <StZZimWrapPhoto src={data.userImage}></StZZimWrapPhoto>
                  <StNickname>{data.userName}</StNickname>
                </StFlex>
                <StZZimWrapTag>
                  {tag.map((item, idx) => {
                    return <StZZimTag key={idx}>{item}</StZZimTag>;
                  })}
                </StZZimWrapTag>
              </StZZimWrapContents>
            </StZZimWrap>
          </>
        );
      case "메인":
        return (
          <StMainWrapper>
            <StFlex>
              <StMainSquarePhoto
                src={data.imageUrl1}
                onClick={() => moveDetail(data.postId)}
              ></StMainSquarePhoto>
              <StMainContentsWrapper>
                <StFlex>
                  <StCirclePhoto src={data.userImage}></StCirclePhoto>
                  <div>
                    <StContentsTitle>{data.title}</StContentsTitle>
                    <StNickname>{data.userName}</StNickname>
                  </div>
                </StFlex>
                <StMargin60>
                  {tag?.map((item, idx) => {
                    return <StTag key={idx}>{item}</StTag>;
                  })}
                </StMargin60>
                {deadLine === 1 ? (
                  <StEmptyDiv />
                ) : (
                  <StDeadLine>마감</StDeadLine>
                )}
                2
              </StMainContentsWrapper>
            </StFlex>
          </StMainWrapper>
        );
      case "케러셀":
        return (
          <>
            <StCrsPost
              src={data.thumbnail}
              onClick={() => moveDetail(data.postId)}
            ></StCrsPost>
            <StProfileWrapper>
              <StCrsProfile src={data.userImage}></StCrsProfile>
              <div>
                <StCrsTitle>{data.title}</StCrsTitle>
                <StCrsNickname>{data.userName.slice(0, 10)}</StCrsNickname>
              </div>
            </StProfileWrapper>
          </>
        );
      default:
        return;
    }
  };

  return <Model />;
};

export default Card;
