import styled from 'styled-components';
import invitation from "../../../asset/invitation.svg"
import StButton from '../../../components/UI/StButton';

const AppointmentCard = ({ }) => {
  return (
    <StCard>
      <StDiv>
        <StButton mode="greenBlueBtn">수락하기</StButton>
      </StDiv>
    </StCard>
  );
};

export default AppointmentCard;

const StCard = styled.div`
  width:200px;
  height: 280px;
  background-image: url(${invitation});
`;

const StDiv =styled.div`
  position: relative;
  transform: translate(20%, 500%);
`;
