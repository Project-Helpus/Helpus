import { useState, useEffect, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { StButton } from "../../components/UI/StIndex";
import * as chatSocket from "../../utils/socket";
import * as StChat from "./StChat";
import arrow_forward_pink from "../../asset/arrow_forward_pink.svg";
import add_a_photo from "../../asset/add_a_photo.svg";
import AppointmentCard from "./element/AppointmentCard";
import { __sendImage } from "../../redux/modules/chatSlice";
import { __getChat } from "../../redux/modules/mypageSlice";
import { __getSenderInfo } from "./../../redux/modules/chatSlice";

const MyChat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { roomId } = useParams();
  const { state } = useLocation();
  const { userId } = useSelector((state) => state.userSlice.userInfo);
  const { chatList } = useSelector((state) => state.mypageSlice);
  const [ownerInfo, setOwner] = useState({});
  const [image, setImage] = useState("");
  const [msg, setMsg] = useState("");
  const [newMsg, setNewMsg] = useState([]);
  const [chatRecord, setChatRecord] = useState(null);
  const [invitationCard, setInvitationCard] = useState(false);

  const socket = useRef(chatSocket.socket);
  const chatWindow = useRef(null);
  const fileInput = useRef(null);

  const chatTime = (time) => {
    const chat = new Date(time).toLocaleTimeString();
    return chat.split(":", 2)[0] + ":" + chat.split(":", 2)[1];
  };

  const appointedTime = (time) => {
    const chat = time.split("T", 1);
    return chat;
  };

  const changeInputHandler = (e) => {
    setMsg(e.target.value);
  };

  const moveScrollToReceiveMessage = () => {
    if (chatWindow.current) {
      chatWindow.current.scrollTo({
        top: chatWindow.current.scrollHeight,
      });
    }
  };

  const sendMsg = (e) => {
    if (e.key === "Enter" && msg !== "") {
      chatSocket.sendMessage(userId, roomId, msg);
      setMsg("");
    }
  };

  const sendImage = async (e) => {
    if (e.target.files[0]) {
      try {
        const formData = new FormData();
        formData.append("image", e.target.files[0]);
        formData.append("roomId", roomId);
        const result = await dispatch(__sendImage(formData));
        // chatSocket.sendMessage(userId, roomId, result.payload.content);
      } catch (err) {}
    }
  };

  const sendAppointment = () => {
    if (window.confirm("확정 하시겠습니까?")) {
      chatSocket.appointment(userId, roomId);
      setInvitationCard(!invitationCard);
    }
  };

  const deleteChatRoom = () => {
    if (window.confirm("채팅방을 나가시겠습니까?")) {
      chatSocket.deleteChatRoom(roomId, userId, state.chatInfo.leave);
      navigate("/mypage");
    }
  };

  const completeBoard = () => {
    if (window.confirm("재능 기부가 완료 되었나요?")) {
    }
  };

  useEffect(() => {
    dispatch(__getChat());
    chatSocket.loginChat(userId);
    chatSocket.enterChatRoom(roomId);
    socket.current.on("chat-history", (data) => {
      setChatRecord(data);
    });
    return () => {
      chatSocket.quitChatRoom(roomId);
    };
  }, [roomId]);

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
                  onClick={() =>
                    navigate(`/mypage/chat/${el.roomId}`, {
                      state: { chatInfo: el },
                    })
                  }
                >
                  <StChat.StProfileImage
                    src={el.senderImage}
                    alt="sender_profile_image"
                  />
                  <StChat.StCol>
                    <StChat.StPostTitle>{el.title}</StChat.StPostTitle>
                    <span>{el.senderName}</span>
                  </StChat.StCol>
                  <StChat.StCol></StChat.StCol>
                </StChat.StCard>
              );
            } else {
              return (
                <StChat.StCard
                  key={idx}
                  onClick={() =>
                    navigate(`/mypage/chat/${el.roomId}`, {
                      state: { chatInfo: el },
                    })
                  }
                >
                  <StChat.StProfileImage
                    src={el.ownerImage}
                    alt="sender_profile_image"
                  />
                  <StChat.StCol>
                    <StChat.StPostTitle>{el.title}</StChat.StPostTitle>
                    <span>{el.ownerName}</span>
                  </StChat.StCol>
                </StChat.StCard>
              );
            }
          })}
        </StChat.StChatList>
        <StChat.StInnerBox>
          <StChat.StTopContainer>
            <StChat.StBackBtn onClick={() => navigate("/mypage")}>
              <img src={arrow_forward_pink} alt="back_button" />
            </StChat.StBackBtn>
            <StChat.StAppointment>
              <StChat.StAppointedDay>
                {appointedTime(state.chatInfo.appointed)}
              </StChat.StAppointedDay>
              {userId === state.chatInfo.ownerId && (
                <>
                  <StButton mode="pinkSmBtn" onClick={sendAppointment}>
                    약속하기
                  </StButton>
                  <StButton mode="pinkSmBtn">취소하기</StButton>
                </>
              )}
              <StButton mode="yellowSmBtn">완료</StButton>
              <StButton mode="orangeSmBtn" onClick={deleteChatRoom}>
                나가기
              </StButton>
            </StChat.StAppointment>
          </StChat.StTopContainer>
          <StChat.StChatBox ref={chatWindow}>
            {chatRecord?.map((el, idx) => {
              console.log(el.content.split("`")[2]);
              if (
                el.userId === userId &&
                el.content !== "`card`0" &&
                el.content?.split("`")[1] !== "image"
              ) {
                return (
                  <StChat.StSendDiv key={idx}>
                    <span>{chatTime(el.createdAt)}</span>
                    <StChat.StChatReceive>{el.content}</StChat.StChatReceive>
                  </StChat.StSendDiv>
                );
              } else if (
                el.userId !== userId &&
                el.content !== "`card`0" &&
                el.content?.split("`")[1] !== "image"
              ) {
                return (
                  <StChat.StReceiveDiv key={idx}>
                    {userId === state.chatInfo.ownerId ? (
                      <StChat.StProfileImage
                        src={state.chatInfo.senderImage}
                        alt="sender_profile_image"
                      />
                    ) : (
                      <StChat.StProfileImage
                        src={state.chatInfo.ownerImage}
                        alt="sender_profile_image"
                      />
                    )}
                    <StChat.StChatSend>{el.content}</StChat.StChatSend>
                    <span>{chatTime(el.createdAt)}</span>
                  </StChat.StReceiveDiv>
                );
              } else if (el.userId === userId && el.content === "`card`0") {
                return (
                  <StChat.StSendDiv key={idx}>
                    <AppointmentCard />
                  </StChat.StSendDiv>
                );
              } else if (el.userId !== userId && el.content === "`card`0") {
                return (
                  <StChat.StReceiveDiv key={idx}>
                    <AppointmentCard />
                  </StChat.StReceiveDiv>
                );
              } else if (el.userId === userId) {
                return (
                  <StChat.StSendDiv key={idx}>
                    <StChat.StImage
                      src={el.content.split("`")[2]}
                      alt="receive_image"
                    />
                  </StChat.StSendDiv>
                );
              } else if (el.userId !== userId) {
                return (
                  <StChat.StReceiveDiv key={idx}>
                    <StChat.StImage
                      src={el.content.split("`")[2]}
                      alt="send_image"
                    />
                  </StChat.StReceiveDiv>
                );
              }
            })}
            {newMsg?.map((el, idx) => {
              if (
                el.userId === userId &&
                el.content !== "`card`0" &&
                el.content?.split("`")[1] !== "image"
              ) {
                return (
                  <StChat.StSendDiv key={idx}>
                    <span>{chatTime(el.createdAt)}</span>
                    <StChat.StChatReceive>{el.content}</StChat.StChatReceive>
                  </StChat.StSendDiv>
                );
              } else if (
                el.userId !== userId &&
                el.content !== "`card`0" &&
                el.content?.split("`")[1] !== "image"
              ) {
                return (
                  <StChat.StReceiveDiv key={idx}>
                    {userId === state.chatInfo.ownerId ? (
                      <StChat.StProfileImage
                        src={state.chatInfo.senderImage}
                        alt="sender_profile_image"
                      />
                    ) : (
                      <StChat.StProfileImage
                        src={state.chatInfo.ownerImage}
                        alt="sender_profile_image"
                      />
                    )}
                    <StChat.StChatSend>{el.content}</StChat.StChatSend>
                    <span>{chatTime(el.createdAt)}</span>
                  </StChat.StReceiveDiv>
                );
              } else if (el.userId === userId && el.content === "`card`0") {
                return (
                  <StChat.StSendDiv key={idx}>
                    <AppointmentCard />
                  </StChat.StSendDiv>
                );
              } else if (el.userId !== userId && el.content === "`card`0") {
                return (
                  <StChat.StReceiveDiv key={idx}>
                    <AppointmentCard />
                  </StChat.StReceiveDiv>
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

export default MyChat;
