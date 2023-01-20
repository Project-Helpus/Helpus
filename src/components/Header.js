import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { __logout } from "../redux/modules/userSlice";
import { __getMyPage } from "../redux/modules/mypageSlice";
import { __giveInput } from "../redux/modules/postSlice";
import whiteBell from "../asset/whiteBell.svg";
import { io } from "socket.io-client";
import StButton from "./UI/StButton";

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
    if (profile?.userId) {
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

  useEffect(() => {});

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
        ❤+❤ Helpus
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
        <button>검색</button>
      </StSearch>
      {open && <div>{notifications.map((n) => displayNotification(n))}</div>}
      <StBox>
        {!(isLogin || isLoginkakao) && (
          <StBox>
            <button onClick={() => navigate("/login")}>로그인</button>
            <button onClick={() => navigate("/signup")}>회원가입</button>
          </StBox>
        )}
        {(isLogin || isLoginkakao) && (
          <div>
            <StButton
              onClick={() => {
                setOpen(!open);
                handleRead();
              }}
            >
              <img src={whiteBell} alt="notification" />
              {notifications.length > 0 && <div>{notifications.length}</div>}
            </StButton>
            <StProfile onClick={() => navigate("/mypage")}>
              <img src={profile?.userImage} alt="" />
              <span>{profile?.userName}</span>
            </StProfile>
            <span>|</span>
            <button onClick={logoutButton}>로그아웃</button>
          </div>
        )}
      </StBox>
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
`;

const StSearch = styled.form`
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
const StBox = styled.div`
  display: flex;
  gap: 15px;
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
    border-radius: 100px;
  }
`;
