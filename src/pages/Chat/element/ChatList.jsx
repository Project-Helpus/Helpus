import * as StChat from "../styles/StChat";
import { useNavigate } from "react-router-dom";

const ChatList = ({ chatList, userId }) => {
  const navigate = useNavigate();
  return (
    <StChat.StChatList>
      {chatList.list?.map((el, idx) => {
        if (el.ownerId === userId) {
          return (
            <StChat.StCard
              key={idx}
              onClick={() => {
                navigate(`/mypage/chat/${el.roomId}`, {
                  state: { chatInfo: el },
                });
              }}
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
              onClick={() => {
                navigate(`/mypage/chat/${el.roomId}`, {
                  state: { chatInfo: el },
                });
              }}
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
  );
};

export default ChatList;
