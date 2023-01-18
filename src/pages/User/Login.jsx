import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __postLogin } from "../../redux/modules/userSlice";
import { KAKAO_AUTH_URL } from "./KakaoLogin";
import kakaoLogin from "../../asset/kakaoLogin.png";
import StUserWrap from "../../components/UI/StUserWrap";
import arrow_forward_ios from "../../asset/arrow_forward_ios.svg";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.userSlice.isLogin);
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

  //로그인 성공시
  useEffect(() => {
    if (!isLogin) return;
    if (isLogin) {
      alert("로그인 성공");
      navigate("/");
    }
  }, [isLogin]);

  return (
    <StWarp>
      <StUserWrap></StUserWrap>
      <Starrow
        src={arrow_forward_ios}
        alt=""
        onClick={() => {
          navigate("/");
        }}
      ></Starrow>
      <StLoginWrap>
        <div>
          <h1>로그인</h1>
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
            <a href={KAKAO_AUTH_URL}>
              <img src={kakaoLogin} alt="" />
            </a>
          </form>
        </div>
      </StLoginWrap>
    </StWarp>
  );
};

export default Login;

const StWarp = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  font-size: 0.8em;
  h1 {
    text-align: center;
  }
`;

const Starrow = styled.img`
  width: 30px;
  height: 30px;
  margin: 5em 0 0 2em;
  cursor: pointer;
`;
const StLoginWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100vh;
  margin: 0 auto;
  form {
    display: flex;
    flex-direction: column;
    padding: 20px;
    input {
      all: unset;
      width: 300px;
      height: 40px;
      border: 1px solid #e0e0e0;
      border-radius: 7px;
      margin: 6px;
      background-color: #fafafa;
    }
    button {
      border: 0;
      width: 300px;
      height: 45px;
      background-color: #ffc3d5;
      border-radius: 7px;
      margin: 6px;
    }
    img {
      margin: 6px;
    }
  }
`;
