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
import { __getState } from "./../../redux/modules/chatSlice";

const MyChat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { roomId } = useParams();
  const { state } = useLocation();
  const { userId } = useSelector((state) => state.userSlice.userInfo);
  const { chatList } = useSelector((state) => state.mypageSlice);
  const [msg, setMsg] = useState("");
  const [newMsg, setNewMsg] = useState([]);
  const [chatRecord, setChatRecord] = useState([]);
  const [invitation, setInvitation] = useState(false);
  const [acception, setAcception] = useState(false);
  const { cardState } = useSelector((state) => state.chatSlice);
  const [appointmentState, setAppointmentState] = useState(cardState);
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
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      formData.append("roomId", roomId);
      const result = await dispatch(__sendImage(formData));
      chatSocket.sendMessage(userId, roomId, result.payload.content);
    }
  };

  const sendAppointment = () => {
    if (window.confirm("확정 하시겠습니까?")) {
      chatSocket.appointment(userId, roomId);
      setAcception(true);
      // setAppointmentState(1);
    }
  };

  const cancelAppointment = () => {
    if (window.confirm("약속을 취소 하시겠습니까?")) {
      chatSocket.cancelCard(roomId);
      setInvitation(false);
      setAcception(false);
      // setAppointmentState(0);
    }
  };

  const acceptRequest = () => {
    if (window.confirm("수락 하시겠습니까?")) {
      chatSocket.acception(roomId);
      setInvitation(true);
      // setAppointmentState(1);
    }
  };

  const deleteChatRoom = () => {
    if (
      window.confirm("채팅방을 나가시겠습니까? (모든 채팅 기록이 사라집니다)")
    ) {
      chatSocket.deleteChatRoom(roomId, userId, state.chatInfo.leave);
      navigate("/mypage");
    }
  };

  // 채팅방 입장 시 소켓 생성, 채팅방 참여, 이전 채팅기록 로딩
  useEffect(() => {
    dispatch(__getChat());
    chatSocket.loginChat(userId);
    chatSocket.enterChatRoom(roomId);
    socket.current.on("chat-history", (data) => {
      setChatRecord(data);
    });
    return () => {
      setNewMsg([]);
      chatSocket.quitChatRoom(roomId);
    };
  }, [roomId]);

  // 새로운 채팅 감지 소켓 이벤트 수신
  useEffect(() => {
    dispatch(__getState({ roomId: roomId }));
    socket.current.on("broadcast", (data) => {
      setNewMsg((prev) => [...prev, data]);
    });
    socket.current.on("updateState", (data) => {
      setAppointmentState(data.state);
    });
    chatSocket.readMessage(roomId);
  }, [socket]);

  // 새로운 채팅 감지 시 스크롤 다운
  useEffect(() => {
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
                  {appointmentState === 0 && (
                    <StButton mode="pinkSmBtn" onClick={sendAppointment}>
                      약속하기
                    </StButton>
                  )}
                  {appointmentState === 2 && (
                    <StButton mode="pinkSmBtn" onClick={cancelAppointment}>
                      취소하기
                    </StButton>
                  )}
                </>
              )}
              <StButton mode="orangeSmBtn" onClick={deleteChatRoom}>
                나가기
              </StButton>
            </StChat.StAppointment>
          </StChat.StTopContainer>
          <StChat.StChatBox ref={chatWindow}>
            {/* 이전 메세지 수신 */}
            {chatRecord?.map((el, idx) => {
              if (el.content === "`card`0" && appointmentState === 0) {
                return;
              }

              if (
                el.userId === userId &&
                el.content.includes("`card`") === false &&
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
                el.content.includes("`card`") === false &&
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
              } else if (
                el.userId === userId &&
                el.content.includes("`card`") === true
              ) {
                return (
                  <StChat.StSendDiv key={idx}>
                    <AppointmentCard
                      appointment={appointmentState}
                      userId={el.userId}
                      acceptRequest={acceptRequest}
                    />
                  </StChat.StSendDiv>
                );
              } else if (
                el.userId !== userId &&
                el.content.includes("`card`") === true
              ) {
                return (
                  <StChat.StReceiveDiv key={idx}>
                    <AppointmentCard
                      appointment={appointmentState}
                      userId={el.userId}
                      acceptRequest={acceptRequest}
                    />
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
            {/* 새로운 메세지 송, 수신 */}
            {newMsg?.map((el, idx) => {
              if (
                el.userId === userId &&
                el.content.includes("`card`") === false &&
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
                el.content.includes("`card`") === false &&
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
              } else if (
                el.userId === userId &&
                el.content.includes("`card`") === true
              ) {
                return (
                  <StChat.StSendDiv key={idx}>
                    <AppointmentCard
                      appointment={appointmentState}
                      userId={el.userId}
                      acceptRequest={acceptRequest}
                    />
                  </StChat.StSendDiv>
                );
              } else if (
                el.userId !== userId &&
                el.content.includes("`card`") === true
              ) {
                return (
                  <StChat.StReceiveDiv key={idx}>
                    <AppointmentCard
                      appointment={appointmentState}
                      userId={el.userId}
                      acceptRequest={acceptRequest}
                    />
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
