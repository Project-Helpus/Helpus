import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { __logout } from "../redux/modules/userSlice";
import { __getMyPage } from "../redux/modules/mypageSlice";
import { __giveInput } from "../redux/modules/postSlice";
import whiteBell from "../asset/whiteBell.svg";
import { io } from "socket.io-client";
import top_logo from "../asset/top_logo.svg";
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
    if (userInfo?.userId) {
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
  text-align: center;
  line-height: 60px;
  img {
    width: 25px;
    height: 25px;
    border-radius: 100px;
    vertical-align: middle;
  }
`;
