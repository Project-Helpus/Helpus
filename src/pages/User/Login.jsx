import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __postLogin } from "../../redux/modules/userSlice";
import { KAKAO_AUTH_URL } from "./KakaoLogin";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //input state 초기값
  const [account, setAccount] = useState({ email: "", password: "" });

  //input 이벤트 핸들러
  const onChangeAccount = (e) => {
    const { name, value } = e.target;
    setAccount({ ...account, [name]: value });
  };

  //submit 이벤트 핸들러
  const loginSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(__postLogin(account));
  };

  return (
    <StWarp>
      <StLoginWrap>
        <div>
          <form>
            <label>이메일</label>
            <input
              type="email"
              name="email"
              placeholder="이메일을 입력해주세요."
              onChange={onChangeAccount}
            ></input>
            <label>비밀번호</label>
            <input
              type="password"
              name="password"
              placeholder="비밀번호를 작성해주세요."
              onChange={onChangeAccount}
            ></input>
            <button onClick={loginSubmitHandler}>로그인</button>
            <button>
              <a href={KAKAO_AUTH_URL}>kakao</a>
            </button>
          </form>
        </div>
      </StLoginWrap>
    </StWarp>
  );
};

export default SignIn;

const StWarp = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  font-size: 0.8em;
`;

const StLoginWrap = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;

  form {
    display: flex;
    flex-direction: column;
    padding: 20px;
    input {
      all: unset;
      width: 260px;
      height: 36px;
      border: 1px solid #e0e0e0;
      border-radius: 5px;
      margin: 6px;
      background-color: #fafafa;
    }
    button {
      border: 0;
      width: 266px;
      height: 38px;
      background-color: #0095f6;
      border-radius: 5px;
      margin: 6px;
      color: white;
    }
  }
`;
