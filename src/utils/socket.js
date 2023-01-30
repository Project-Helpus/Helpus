import { io } from "socket.io-client";

export const socket = io(process.env.REACT_APP_CHAT_SERVER, {
  reconnectionDelayMax: 5000,
  transports: ["websocket"],
});
export const initSocketConnection = () => {
  socket.connect();
  if (socket) return;
  else return initSocketConnection();
};
export const loginChat = (userId) => {
  initSocketConnection();
  socket.emit("login", userId);
};
export const openChatRoom = (userId, postId, ownerId) => {
  socket.emit("join", {
    senderId: userId,
    postId: Number(postId),
    ownerId: Number(ownerId),
  });
};
export const enterChatRoom = (roomId) => {
  socket.emit("enter", {
    roomId: roomId,
  });
};
export const sendMessage = (userId, roomId, msg) => {
  socket.emit("send", {
    userId: userId,
    roomId: roomId,
    content: msg,
  });
};
export const readMessage = (roomId) => {
  socket.emit("read", { roomId: roomId });
};
export const quitChatRoom = (roomId) => {
  socket.emit("leave", { roomId: roomId });
};
export const deleteChatRoom = (roomId, userId, leave) => {
  socket.emit("deleteRoom", {
    roomId: roomId,
    userId: userId,
    leave: leave,
  });
};
export const appointment = (userId, roomId) => {
  socket.emit("send", {
    userId: userId,
    roomId: roomId,
    content: "`card`0",
  });
};
export const acception = (roomId) => {
  socket.emit("acceptCard", {
    roomId: roomId,
  });
};
