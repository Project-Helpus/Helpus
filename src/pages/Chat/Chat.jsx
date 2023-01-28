import styled from "styled-components";
import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { StButton } from "../../components/UI/StIndex";
import { __getChat } from "../../redux/modules/mypageSlice";
import * as chatSocket from "../../utils/socket";
import * as StChat from "./StChat";
import arrow_forward_ios from "../../asset/arrow_forward_ios.svg";
import AppointmentCard from "./element/AppointmentCard";

const Chat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useSelector((state) => state.userSlice.userInfo);
  const { postId } = useParams();
  const { ownerId } = useParams();
  const { chatList } = useSelector((state) => state.mypageSlice);

  const socket = useRef(chatSocket.socket);
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

  const sendMsg = (e) => {
    if (e.key === "Enter" && msg !== "") {
      chatSocket.sendMessage(userId, roomId, msg);
      setMsg("");
    }
  };

  const linkChatRoom = () => {
    navigate(`/mypage/chat/${roomId}`, {
      state: { chatList: chatList },
    });
  };

  const deleteChatRoom = () => {
    if (window.confirm("채팅방을 나가시겠습니까?")) {
      chatSocket.deleteChatRoom(roomId);
    }
  };

  useEffect(() => {
    chatSocket.loginChat(userId);
    chatSocket.openChatRoom(userId, postId, ownerId);
    socket.current.on("roomId", (data) => {
      setRoomId(data);
    });
    socket.current.on("chat-history", (data) => {
      setChatRecord(data);
    });
    return () => {
      chatSocket.quitChatRoom(roomId);
    };
  }, []);

  useEffect(() => {
    socket.current.on("broadcast", (data) => {
      setNewMsg((prev) => [...prev, data]);
    });
    chatSocket.readMessage(roomId);
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
    <StChat.StWrapper>
      <StChat.StContainer>
        <StChat.StChatList>
          <StChat.StTopContainer>
            <h2>채팅</h2>
          </StChat.StTopContainer>
          {chatList.list?.map((el, idx) => {
            if (el.ownerId === userId) {
              return (
                <StChat.StCard key={idx} onClick={linkChatRoom}>
                  <StChat.StImage
                    src={el.senderImage}
                    alt="sender_profile_image"
                  />
                  <StChat.StCol>
                    <span>{el.title}</span>
                    <span>{el.senderName}</span>
                  </StChat.StCol>
                  <StChat.StCol></StChat.StCol>
                </StChat.StCard>
              );
            } else {
              return (
                <StChat.StCard key={idx} onClick={linkChatRoom}>
                  <StChat.StImage
                    src={el.ownerImage}
                    alt="sender_profile_image"
                  />
                  <StChat.StCol>
                    <span>{el.title}</span>
                    <span>{el.ownerName}</span>
                  </StChat.StCol>
                </StChat.StCard>
              );
            }
          })}
        </StChat.StChatList>
        <StChat.StInnerBox>
          <StChat.StTopContainer>
            <StChat.StBackBtn onClick={() => navigate(`/post/${postId}`)}>
              <img src={arrow_forward_ios} alt="back_button" />
            </StChat.StBackBtn>
            <StChat.StAppointment>
              <StButton mode="orangeSmBtn" onClick={deleteChatRoom}>
                나가기
              </StButton>
            </StChat.StAppointment>
          </StChat.StTopContainer>
          <StChat.StChatBox ref={chatWindow}>
            {chatRecord?.map((el, idx) => {
              if (el.userId === userId) {
                return (
                  <StChat.StReceiveDiv key={idx}>
                    <span>{chatTime(el.createdAt)}</span>
                    <StChat.StChatReceive>{el.content}</StChat.StChatReceive>
                  </StChat.StReceiveDiv>
                );
              } else {
                return (
                  <StChat.StSendDiv key={idx}>
                    <StChat.StChatSend>{el.content}</StChat.StChatSend>
                    <span>{chatTime(el.createdAt)}</span>
                  </StChat.StSendDiv>
                );
              }
            })}
            {newMsg?.map((el, idx) => {
              if (el.userId === userId) {
                return (
                  <StChat.StReceiveDiv key={idx}>
                    <span>{chatTime(el.createdAt)}</span>
                    <StChat.StChatReceive>{el.content}</StChat.StChatReceive>
                  </StChat.StReceiveDiv>
                );
              } else if (el.userId !== userId && el.content === "`card`0") {
                return <AppointmentCard />;
              } else {
                return (
                  <StChat.StSendDiv key={idx}>
                    <StChat.StChatSend>{el.content}</StChat.StChatSend>
                    <span>{chatTime(el.createdAt)}</span>
                  </StChat.StSendDiv>
                );
              }
            })}
          </StChat.StChatBox>
          <StChat.StInputBox>
            <StChat.StInput
              value={msg}
              onKeyPress={(e) => sendMsg(e)}
              onChange={changeInputHandler}
            ></StChat.StInput>
          </StChat.StInputBox>
        </StChat.StInnerBox>
      </StChat.StContainer>
    </StChat.StWrapper>
  );
};

export default Chat;
