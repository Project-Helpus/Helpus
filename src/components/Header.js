import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { __logout } from "../redux/modules/userSlice";
import { __getMyPage } from "../redux/modules/mypageSlice";
import { __giveInput } from "../redux/modules/postSlice";
import { io } from "socket.io-client";
import top_logo from "../asset/top_logo.svg";

const Header = () => {
  const locationNow = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  const profile = useSelector((state) => state.mypageSlice.profile);
  const isLogin = useSelector((state) => state.userSlice.isLogin);
  const { userInfo } = useSelector((state) => state.userSlice);
  const isLoginkakao = useSelector((state) => state.userSlice.isLoginkakao);

  //로그아웃
  const logoutButton = (e) => {
    e.preventDefault();
    dispatch(__logout(isLogin));
    navigate("/");
  };

  //검색 기능
  const searching = (e) => {
    e.preventDefault();
    dispatch(__giveInput(search));
  };

  const displayNotification = ({ senderName }) => {
    <span>{`${senderName} sends new message`}</span>;
  };

  const handleRead = () => {
    setNotifications([]);
  };

  useEffect(() => {
    dispatch(__getMyPage());
    if (userInfo.userId) {
      const socket = io(process.env.REACT_APP_CHAT_SERVER, {
        transports: ["websocket"],
      });
      socket.emit("login", userInfo.userId);
      return () => {
        socket.disconnect();
      };
    }
  }, [isLogin]);

  //프로필 이미지 불러오기
  useEffect(() => {
    dispatch(__getMyPage());
  }, [isLogin, isLoginkakao]);

  if (locationNow.pathname === "/login") return null;
  if (locationNow.pathname === "/signup") return null;
  if (locationNow.pathname === "/auth/kakao/state") return null;

  return (
    <StHeaderWrapper>
      <StLogo
        onClick={() => {
          navigate("/");
        }}
      >
        <img src={top_logo} alt=""></img>
      </StLogo>
      <StSearch onSubmit={searching}>
        <input
          type="text"
          placeholder="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        ></input>
      </StSearch>
      <button
        onClick={() => {
          setOpen(!open);
          handleRead();
        }}
      >
        알림
        {notifications.length > 0 && <div>{notifications.length}</div>}
      </button>
      {open && <div>{notifications.map((n) => displayNotification(n))}</div>}
      <StLogin>
        {!(isLogin || isLoginkakao) && (
          <StLogin>
            <button onClick={() => navigate("/login")}>로그인</button>
            <span>|</span>
            <button onClick={() => navigate("/signup")}>회원가입</button>
          </StLogin>
        )}
        {(isLogin || isLoginkakao) && (
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
  height: 80px;
`;

const StSearch = styled.form`
  input {
    border: 1px solid #efefef;
    background-color: rgba(255, 255, 255, 0.1);
    padding: 4px;
    width: 500px;
    height: 46px;
    border-radius: 7px;
    outline: none;
  }
`;
const StLogo = styled.div`
  margin: 20px;
  cursor: pointer;
`;
const StLogin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
  text-align: center;
  line-height: 60px;
  img {
    width: 25px;
    height: 25px;
    border-radius: 100px;
    vertical-align: middle;
  }
`;
