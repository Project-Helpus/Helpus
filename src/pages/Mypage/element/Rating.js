import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import lcon_score1 from "../../../asset/lcon_score1.svg";
import lcon_score2 from "../../../asset/lcon_score2.svg";
import lcon_score3 from "../../../asset/lcon_score3.svg";
import lcon_score4 from "../../../asset/lcon_score4.svg";
import lcon_score5 from "../../../asset/lcon_score5.svg";
import lcon_score6 from "../../../asset/lcon_score6.svg";
import lcon_score7 from "../../../asset/lcon_score7.svg";
import lcon_score8 from "../../../asset/lcon_score8.svg";
import lcon_score9 from "../../../asset/lcon_score9.svg";
import lcon_score10 from "../../../asset/lcon_score10.svg";

const Rating = () => {
  const profile = useSelector((state) => state.mypageSlice.profile);
  return (
    <div>
      <StheartWrap>
        {profile?.score === null && <span>평가없음</span>}
        {profile?.score === 1 && (
          <StheartImg src={lcon_score1} alt=""></StheartImg>
        )}
        {profile?.score === 2 && (
          <StheartImg src={lcon_score2} alt=""></StheartImg>
        )}
        {profile?.score === 3 && (
          <StheartImg src={lcon_score3} alt=""></StheartImg>
        )}
        {profile?.score === 4 && (
          <StheartImg src={lcon_score4} alt=""></StheartImg>
        )}
        {profile?.score === 5 && (
          <StheartImg src={lcon_score5} alt=""></StheartImg>
        )}
        {profile?.score === 6 && (
          <StheartImg src={lcon_score6} alt=""></StheartImg>
        )}
        {profile?.score === 7 && (
          <StheartImg src={lcon_score7} alt=""></StheartImg>
        )}
        {profile?.score === 8 && (
          <StheartImg src={lcon_score8} alt=""></StheartImg>
        )}
        {profile?.score === 9 && (
          <StheartImg src={lcon_score9} alt=""></StheartImg>
        )}
        {profile?.score === 10 && (
          <StheartImg src={lcon_score10} alt=""></StheartImg>
        )}
      </StheartWrap>
      <StHeartText>
        {profile?.score === null && <span>평가없음</span>}
        {profile?.score}/10점
      </StHeartText>
    </div>
  );
};

export default Rating;
const StheartWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding-bottom: 8px;
`;
const StheartImg = styled.img``;

const StHeartText = styled.span`
  color: ${(props) => props.theme.colors.subPink};
  padding: 8px;
`;
