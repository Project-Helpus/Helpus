import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { address } from "./element/Address";
import { StSelector } from "../../components/UI/StSelector";
import { __kakaoState, __kakaoLogin } from "../../redux/modules/userSlice";
import { __getMyPage } from "../../redux/modules/mypageSlice";
import styled from "styled-components";

const State = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.mypageSlice.profile);
  const kakaoInfo = useSelector((state) => state.userSlice);
  console.log("🚀 ~ file: State.jsx:13 ~ State ~ kakaoInfo", kakaoInfo);
  console.log("🚀 ~ file: State.jsx:12 ~ State ~ profile", profile);
  //input state 초기값
  const [input, setInput] = useState({
    userId: 0,
    state1: "",
    state2: "",
  });

  //주소 불러오기
  const { state, city } = address;

  //submit 이벤트 핸들러
  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(__kakaoState(input));
    dispatch(__kakaoLogin());
  };

  //input 이벤트 핸들러
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  useEffect(() => {
    dispatch(__getMyPage());
  }, [dispatch]);

  return (
    <StProfile>
      <form onSubmit={submitHandler}>
        <div>
          <img src={profile?.userImage} alt="" />
        </div>
        <label>지역 설정</label>
        <select name="state1" onChange={onChangeHandler}>
          <option>:: 선택 ::</option>
          {state.map((el) => (
            <option key={el.state} value={el.state}>
              {el.codeNm}
            </option>
          ))}
        </select>
        <select name="state2" onChange={onChangeHandler}>
          <option>:: 선택 ::</option>
          {city
            .filter((el) => el.state === input.state1)
            .map((el) => (
              <option key={el.city} value={el.codeNm}>
                {el.codeNm}
              </option>
            ))}
        </select>
        <button>저장</button>
      </form>
    </StProfile>
  );
};

export default State;

const StProfile = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  img {
    margin: 0 auto;
    width: 200px;
    height: 200px;
    position: relative;
  }
  button {
    margin: 10px auto;
    width: 300px;
    height: 44px;
    background-color: #00c2ff;
    border: none;
    border-radius: 7px;
  }
`;
