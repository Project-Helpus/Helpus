import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import * as chatSocket from "../utils/socket";
import top_logo from "../asset/top_logo.svg";
import icon_search from "../asset/icon_search.svg";
import DropdownMenu from "./DropdownMenu";
import DropdownNotification from "./DropdownNotification";
import {
  __getNotification,
  __delNotification,
} from "../redux/modules/chatSlice";
import {
  __giveInput,
  __setBollAll,
  __setBoolHelpUs,
  __setBoolHelpee,
  __setBoolHelper,
  __clearPost,
  __resetInfiniteState,
} from "../redux/modules/postSlice";

const Header = () => {
  const locationNow = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [notification, setNotification] = useState([]);
  const [open, setOpen] = useState(false);
  const isLogin = useSelector((state) => state.userSlice.isLogin);
  const { userInfo } = useSelector((state) => state.userSlice);
  const isLoginKakao = useSelector((state) => state.userSlice.isLoginKakao);
  const [search, setSearch] = useState("");
  const notificationMessages = useSelector(
    (state) => state.chatSlice.notificationMessages
  );
  const socket = useRef(chatSocket.socket);

  const displayNotification = ({ title, senderName, count }, idx) => {
    return (
      <StNotificationContainer key={idx}>
        <StTitle>{`${title}`}</StTitle>
        <span>{`${senderName}님에게 ${count}개의 메세지가 왔습니다.`}</span>
      </StNotificationContainer>
    );
  };
  const linkHelpUs = () => {
    if (locationNow.pathname === "/") {
      dispatch(__clearPost());
    }
    dispatch(__setBoolHelpUs());
    navigate("/postlist");
  };
  const linkHelper = () => {
    if (locationNow.pathname === "/") {
      dispatch(__clearPost());
    }
    dispatch(__setBoolHelper());
    navigate("/postlist");
  };
  const linkHelpee = () => {
    if (locationNow.pathname === "/") {
      dispatch(__clearPost());
    }
    dispatch(__setBoolHelpee());
    navigate("/postlist");
  };
  const handleRead = () => {
    dispatch(__delNotification());
    setNotification([]);
    setOpen(!open);
  };

  useEffect(() => {
    chatSocket.login(userInfo.userId);
    if (isLogin || isLoginKakao) {
      dispatch(__getNotification());
    }
    socket.current.on("new-chat", (data) => {
      setNotification((prev) => [...prev, data]);
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
          dispatch(__resetInfiniteState());
        }}
      >
        <img src={top_logo} alt=""></img>
      </StLogo>
      <StNavigateP onClick={linkHelpUs}>HelpUs</StNavigateP>
      <StNavigateP onClick={linkHelpee}>Helpee</StNavigateP>
      <StNavigateP onClick={linkHelper}>Helper</StNavigateP>
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
              notification={notification}
              notificationMessages={notificationMessages}
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

const StNavigateP = styled.button`
  font-family: "LedkerliOne-Regular";
  font-size: 30px;
  color: #ea9db4;
  cursor: pointer;
  border: none;
  background-color: transparent;
  :hover {
    color: #dc6b94;
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
