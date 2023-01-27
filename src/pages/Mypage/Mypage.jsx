import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {
  __getChat,
  __getMyPage,
  __getMyposts,
  __getWishPost,
} from "../../redux/modules/mypageSlice";
import styled from "styled-components";
import Card from "../../components/Card";
import lcon_score1 from "../../asset/lcon_score1.svg";
import lcon_score2 from "../../asset/lcon_score2.svg";
import lcon_score3 from "../../asset/lcon_score3.svg";
import lcon_score4 from "../../asset/lcon_score4.svg";
import lcon_score5 from "../../asset/lcon_score5.svg";
import lcon_score6 from "../../asset/lcon_score6.svg";
import lcon_score7 from "../../asset/lcon_score7.svg";
import lcon_score8 from "../../asset/lcon_score8.svg";
import lcon_score9 from "../../asset/lcon_score9.svg";
import lcon_score10 from "../../asset/lcon_score10.svg";

const Mypage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profile = useSelector((state) => state.mypageSlice?.profile);
  const myPosts = useSelector((state) => state.mypageSlice.myPosts?.result);
  const data = useSelector((state) => state.mypageSlice?.data);
  const chatList = useSelector((state) => state.mypageSlice?.chatList);
  const wish = useSelector((state) => state.mypageSlice?.wish);
  const { userInfo } = useSelector((state) => state.userSlice);

  useEffect(() => {
    dispatch(__getMyPage());
    dispatch(__getMyposts());
    dispatch(__getChat());
    dispatch(__getWishPost());
  }, [dispatch]);

  return (
    <StWarp>
      <StProfile>
        <StProfileImg src={profile?.userImage} alt="" />
        <StName>{userInfo?.userName}</StName>
        <StEmail>{profile?.email}</StEmail>
        <StheartWrap>
          {profile?.score === 0 && <span>평가없음</span>}
          {profile?.score === 1 && (
            <StheartImg src={lcon_score1} alt=""></StheartImg>
          )}
          {profile?.score === 2 && (
            <StheartImg src={lcon_score2} alt=""></StheartImg>
          )}
          {profile?.score === 3 && (
            <StheartImg src={lcon_score3} alt=""></StheartImg>
          )}
          {profile?.score === 4 && (
            <StheartImg src={lcon_score4} alt=""></StheartImg>
          )}
          {profile?.score === 5 && (
            <StheartImg src={lcon_score5} alt=""></StheartImg>
          )}
          {profile?.score === 6 && (
            <StheartImg src={lcon_score6} alt=""></StheartImg>
          )}
          {profile?.score === 7 && (
            <StheartImg src={lcon_score7} alt=""></StheartImg>
          )}
          {profile?.score === 8 && (
            <StheartImg src={lcon_score8} alt=""></StheartImg>
          )}
          {profile?.score === 9 && (
            <StheartImg src={lcon_score9} alt=""></StheartImg>
          )}
          {profile?.score === 10 && (
            <StheartImg src={lcon_score10} alt=""></StheartImg>
          )}
        </StheartWrap>
        <StHeartText>{profile?.score}/10점</StHeartText>
        <StState>
          {userInfo?.state1} {userInfo?.state2}
        </StState>
        <button
          onClick={() => {
            navigate("/mypage/detail");
          }}
        >
          정보 수정
        </button>
      </StProfile>
      <div>
        <div>
          <StMypageTitle>
            <h2>채팅</h2>
            <span>더보기</span>
          </StMypageTitle>
          <StChatWrap>
            {chatList.list?.map((el) => {
              if (userInfo.userId === el.ownerId) {
                return (
                  <StChatTitle
                    key={el.roomId}
                    onClick={() => {
                      navigate(`/mypage/chat/${el.roomId}`, {
                        state: { data: data },
                      });
                    }}
                  >
                    <StImageWrap>
                      <StImage src={el.senderImage} alt=""></StImage>
                      <StChatName>{el.senderName}</StChatName>
                    </StImageWrap>
                    <StTextWrap>
                      <StDate>{el.appointed.split("T")[0]}</StDate>
                      <StTitle>{el.title}</StTitle>
                    </StTextWrap>
                  </StChatTitle>
                );
              } else {
                return (
                  <StChatTitle
                    key={el.roomId}
                    onClick={() => {
                      navigate(`/mypage/chat/${el.roomId}`, {
                        state: { data: data },
                      });
                    }}
                  >
                    <StImageWrap>
                      <StImage src={el.ownerImage} alt=""></StImage>
                      <StChatName>{el.ownerName}</StChatName>
                    </StImageWrap>
                    <StTextWrap>
                      <StDate>{el.appointed.split("T")[0]}</StDate>
                      <StTitle>{el.title}</StTitle>
                    </StTextWrap>
                  </StChatTitle>
                );
              }
            })}
          </StChatWrap>
        </div>
        <div>
          <StMypageTitle>
            <h2>내 게시물</h2>
            <span>더보기</span>
          </StMypageTitle>
          <StZZimWrap>
            {myPosts?.map((el, index) => (
              <Card type="찜 게시물" data={el} key={index}></Card>
            ))}
          </StZZimWrap>
        </div>
        <StMypageTitle>
          <h2>찜한 게시물</h2>
          <span>더보기</span>
        </StMypageTitle>
        <StZZimWrap>
          {wish?.map((el, index) => (
            <Card type="찜 게시물" data={el} key={index}></Card>
          ))}
        </StZZimWrap>
      </div>
    </StWarp>
  );
};

export default Mypage;

const StWarp = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
`;

const StProfile = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 448px;
  text-align: center;
  margin-top: 100px;
  span {
    margin-top: 17px;
  }
  button {
    margin: 10px auto;
    width: 120px;
    height: 40px;
    background-color: ${(props) => props.theme.colors.subPink};
    border: none;
    border-radius: 7px;
    color: white;
  }
`;

const StProfileImg = styled.img`
  margin: 0 auto;
  width: 120px;
  height: 120px;
  border-radius: 100px;
`;
const StZZimWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 1032px;
  gap: 36px;
`;
const StMypageTitle = styled.div`
  display: flex;
  align-items: flex-end;
  margin-top: 100px;
  margin-bottom: 20px;
  h2 {
    color: ${(props) => props.theme.colors.subPink};
    padding-right: 10px;
  }
  span {
    color: ${(props) => props.theme.colors.middleGray};
    font-size: 14px;
  }
`;
const StName = styled.div`
  font-size: 1.5em;
  font-weight: 500;
  margin-top: 18px;
`;
const StEmail = styled.div`
  font-size: 1em;
  margin-top: 8px;
  color: ${(props) => props.theme.colors.middleGray};
`;
const StState = styled.div`
  color: ${(props) => props.theme.colors.middleGray};
  margin-top: 8px;
`;

const StImage = styled.img`
  width: 50px;
  height: 50px;
  box-shadow: 0 0 0 2px #efefef inset;
  padding: 4px;
  border-radius: 100%;
`;
const StChatName = styled.p`
  font-size: 14px;
  color: ${(props) => props.theme.colors.middleGray};
`;
const StTitle = styled.p`
  font-size: 18px;
  font-weight: 600;
  padding: 8px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const StDate = styled.p`
  font-size: 14px;
  color: ${(props) => props.theme.colors.middleGray};
`;

const StImageWrap = styled.div`
  width: 20%;
  text-align: center;
`;
const StTextWrap = styled.div`
  width: 80%;
`;
const StChatTitle = styled.div`
  display: flex;
  width: 33.33%;
  margin-bottom: 24px;
`;

const StChatWrap = styled.div`
  display: flex;
  width: 1032px;
  flex-wrap: wrap;
`;

const StheartWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding-top: 10px;
`;
const StheartImg = styled.img``;

const StHeartText = styled.span`
  color: ${(props) => props.theme.colors.subPink};
`;
