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
import theme from "../../styles/theme";
import heart_fill from "../../asset/heart_fill.svg";
import heart from "../../asset/heart.svg";

const Mypage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profile = useSelector((state) => state.mypageSlice.profile);
  const myPosts = useSelector((state) => state.mypageSlice.myPosts.result);
  const data = useSelector((state) => state.mypageSlice.data);
  const wish = useSelector((state) => state.mypageSlice.wish);

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
        <StName>{profile?.userName}</StName>
        <StEmail>{profile?.email}</StEmail>
        <StheartWrap>
          <StheartImg src={heart_fill} alt=""></StheartImg>
          <StheartImg src={heart_fill} alt=""></StheartImg>
          <StheartImg src={heart_fill} alt=""></StheartImg>
          <StheartImg src={heart} alt=""></StheartImg>
          <StheartImg src={heart} alt=""></StheartImg>
        </StheartWrap>
        <StState>{profile?.score}/10점</StState>
        <StState>
          {profile?.state1} {profile?.state2}
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
            {data.list?.map((el) => {
              if (profile.userId === el.ownerId) {
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
const StheartImg = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 0px;
`;
