import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import rating_heart from "../../../asset/rating_heart.png";
import { __score } from "../../../redux/modules/chatSlice";

const RatingCard = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [rating, setRationg] = useState(0);
  const { state } = useLocation();
  console.log("🚀 ~ file: RatingCard.jsx:12 ~ RatingCard ~ state", state);

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
  };

  return (
    <div>
      <button
        onClick={() => {
          setModal(!modal);
        }}
      >
        {!modal ? "open" : "close"}
      </button>
      {modal === true ? (
        <Wrapper>
          <SwRatingWrap>
            <button>x</button>
            <span>안녕님</span>
            <span>만족하셨나요?</span>
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
  padding: 88px 28px 68px 28px;
  background-color: white;
  border-radius: 20px;
  border: 2px solid #ea9db4;
  box-shadow: 6px 6px 6px rgb(0 0 0 / 5%);
  span {
    display: block;
    font-size: 24px;
    font-weight: 600;
    text-align: center;
  }
  button {
    position: absolute;
    right: 1em;
    top: 1em;
    border-radius: 100%;
    width: 24px;
    height: 24px;
    background: white;
    border: 1px solid #ea9db4;
    color: #ea9db4;
    font-weight: 600;
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
  margin-top: 20px;
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
