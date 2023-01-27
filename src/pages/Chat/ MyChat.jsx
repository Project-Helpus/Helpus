import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { StButton } from "../../components/UI/StIndex";
import * as chatSocket from "../../utils/socket";
import arrow_forward from "../../asset/arrow_forward.svg";

const MyChat = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const { state } = useLocation();
  const [msg, setMsg] = useState("");
  const [newMsg, setNewMsg] = useState([]);
  const [chatRecord, setChatRecord] = useState(null);

  const [ownerInfo, setOwner] = useState({});
  const [invitaionCard, setInvitationCard] = useState(false);

  const socket = useRef(chatSocket.socket);
  const chatWindow = useRef(null);
  const { userId } = useSelector((state) => state.userSlice.userInfo);
  const { chatList } = useSelector((state) => state.mypageSlice);

  const chatTime = (time) => {
    const chat = new Date(time).toLocaleTimeString();
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

  const sendMsg = () => {
    if (msg !== "") {
      chatSocket.sendMessage(userId, roomId, msg);
      setMsg("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && msg !== "") {
      chatSocket.sendMessage(userId, roomId, msg);
      setMsg("");
    }
  };

  const sendAppointment = () => {
    if (window.confirm("확정 하시겠습니까?")) {
      chatSocket.appointment(userId, roomId);
    }
  };

  const deleteChatRoom = () => {
    if (window.confirm("채팅방을 나가시겠습니까?")) {
      chatSocket.deleteChatRoom(roomId);
    }
  };

  useEffect(() => {
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
    <StContainer>
      <StChatList>
        <StTopContainer>
          <h2>채팅</h2>
        </StTopContainer>
        {state.chatList?.list.map((el, idx) => {
          if (el.ownerId === userId) {
            return (
              <StCard
                key={idx}
                onClick={() =>
                  navigate(`/mypage/chat/${el.roomId}`, {
                    state: { chatList: chatList },
                  })
                }
              >
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
              <StCard
                key={idx}
                onClick={() =>
                  navigate(`/mypage/chat/${el.roomId}`, {
                    state: { chatList: chatList },
                  })
                }
              >
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
          <StBackBtn onClick={() => navigate("/mypage")}>
            <img src={arrow_forward} alt="back_button" />
          </StBackBtn>
          <StAppointment>
            <span>약속날짜</span>

            <StButton mode="pinkSmBtn" onClick={sendAppointment}>
              약속하기
            </StButton>
            <StButton mode="pinkSmBtn">취소하기</StButton>
            <StButton mode="yellowSmBtn">완료</StButton>

            <StButton mode="orangeSmBtn" onClick={deleteChatRoom}>
              나가기
            </StButton>
          </StAppointment>
        </StTopContainer>
        <StChatBox ref={chatWindow}>
          {chatRecord?.map((el, idx) => {
            if (el.userId === userId) {
              return (
                <StReceiveDiv key={idx}>
                  <span>{chatTime(el.createdAt)}</span>
                  <StChatReceive>{el.content}</StChatReceive>
                </StReceiveDiv>
              );
            } else {
              return (
                <StSendDiv key={idx}>
                  <StChatSend>{el.content}</StChatSend>
                  <span>{chatTime(el.createdAt)}</span>
                </StSendDiv>
              );
            }
          })}
          {newMsg?.map((el, idx) => {
            if (el.userId === userId && el.content !== "`card`0") {
              return (
                <StReceiveDiv key={idx}>
                  <span>{chatTime(el.createdAt)}</span>
                  <StChatReceive>{el.content}</StChatReceive>
                </StReceiveDiv>
              );
            } else if (el.userId === userId && el.content === "`card`0") {
              return <div>카드!!!</div>;
            } else if (el.userId !== userId && el.content === "`card`0") {
              return <div>카드!!!</div>;
            } else {
              return (
                <StSendDiv key={idx}>
                  <StChatSend>{el.content}</StChatSend>
                  <span>{chatTime(el.createdAt)}</span>
                </StSendDiv>
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

export default MyChat;

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
