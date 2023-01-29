import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { StButton } from "../../components/UI/StIndex";
import { __getChat } from "../../redux/modules/mypageSlice";
import * as chatSocket from "../../utils/socket";
import * as StChat from "./StChat";
import add_a_photo from "../../asset/add_a_photo.svg";
import arrow_forward_ios from "../../asset/arrow_forward_ios.svg";
import AppointmentCard from "./element/AppointmentCard";
import { __sendImage } from "../../redux/modules/chatSlice";

const OpenChat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId } = useParams();
  const { ownerId } = useParams();
  const { userId } = useSelector((state) => state.userSlice.userInfo);
  const { chatList } = useSelector((state) => state.mypageSlice);

  const socket = useRef(chatSocket.socket);
  const chatWindow = useRef(null);
  const fileInput = useRef(null);

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

  const appointedTime = (time) => {
    const chat = time.split("T", 1);
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

  const sendImage = (e) => {
    if (e.target.files[0]) {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      formData.append("roomId", roomId);
      dispatch(__sendImage(formData));
    }
  };

  const deleteChatRoom = () => {
    if (window.confirm("채팅방을 나가시겠습니까?")) {
      chatSocket.deleteChatRoom(roomId);
    }
  };

  useEffect(() => {
    dispatch(__getChat());
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
    // dispatch(__());
  }, []);

  return (
    <StChat.StWrapper>
      <StChat.StContainer>
        <StChat.StChatList>
          <StChat.StTopContainer>
            <StChat.StTitle>채팅</StChat.StTitle>
          </StChat.StTopContainer>
          {chatList.list?.map((el, idx) => {
            if (el.ownerId === userId) {
              return (
                <StChat.StCard
                  key={idx}
                  onClick={() => navigate(`/mypage/chat/${roomId}`)}
                >
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
                <StChat.StCard
                  key={idx}
                  onClick={() => navigate(`/mypage/chat/${roomId}`)}
                >
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
              <StChat.StAppointedDay>약속 시간</StChat.StAppointedDay>
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
              placeholder="메세지 입력"
            ></StChat.StInput>
            <input
              style={{ display: "none" }}
              accept="image/jpg, image/png, image/gif"
              id="image"
              name="image"
              type="file"
              ref={fileInput}
              onChange={sendImage}
            />
            <img
              onClick={() => {
                fileInput.current.click();
              }}
              src={add_a_photo}
              alt="image_upload"
            />
          </StChat.StInputBox>
        </StChat.StInnerBox>
      </StChat.StContainer>
    </StChat.StWrapper>
  );
};

export default OpenChat;
