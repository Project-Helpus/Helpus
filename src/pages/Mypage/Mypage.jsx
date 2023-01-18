import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {
  __getChat,
  __getMyPage,
  __getMyposts,
} from "../../redux/modules/mypageSlice";
import styled from "styled-components";
import Card from "../../components/Card";

const Mypage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profile = useSelector((state) => state.mypageSlice.profile);
  const myPosts = useSelector((state) => state.mypageSlice.myPosts.result);
  const data = useSelector((state) => state.mypageSlice.data);

  useEffect(() => {
    dispatch(__getMyPage());
    dispatch(__getMyposts());
    dispatch(__getChat());
  }, [dispatch]);

  return (
    <StWarp>
      <StProfile>
        <img src={profile?.userImage} alt="" />
        <StName>{profile?.userName}</StName>
        <StEmail>{profile?.email}</StEmail>
        <div></div>
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
          <h2>채팅</h2>
          <div>
            {data.list?.map((el) => (
              <div key={el.roomId}>{el.Post}</div>
            ))}
          </div>
        </div>
        <div>
          <h2>내 게시물</h2>
          {myPosts?.map((el, index) => (
            <Card type="내 게시물" data={el} key={index}></Card>
          ))}
        </div>
        <div>
          <h2>찜한 게시물</h2>
        </div>
      </div>
    </StWarp>
  );
};

export default Mypage;
const StWarp = styled.div`
  display: flex;
  width: 100%;
  margin: 100px auto;
`;

const StProfile = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 448px;
  text-align: center;
  img {
    margin: 0 auto;
    width: 120px;
    height: 120px;
    border-radius: 100px;
  }
  span {
    margin-top: 17px;
  }
  button {
    margin: 10px auto;
    width: 120px;
    height: 40px;
    background-color: #ea9db4;
    border: none;
    border-radius: 7px;
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
  color: #7c7c7c;
`;
const StState = styled.div`
  color: #7c7c7c;
  margin-top: 8px;
`;
