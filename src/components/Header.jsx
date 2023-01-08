import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { __logout } from "../redux/modules/userSlice";
import { __getMyPage } from "../redux/modules/mypageSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.mypageSlice.data);
  const isLogin = useSelector((state) => state.userSlice.isLogin);

  const logoutButton = (e) => {
    e.preventDefault();
    dispatch(__logout(isLogin));
  };

  useEffect(() => {
    dispatch(__getMyPage());
  }, [dispatch]);
  return (
    <StHeaderWrapper>
      <StLogo
        onClick={() => {
          navigate("/");
        }}
      >
        ❤+❤ Helpus
      </StLogo>
      <StSearch>
        <input type="text" placeholder="search"></input>
        <button>검색</button>
      </StSearch>
      <StLogin>
        {!isLogin && (
          <StLogin>
            <button onClick={() => navigate("/login")}>로그인</button>
            <span>|</span>
            <button onClick={() => navigate("/signup")}>회원가입</button>
          </StLogin>
        )}
        {isLogin && (
          <div>
            <StProfile onClick={() => navigate("/mypage")}>
              <img src={profile?.userImage} alt="" />
              <span>{profile?.userName}</span>
            </StProfile>
            <span>|</span>
            <button onClick={logoutButton}>로그아웃</button>
          </div>
        )}
      </StLogin>
    </StHeaderWrapper>
  );
};

export default Header;

const StHeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 70px;
  top: 0;
  margin: 0 auto;
  background-color: white;
`;
const StSearch = styled.div`
  input {
    border: 1px solid #efefef;
    background-color: transparent;
    padding: 4px;
    width: 545px;
    height: 46px;
    border-radius: 7px;
  }
  button {
    height: 46px;
    width: 62px;
    margin-left: 6px;
    border-radius: 7px;
    color: white;
    background-color: #ff00ff;
    border: none;
  }
`;
const StLogo = styled.div`
  font-size: 30px;
  color: #ff00ff;
`;
const StLogin = styled.div`
  display: flex;
  right: 0;
  button {
    border: none;
    background-color: transparent;
  }
  span {
    padding: 0 4px;
  }
`;

const StProfile = styled.button`
  img {
    width: 25px;
    height: 25px;
  }
`;
