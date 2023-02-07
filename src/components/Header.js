import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  __giveInput,
  __setBollAll,
  __setBoolHelpUs,
  __setBoolHelpee,
  __setBoolHelper,
} from "../redux/modules/postSlice";
import { io } from "socket.io-client";
import styled from "styled-components";
import top_logo from "../asset/top_logo.svg";
import StButton from "./UI/StButton";
import icon_search from "../asset/icon_search.svg";
import DropdownMenu from "./DropdownMenu";

const Header = () => {
  const locationNow = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  const isLogin = useSelector((state) => state.userSlice.isLogin);
  const { userInfo } = useSelector((state) => state.userSlice);
  const isLoginKakao = useSelector((state) => state.userSlice.isLoginKakao);
  const [search, setSearch] = useState("");

  const displayNotification = ({ senderName }) => {
    <span>{`${senderName} sends new message`}</span>;
  };
  const linkHelpUs = () => {
    dispatch(__setBoolHelpUs());
    navigate("/postlist");
  };
  const linkHelper = () => {
    dispatch(__setBoolHelper());
    navigate("/postlist");
  };
  const linkHelpee = () => {
    dispatch(__setBoolHelpee());
    navigate("/postlist");
  };
  const handleRead = () => {
    setNotifications([]);
  };

  useEffect(() => {}, [isLogin, isLoginKakao]);

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
            {/* <StButton
              onClick={() => {
                setOpen(!open);
                handleRead();
              }}
            >
              <img src={icon_bell} alt="notification" />
              {notifications.length > 0 && <div>{notifications.length}</div>}
            </StButton> */}
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
    padding-left: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
