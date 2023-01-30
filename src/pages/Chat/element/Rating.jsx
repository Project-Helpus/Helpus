import React, { forwardRef } from "react";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router";
import useDetectClose from "../../../hooks/DropDetectClose";
import StButton from "../../../components/UI/StButton";
import heart_outlined from "../../../asset/heart_outlined.svg";
import "./Rating.css";

const Rating = () => {
  const navigate = useNavigate();

  const [modalIsOpen, modalRef, modalHandler] = useDetectClose(false);

  const ratingClickHandler = () => {
    navigate("/mypage");
  };

  return (
    <Wrapper>
      <ModalContainer>
        <button onClick={modalHandler} ref={modalRef}>
          완료하기
        </button>
        <Menu isDropped={modalIsOpen}>
          <p>상대방에게 하트를 전해주세요</p>
          <div>
            {[5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1, 0.5].map((rate) => (
              <>
                <label htmlFor={`rate${rate}`}>{rate}번 별</label>
                <input
                  name="rateGroup"
                  type="radio"
                  id={`rate${rate}`}
                  src={heart_outlined}
                />
              </>
            ))}
          </div>
        </Menu>
      </ModalContainer>
    </Wrapper>
  );
};

export default Rating;

const Wrapper = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const ModalContainer = styled.div`
  position: relative;
  text-align: center;
`;

const Menu = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30em;
  height: 20em;
  text-align: center;
  border: 1px solid ${(props) => props.theme.colors.gray};
  box-shadow: 4px 6px 10px rgb(0 0 0 / 0.5%), 0 4px 6px rgb(0 0 0 / 5%);
  border-radius: 10px;
  opacity: 0;
  visibility: hidden;
  background-color: white;
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  z-index: 9;
  ${({ isDropped }) =>
    isDropped &&
    css`
      opacity: 1;
      visibility: visible;
      transform: translate(-50%, -50%);
    `};
`;
