import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import rating_heart from "../../../asset/rating_heart.png";
import rating_close_icon from "../../../asset/rating_close_icon.svg";
import { __score } from "../../../redux/modules/chatSlice";
import { StButton } from "../../../components/UI/StIndex";

const RatingCard = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [rating, setRationg] = useState(0);
  const { state } = useLocation();
  const outside = useRef();

  //input 이벤트 핸들러
  const onChangeHandler = (e) => {
    e.preventDefault();
    setRationg(e.target.value);
  };
  //submit 이벤트 핸들러
  const submitHandler = (event) => {
    event.preventDefault();
    const paylode = {
      userId: state.chatInfo?.ownerId,
      score: rating,
    };
    dispatch(__score(paylode));
    setModal(false);
  };

  return (
    <div>
      <StButton
        mode="yellowSmBtn"
        onClick={() => {
          setModal(!modal);
        }}
      >
        {!modal ? "평점하기" : "평점하기"}
      </StButton>
      {modal === true ? (
        <Wrapper
          ref={outside}
          onClick={(e) => {
            if (e.target === outside.current) setModal(false);
          }}
        >
          <SwRatingWrap>
            <StCloseBt
              onClick={() => {
                setModal(false);
              }}
            ></StCloseBt>
            <span>{state.chatInfo?.ownerName}님</span>
            <span>어떠셨나요?</span>
            <div>
              <StRatingRadioWrap>
                {/* // */}
                <label>
                  <input
                    type="radio"
                    name="score"
                    value="1"
                    onChange={onChangeHandler}
                  />
                  <span></span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="score"
                    value="2"
                    onChange={onChangeHandler}
                  />
                  <span></span>
                </label>
                {/* // */}
                <label>
                  <input
                    type="radio"
                    name="score"
                    value="3"
                    onChange={onChangeHandler}
                  />
                  <span></span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="score"
                    value="4"
                    onChange={onChangeHandler}
                  />
                  <span></span>
                </label>
                {/* // */}
                <label>
                  <input
                    type="radio"
                    name="score"
                    value="5"
                    onChange={onChangeHandler}
                  />
                  <span></span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="score"
                    value="6"
                    onChange={onChangeHandler}
                  />
                  <span></span>
                </label>
                {/* // */}
                <label>
                  <input
                    type="radio"
                    name="score"
                    value="7"
                    onChange={onChangeHandler}
                  />
                  <span></span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="score"
                    value="8"
                    onChange={onChangeHandler}
                  />
                  <span></span>
                </label>
                {/* // */}
                <label>
                  <input
                    type="radio"
                    name="score"
                    value="9"
                    onChange={onChangeHandler}
                  />
                  <span></span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="score"
                    value="10"
                    onChange={onChangeHandler}
                  />
                  <span></span>
                </label>
              </StRatingRadioWrap>
              <StRatingBtWrap onClick={submitHandler}>
                <div>하트를 날려주세요</div>
              </StRatingBtWrap>
            </div>
          </SwRatingWrap>
        </Wrapper>
      ) : null}
    </div>
  );
};

export default RatingCard;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const SwRatingWrap = styled.div`
  position: relative;
  padding: 88px 28px 68px 28px;
  background-color: white;
  border-radius: 20px;
  border: 2px solid #ea9db4;
  box-shadow: 0 0 20px 5px rgb(0 0 0 / 8%);
  span {
    display: block;
    font-size: 24px;
    font-weight: 600;
    text-align: center;
    padding: 3px 0;
    :nth-child(2) {
      color: #ea9db4;
    }
  }
  button {
    position: absolute;
    right: 1em;
    top: 1em;
    border-radius: 100%;
    width: 24px;
    height: 24px;
    background-image: url(${rating_close_icon});
    border: none;
    background-color: white;
  }
`;

const StRatingBtWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  font-weight: 600;
  gap: 4px;
  div {
    width: 100%;
    background: #ea9db4;
    color: white;
    padding: 14px 12px;
    border-radius: 10px;
    text-align: center;
    font-size: 16px;
    cursor: pointer;
  }
`;

const StRatingRadioWrap = styled.div`
  display: inline-block;
  overflow: hidden;
  z-index: 20;
  height: 40px;
  margin-top: 12px;
  &:after {
    content: "";
    display: block;
    position: relative;
    height: 40px;
    background: url(${rating_heart}) repeat-x 0 0;
    background-size: contain;
    pointer-events: none;
  }

  span:nth-child(2) {
    position: absolute;
    right: 0;
    width: 500px;
    height: 40px;
    pointer-events: none;
  }
  label {
    position: relative;
    float: left;
    width: 20px;
    height: 40px;
    cursor: pointer;
    input {
      opacity: 0 !important;
      height: 0 !important;
      width: 0 !important;
      position: absolute !important;
      &:checked + span:nth-child(2) {
        background-color: #ea9db4;
      }
    }
  }
`;

const StCloseBt = styled.button`
  width: 25px;
  height: 25px;
  background-image: url(${rating_close_icon});
`;
