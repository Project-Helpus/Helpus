export const chatTime = (time) => {
  const chat = new Date(time).toLocaleTimeString();
  return chat.split(":", 2)[0] + ":" + chat.split(":", 2)[1];
};

export const appointedTime = (time) => {
  const chat = time.split("T", 1);
  return chat;
};

export const moveScrollToReceiveMessage = (chatWindow) => {
  if (chatWindow.current) {
    chatWindow.current.scrollTo({
      top: chatWindow.current.scrollHeight,
    });
  }
};
