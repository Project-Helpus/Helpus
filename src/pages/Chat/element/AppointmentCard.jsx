import styled from "styled-components";
import appointmentCard from "../../../asset/appointment_card.svg";
import logo from "../../../asset/logo.svg";
import StButton from "../../../components/UI/StButton";
import { useSelector } from "react-redux";

const AppointmentCard = ({ appointment, acceptRequest, userId }) => {
  const myId = useSelector((state) => state.userSlice.userInfo.userId);

  return (
    <StCard>
      <img src={logo} />
      <StContent>함께 해요</StContent>
      <div>
        {userId !== myId && appointment !== 2 && (
          <StButton mode="pinkSmBtn" onClick={acceptRequest}>
            수락하기
          </StButton>
        )}
      </div>
    </StCard>
  );
};

export default AppointmentCard;

const StCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  width: 210px;
  height: 298px;
  border-radius: 10px;
  border: 1px solid lightgray;
  background-image: url(${appointmentCard});
`;

const StContent = styled.div`
  font-size: 24px;
`;
