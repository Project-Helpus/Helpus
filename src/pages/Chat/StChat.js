import styled from "styled-components";
export const StWrapper = styled.main`
  width: 100%;
  height: 80%;
  padding: 2em 0;
  background-color: ${(props) => props.theme.colors.backgroundGray};
`;
export const StContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 1000px;
  height: 100%;
  margin: 0 auto;
`;
export const StChatList = styled.section`
  display: flex;
  flex-direction: column;
  width: 35%;
  height: 100%;
`;
export const StInnerBox = styled.section`
  display: flex;
  flex-direction: column;
  width: 65%;
`;
export const StTopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 44px;
  padding: 2em 0;
`;
export const StChatBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 15px;
  row-gap: 1em;
  border-radius: 10px 10px 0 0;
  background-color: white;
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
`;
export const StPostTitle = styled.span`
  font-weight: 700;
`;
export const StProfileImage = styled.img`
  width: 50px;
  height: 50px;
  box-shadow: 0 0 0 2px white inset;
  padding: 4px;
  border-radius: 100%;
`;
export const StCard = styled.article`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 12px 20px;
  gap: 4px;
  background: transparent;
  &:hover {
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
export const StAppointment = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;
export const StAppointedDay = styled.div`
  padding: 12px 14px;
  background-color: white;
  border-radius: 10px;
`;
export const StSendDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
`;
export const StReceiveDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;
export const StImage = styled.img`
  width: 200px;
  height: 280px;
  border-radius: 10px;
`;

export const StChatSend = styled.p`
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.backgroundGray};
  padding: 10px;
`;
export const StChatReceive = styled.p`
  border-radius: 10px;
  background-color: #ffc4d5;
  max-width: 85%;
  padding: 10px;
`;
export const StInputBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 0 0 10px 10px;
  img {
    position: absolute;
    top: 25%;
    right: 4%;
  }
`;
export const StInput = styled.input`
  position: relative;
  width: 95%;
  height: 80%;
  border: 2px solid ${(props) => props.theme.colors.backgroundGray};
  border-radius: 10px;
  padding-left: 10px;
  &:focus {
    outline: none;
    &::placeholder {
      color: rgba(0, 0, 0, 0.8);
    }
  }
`;
export const StCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
export const StBackBtn = styled.button`
  width: 36px;
  height: 36px;
  border: none;
  background-color: transparent;
`;
export const StTitle = styled.h2`
  font-style: normal;
  font-weight: 600;
  color: ${(props) => props.theme.colors.subPink};
`;
export const StInvitation = styled.div`
  width: 200px;
  height: 280px;
  border-radius: 7px;
`;
