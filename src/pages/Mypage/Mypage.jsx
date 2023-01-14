import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { __getMyPage, __getMyposts } from "../../redux/modules/mypageSlice";
import styled from "styled-components";

const Mypage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profile = useSelector((state) => state.mypageSlice.profile);
  const myPosts = useSelector((state) => state.mypageSlice.myPosts.result);
  const userImage = useSelector((state) => state.mypageSlice.userImage);
  console.log("🚀 ~ file: Mypage.jsx:14 ~ Mypage ~ userImage", userImage);

  useEffect(() => {
    dispatch(__getMyPage());
    dispatch(__getMyposts());
  }, [dispatch]);

  return (
    <StWarp>
      <StProfile>
        <img src={profile?.userImage} alt="" />
        <span>{profile?.userName}</span>
        <span>{profile?.email}</span>
        <span>
          {profile?.state1} {profile?.state2}
        </span>
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
        </div>
        <div>
          <h2>내 게시물</h2>
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
    width: 200px;
    height: 200px;
    border-radius: 100px;
  }
  span {
    margin-top: 17px;
  }
  button {
    margin: 10px auto;
    width: 190px;
    height: 44px;
    background-color: #00c2ff;
    border: none;
    border-radius: 7px;
  }
`;
