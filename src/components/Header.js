import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { __giveInput, __setBollAll } from "../redux/modules/postSlice";
import styled from "styled-components";
import * as chatSocket from "../utils/socket";
import top_logo from "../asset/top_logo.svg";
import icon_search from "../asset/icon_search.svg";
import icon_bell from "../asset/icon_bell.svg";
import DropdownMenu from "./DropdownMenu";
import DropdownNotification from "./DropdownNotification";

const Header = () => {
  const locationNow = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const socket = useRef(chatSocket.socket);
  console.log(socket.current);

  const isLogin = useSelector((state) => state.userSlice.isLogin);
  const { userInfo } = useSelector((state) => state.userSlice);
  const isLoginKakao = useSelector((state) => state.userSlice.isLoginKakao);

  //검색 기능
  const searching = (e) => {
    e.preventDefault();
    dispatch(__giveInput(search));
    dispatch(__setBollAll());
    navigate("/postlist");
  };

  const displayNotification = ({ senderName }) => {
    <span>{`${senderName} sends new message`}</span>;
  };

  const handleRead = () => {
    setNotifications([]);
    setOpen(!open);
  };

  useEffect(() => {
    if (userInfo.userId) {
      socket.current.emit("login", userInfo.userId);
      return () => {
        socket.disconnect();
      };
    }
  }, []);

  useEffect(() => {
    console.log("new chat");
    socket.current.on("new-chat", (data) => {
      console.log(socket);
      console.log(data);
      setNotifications((prev) => [...prev, data]);
    });
  }, [socket.current]);

  if (locationNow.pathname === "/login") return null;
  if (locationNow.pathname === "/signup") return null;
  if (locationNow.pathname === "/auth/kakao/state") return null;

  return (
    <StHeaderWrapper>
      <StLogo
        onClick={() => {
          navigate("/");
          setSearch("");
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
        {!(isLogin || isLoginKakao) && (
          <StBox>
            <button
              onClick={() => {
                navigate("/login");
                setSearch("");
              }}
            >
              로그인 / 회원가입
            </button>
          </StBox>
        )}
        {(isLogin || isLoginKakao) && (
          <StBox>
            <button
              onClick={() => {
                setOpen(!open);
              }}
            >
              <img src={icon_bell} alt="notification" />
              {notifications.length > 0 && <div>{notifications.length}</div>}
            </button>
            <DropdownNotification
              handleRead={handleRead}
              setSearch={setSearch}
              notifications={notifications}
              displayNotification={displayNotification}
            />
            <DropdownMenu setSearch={setSearch} />
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
  padding: 20px;
`;

const StSearch = styled.form`
  position: relative;
  input {
    width: 100%;
    height: 46px;
    border: 1px solid lightGray;
    border-radius: 100px;
    font-size: 14px;
    padding-right: 140px;
  }
  input::placeholder {
    color: lightGray;
  }
  img {
    position: absolute;
    right: 0.8em;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;
const StLogo = styled.div`
  cursor: pointer;
`;
const StBox = styled.div`
  display: flex;
  align-items: center;
  color: middleGray;
  button {
    border: none;
    width: 8.6289em;
    font-size: 14px;
    background-color: transparent;
    border-radius: 100px;
    font-weight: 600;
    padding-left: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const StNotification = styled.div`
  position: absolute;
  width: 12em;
  text-align: center;
  padding: 8px 0;
  border: 1px solid #f5f5f5;
  box-shadow: 4px 6px 10px rgb(0 0 0 / 1%), 0 4px 6px rgb(0 0 0 / 5%);
  border-radius: 10px;
  background-color: white;
  font-size: 0.9em;
  transform: translate(-35%, 45px);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  z-index: 9;
`;
