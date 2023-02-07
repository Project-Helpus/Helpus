import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { __giveInput, __setBollAll } from "../redux/modules/postSlice";
import styled from "styled-components";
import * as chatSocket from "../utils/socket";
import top_logo from "../asset/top_logo.svg";
import icon_search from "../asset/icon_search.svg";
import DropdownMenu from "./DropdownMenu";
import DropdownNotification from "./DropdownNotification";
import { __getNotification } from "../redux/modules/chatSlice";

const Header = () => {
  const locationNow = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const isLogin = useSelector((state) => state.userSlice.isLogin);
  const { userInfo } = useSelector((state) => state.userSlice);
  const isLoginKakao = useSelector((state) => state.userSlice.isLoginKakao);
  const data = useSelector((state) => state.chatSlice.data);
  console.log(data);
  const socket = useRef(chatSocket.socket);

  //검색 기능
  const searching = (e) => {
    e.preventDefault();
    dispatch(__giveInput(search));
    dispatch(__setBollAll());
    navigate("/postlist");
  };

  const displayNotification = ({ title, senderName, count }) => {
    console.log(data[0]);
    return (
      <StNotificationContainer>
        <StTitle>{`${data[0]?.title}`}</StTitle>
        <span>{`${data[0]?.senderName}님에게 ${data[0]?.count}개의 메세지가 왔습니다.`}</span>
      </StNotificationContainer>
    );
  };

  const handleRead = () => {
    setNotifications([]);
    setOpen(!open);
  };

  useEffect(() => {
    chatSocket.login(userInfo.userId);
    socket.current.on("error", (data) => {
      // console.log("error", data);
    });
  }, []);

  useEffect(() => {
    socket.current.on("new-chat", (data) => {
      console.log("new-chat", data);
      setNotifications((prev) => [...prev, data]);
      dispatch(__getNotification());
    });
  }, []);

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
            <DropdownNotification
              handleRead={handleRead}
              setSearch={setSearch}
              notifications={notifications}
              data={data}
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
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const StNotificationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 14px;
  gap: 4px;
`;

const StTitle = styled.span`
  font-weight: 600;
  font-size: 16px;
`;

const StMessage = styled.span`
  font-size: 14px;
`;
