import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { __giveInput } from "../redux/modules/postSlice";
import { io } from "socket.io-client";
import styled from "styled-components";
import top_logo from "../asset/top_logo.svg";
import StButton from "./UI/StButton";
import icon_search from "../asset/icon_search.svg";
import icon_bell from "../asset/icon_bell.svg";
import DropdownMenu from "./DropdownMenu";

const Header = () => {
  const locationNow = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  const isLogin = useSelector((state) => state.userSlice.isLogin);
  const { userInfo } = useSelector((state) => state.userSlice);
  const isLoginkakao = useSelector((state) => state.userSlice.isLoginkakao);

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
    if (userInfo?.userId) {
      const socket = io(process.env.REACT_APP_CHAT_SERVER, {
        transports: ["websocket"],
      });
      socket.emit("login", userInfo.userId);
      return () => {
        socket.disconnect();
      };
    }
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
          placeholder="검색어를 입력해주세요."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <img src={icon_search} alt="" />
      </StSearch>
      <StBox>
        {!(isLogin || isLoginkakao) && (
          <StBox>
            <button onClick={() => navigate("/login")}>
              로그인 / 회원가입
            </button>
          </StBox>
        )}
        {(isLogin || isLoginkakao) && (
          <StBox>
            <StButton
              onClick={() => {
                setOpen(!open);
                handleRead();
              }}
            >
              <img src={icon_bell} alt="notification" />
              {notifications.length > 0 && <div>{notifications.length}</div>}
            </StButton>
            <DropdownMenu />
          </StBox>
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
  background-color: white;
`;

const StSearch = styled.form`
  position: relative;
  input {
    width: 400px;
    height: 44px;
    border: 1px solid ${(props) => props.theme.colors.lightGray};
    padding-left: 20px;
    border-radius: 100px;
    font-size: 12px;
    border: 1px solid ${(props) => props.theme.colors.lightGray};
  }
  input::placeholder {
    color: ${(props) => props.theme.colors.lightGray};
  }
  input:focus {
    outline: ${(props) => props.theme.colors.mainPink};
  }
  img {
    position: absolute;
    right: 0.8em;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;
const StLogo = styled.div`
  margin: 20px;
  cursor: pointer;
`;
const StBox = styled.div`
  display: flex;
  padding: 0 18px;
  align-items: center;
  color: ${(props) => props.theme.colors.middleGray};
  button {
    border: none;
    font-size: 14px;
    background-color: transparent;
    border-radius: 100px;
    font-weight: 600;
    padding-left: 18px;
  }
`;
