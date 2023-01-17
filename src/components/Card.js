import { useNavigate } from "react-router";
import {
  StColumnCard,
  StColumnImgWrapper,
  StColumnNickName,
  StColumnCity,
  StColumnTitle,
  StColumnDate,
  StDeadLine,
} from "./UI/CardStyle.js/Column";
import {
  StRowCard,
  StRowImgWrapper,
  StImg,
  StRowTitle,
  StRowContent,
} from "./UI/CardStyle.js/Row";
import {
  StFlex,
  StCirclePhoto,
  StContentsTitle,
  StCategoryName,
  StDate,
  StNickname,
  StAddress,
  StContentsInfo,
  StMainSquarePhoto,
  StMainContentsWrapper,
  StMySquarePhoto,
  StZZimSquarePhote,
  StMainContentsTitle,
  StMarginRight,
  StMainWrapper,
  StSpaceBetween,
  StHeart,
} from "./UI/CardStyle.js/StCommon";
const Card = ({ type, data, onClick }) => {
  const Model = () => {
    const navigate = useNavigate();
    const curr = new Date(data.appointed);
    const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;
    const kRTimeDiff = 9 * 60 * 60 * 1000;
    const KrCurr = new Date(utc + kRTimeDiff);
    const KoreaDate = KrCurr.toLocaleDateString();
    // toLocaleDateString = 브라우저에서 설정된 국가에서 사용되는 날짜를 뽑아줌
    const category =  data.category== 1 ?"헬피":"헬퍼"
    const content = data.content.slice(0, 26)
    const title15 = data.title.slice(0, 15)
    const deadLine = data.isDeadLine;
    console.log('dead:,',deadLine)
    const moveDetail = (id) => {
      navigate(`/post/${id}`,{state:{data:data}})
    }
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
            <StColumnImgWrapper>
              <StImg alt="thumbnail" src={data.imageUrl1} onClick={()=>moveDetail(data.postId)} />
            </StColumnImgWrapper>
            <StFlex>
              <StColumnNickName>{data.userName}</StColumnNickName>
              <StColumnCity>
                {data.location1} {data.location2}
              </StColumnCity>
              {deadLine === 1 ? null : <StDeadLine>마감</StDeadLine>}
            </StFlex>
            <StColumnTitle>{data.title}</StColumnTitle>
            <StColumnDate>{KoreaDate}</StColumnDate>
          </StColumnCard>
        );
      case "채팅":
        return (
          <>
            <StFlex>
            <div>
              <StCirclePhoto src={data.imageUrl1}></StCirclePhoto>
              <StNickname>{data.userName}</StNickname>
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
            <StFlex>
              <StMySquarePhoto src={data.imageUrl1} onClick={()=>moveDetail(data.postId)}></StMySquarePhoto>
              <div>
                <StFlex>
                  <StCirclePhoto src={data.userImage}></StCirclePhoto>
                  <StNickname>{data.userName}</StNickname>
                  <StDate>{KoreaDate}</StDate>
                  <StAddress>상세주소</StAddress>
                  {deadLine === 1 ? null : <StDeadLine>마감</StDeadLine>}
                </StFlex>
                <StContentsTitle></StContentsTitle>
                <StContentsInfo>게시물 내용</StContentsInfo>
                <StFlex>
                  {/* map 돌리기(내 게시물에 참여한 사람들 프로필 사진) */}
                  <img></img>
                  <img></img>
                  <img></img>
                </StFlex>
              </div>
            </StFlex>
          </>
        );
      case "찜 게시물":
        return (
          <>
            <StZZimSquarePhote src={data.imageUrl1} onClick={()=>moveDetail(data.postId)}></StZZimSquarePhote>
            <StFlex>
              <StCirclePhoto src={data.userImage}></StCirclePhoto>
              <StNickname>{data.userName}</StNickname>
              <div>
                <StDate>{KoreaDate}</StDate>
                <StAddress>{data.location1} {data.location2}</StAddress>
              </div>
              {deadLine === 1 ? null : <StDeadLine>마감</StDeadLine>}
            </StFlex>
              <StContentsTitle>{data.title}</StContentsTitle>
              <StContentsInfo>{data.content}</StContentsInfo>
          </>
        );
      case "메인":
        return (
          <StMainWrapper>
            <StFlex>
              <StMainSquarePhoto src={data.imageUrl1} onClick={() => moveDetail(data.postId)} >
                <StHeart>🤍</StHeart>
            </StMainSquarePhoto>
              <StMainContentsWrapper>
                <StSpaceBetween>
                  <StFlex>
                  <StCirclePhoto src={data.userImage}></StCirclePhoto>
                  <StNickname>{data.userName}</StNickname>
                  </StFlex>
                  <StFlex>
                  <StDate>&nbsp;{KoreaDate}</StDate>
                  <StAddress> 
                    &gt;{data.location1} {data.location2}
                    </StAddress>
                    {deadLine === 1 ? null : <StDeadLine>마감</StDeadLine>}
                    </StFlex>
                  </StSpaceBetween>
                <StContentsTitle>{data.title}</StContentsTitle>
                <StContentsInfo>{content}...</StContentsInfo>
            </StMainContentsWrapper>
            </StFlex>
          </StMainWrapper>
        )
      case "케러셀":
        return (
          <StMarginRight>
            <StMySquarePhoto src={data.imageUrl1} onClick={()=>moveDetail(data.postId)}></StMySquarePhoto>
            <StMainContentsTitle>{title15}...</StMainContentsTitle>{deadLine === 1 ? null : <StDeadLine>마감</StDeadLine>}
          </StMarginRight>
        )
      default:
        return;
    }
  };

  return <Model />;
};

export default Card;
