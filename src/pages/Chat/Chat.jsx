import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { StWrapper } from "../../components/UI/StIndex";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const Chat = () => {
  const { postId } = useParams();
  const { ownerId } = useParams();
  const { userInfo } = useSelector((state) => state.userSlice);
  const socket = useRef(io("ws://helpus-api.shop"));

  const [Msg, setMsg] = useState("");
  const [newMsg, setNewMsg] = useState("");
  const [chatRecord, setChatRecord] = useState([]);
  const [roomId, setRoomId] = useState("");

  // console.log(userInfo.userId);
  // console.log(postId);
  // console.log(ownerId);
  // console.log(socket.current);

  const changeInputHandler = (e) => {
    setMsg(e.target.value);
  };

  const sendMsg = () => {
    socket.current.emit("send", {
      senderId: userInfo.userId,
      rooomId: roomId,
      ownerId: ownerId,
    });
  };

  const displayNewMsg = () => {};
  useEffect(() => {
    socket.current.emit("login", userInfo?.userId);
    socket.current.emit("join", {
      senderId: userInfo.userId,
      postId: postId,
      ownerId: ownerId,
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
      setNewMsg(data.content);
    });
  }, [socket.current]);

  console.log(newMsg);
  console.log("roomId", roomId);

  return (
    <StWrapper>
      <StChatBox>{chatRecord?.map((el) => el.content)}</StChatBox>
      <div></div>
      <input onChange={changeInputHandler}></input>
      <button style={{ width: "100px", height: "100px" }} onClick={sendMsg} />
    </StWrapper>
  );
};

export default Chat;

const StChatBox = styled.div`
  width: 100%;
  height: 100%;
`;
