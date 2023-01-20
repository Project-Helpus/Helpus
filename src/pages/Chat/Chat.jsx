import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import arrow_forward from "../../asset/arrow_forward.svg";
import { StButton } from "../../components/UI/StIndex";
import { __getChat } from "../../redux/modules/mypageSlice";

const Chat = () => {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const { ownerId } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userSlice);
  const { data } = useSelector((state) => state.mypageSlice);
  const socket = useRef(
    io(process.env.REACT_APP_CHAT_SERVER, { transports: ["websocket"] })
  );
  const chatWindow = useRef(null);
  const [msg, setMsg] = useState("");
  const [newMsg, setNewMsg] = useState([]);
  const [chatRecord, setChatRecord] = useState(null);
  const [roomId, setRoomId] = useState(null);

  const changeInputHandler = (e) => {
    setMsg(e.target.value);
  };

  const chatTime = (time) => {
    const chat = new Date(time).toLocaleTimeString();
    return chat;
  };

  const moveScrollToReceiveMessage = useCallback(() => {
    if (chatWindow.current) {
      chatWindow.current.scrollTo({
        top: chatWindow.current.scrollHeight,
      });
    }
  }, []);

  const sendMsg = () => {
    if (msg !== "") {
      socket.current.emit("send", {
        userId: userInfo.userId,
        roomId: roomId,
        content: msg,
      });
      setMsg("");
    }
  };

  const sendAppointmentCard = () => {
    return (
      <StInvitation>
        <button>수락</button>
      </StInvitation>
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && msg !== "") {
      socket.current.emit("send", {
        userId: userInfo.userId,
        roomId: roomId,
        content: msg,
      });
      setMsg("");
    }
  };

  const linkOtherChat = () => {
    navigate(`/mypage/chat/${roomId}`, {
      state: { data: data },
    });
  };

  useEffect(() => {
    socket.current.emit("login", userInfo?.userId);
    socket.current.emit("join", {
      senderId: userInfo.userId,
      postId: Number(postId),
      ownerId: Number(ownerId),
    });
    socket.current.on("roomId", (data) => {
      setRoomId(data);
    });
    socket.current.on("chat-history", (data) => {
      setChatRecord(data);
    });
    return () => {
      socket.current.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.current.on("broadcast", (data) => {
      setNewMsg((prev) => [...prev, data]);
    });
  }, [socket.current]);

  useEffect(() => {
    chatWindow.current.scrollTo({
      top: chatWindow.current.scrollHeight,
    });
    moveScrollToReceiveMessage();
  }, [newMsg, chatRecord]);

  useEffect(() => {
    dispatch(__getChat());
  }, []);

  return (
    <StContainer>
      <StChatList>
        <StTopContainer>
          <h2>채팅</h2>
        </StTopContainer>
        {data?.list?.map((el, idx) => {
          if (el.ownerId === userInfo.userId) {
            return (
              <StCard key={el.roomId + idx} onClick={linkOtherChat}>
                <Avatar>
                  <img src={el.senderImage} alt="sender_profile_image" />
                </Avatar>
                <StCol>
                  <span>{el.title}</span>
                  <span>{el.senderName}</span>
                </StCol>
                <StCol></StCol>
              </StCard>
            );
          } else {
            return (
              <StCard key={idx} onClick={linkOtherChat}>
                <Avatar>
                  <img src={el.ownerImage} alt="owner_profile_image" />
                </Avatar>
                <StCol>
                  <span>{el.title}</span>
                  <span>{el.ownerName}</span>
                </StCol>
              </StCard>
            );
          }
        })}
      </StChatList>
      <StInnerBox>
        <StTopContainer>
          <StBackBtn onClick={() => navigate(-1)}>
            <img src={arrow_forward} alt="back_button" />
          </StBackBtn>
          <StAppointment>
            <span>약속날짜</span>
            <StButton mode="pinkSmBtn" onClick={sendAppointmentCard}>
              약속하기
            </StButton>
            <StButton mode="pinkSmBtn">취소하기</StButton>
            <StButton mode="orangeSmBtn">나가기</StButton>
            <StButton mode="yellowSmBtn">완료</StButton>
          </StAppointment>
        </StTopContainer>
        <StChatBox ref={chatWindow}>
          {chatRecord?.map((el, idx) => {
            if (el.userId === userInfo.userId) {
              return (
                <StSendDiv key={el.chatId + idx}>
                  <StChatSend>{el.content}</StChatSend>
                  <span>{chatTime(el.createdAt)}</span>
                </StSendDiv>
              );
            } else {
              return (
                <StReceiveDiv key={el.chatId}>
                  <span>{chatTime(el.createdAt)}</span>
                  <StChatReceive>{el.content}</StChatReceive>
                </StReceiveDiv>
              );
            }
          })}
          {newMsg?.map((el, idx) => {
            if (el.userId === userInfo.userId) {
              return (
                <StSendDiv key={el.chatId}>
                  <StChatSend>{el.content}</StChatSend>
                  <span>{chatTime(el.createdAt)}</span>
                </StSendDiv>
              );
            } else {
              return (
                <StReceiveDiv key={el.chatId}>
                  <span>{chatTime(el.createdAt)}</span>
                  <StChatReceive>{el.content}</StChatReceive>
                </StReceiveDiv>
              );
            }
          })}
        </StChatBox>
        <StInputBox>
          <StInput
            value={msg}
            onKeyPress={(e) => handleKeyPress(e)}
            onChange={changeInputHandler}
          ></StInput>
          <StSendBtn onClick={sendMsg}>전송</StSendBtn>
        </StInputBox>
      </StInnerBox>
    </StContainer>
  );
};

export default Chat;

const StContainer = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-diretion: row;
  margin: 2em 0 2em 0;
`;

const StChatList = styled.section`
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const StTopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 44px;
  padding: 0 10px;
`;

const StInnerBox = styled.section`
  width: 70%;
  display: flex;
  flex-direction: column;
`;

const StChatBox = styled.div`
  height: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  row-gap: 1em;
  background-color: white;
  overflow-y: auto;
`;

const Avatar = styled.div`
  width: 36px;
  height: 36px;
  object-fit: cover;
  border-radius: 100%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const StCard = styled.article`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 12px 20px;
  background: transparent;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const StDropdownBtn = styled.button`
  height: 30px;
  margin-right: 10px;
  background: transparent;
  border: 0;
  outline: 0;
`;

const StAppointment = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const StSendDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;

const StReceiveDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
`;

const StChatSend = styled.p`
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.backgroundGray};
  padding: 10px;
`;

const StChatReceive = styled.p`
  border-radius: 10px;
  background-color: #ffc4d5;
  padding: 10px;
`;

const StInputBox = styled.div`
  display: flex;
  align-items: center;

  border-radius: 10px;
`;

const StInput = styled.input`
  position: relative;
  width: 100%;
  height: 60px;
  border: none;
  border-radius: 10px;
  padding-left: 10px;
  font-size: 20px;
  background-color: ${(props) => props.theme.colors.backgroundGray};
  &:focus {
    outline: none;
  }
`;

const StSendBtn = styled.button`
  width: 63px;
  height: 44px;
  margin-right: 10px;
  border: none;
  border-radius: 10px;
  background-color: white;
`;

const StCol = styled.div`
  display: flex;
  flex-direction: column;
`;

const StBackBtn = styled.button`
  width: 36px;
  height: 36px;
  border: none;
  background-color: transparent;
`;

const StInvitation = styled.div`
  width: 200px;
  height: 280px;
  border-radius: 7px;
`;
