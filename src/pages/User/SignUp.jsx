import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { address } from "./element/Address";
import { StSelector } from "../../components/UI/StIndex";
import { __signUp, __postDupEmail } from "../../redux/modules/userSlice";
import StUserWrap from "../../components/UI/StUserWrap";
import arrow_forward_ios from "../../asset/arrow_forward_ios.svg";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [emailText, setEmailText] = useState("");
  const [nicknameText, setNicknameText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [confirmText, setConfirmText] = useState("");

  const { state, city } = address;

  //input state 초기값
  const [input, setInput] = useState({
    email: "",
    userName: "",
    password: "",
    confirm: "",
    state1: "",
    state2: "",
  });

  //유효성 input state 초기값
  const [isValid, setIsValid] = useState({
    isEmail: false,
    isUserName: false,
    isPassword: false,
    isConfirm: false,
    isState1: "",
    isState2: "",
  });

  //img 넣는 state
  const [imgFile, setImgFile] = useState();
  const [privewImg, setPrivewImg] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );
  //사진 불러오기
  const fileInput = useRef();

  //프로필 이미지 핸들러
  const changeImgHandler = (e) => {
    if (e.target.files[0]) {
      setImgFile(e.target.files[0]);
    } else {
      setImgFile();
      return;
    }
    //프로필 이미지 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPrivewImg(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  //정규식
  const emailRegExp =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  const nickRegExp = /^[A-Za-z가-힣]{2,}$/;
  const pwRegExp = /^[A-Za-z0-9]{4,}$/;

  //input 이벤트 핸들러
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });

    //email 유효성 검사
    if (name === "email") {
      if (!emailRegExp.test(value)) {
        //emaill 형식이 맞지 않을때
        setEmailText("이메일을 확인해주세요");
        setIsValid({ ...isValid, isEmail: false });
      } else {
        setEmailText("");
        setIsValid({ ...isValid, isEmail: true });
      }
    }
    //nickname 유효성 검사
    if (name === "userName") {
      if (!nickRegExp.test(value)) {
        //nickname 형식이 맞지 않을때
        setNicknameText("영문 또는 한글로 2글자이상 작성해주세요");
        setIsValid({ ...isValid, isUserName: false });
      } else {
        setNicknameText("");
        setIsValid({ ...isValid, isUserName: true });
      }
    }

    //password 유효성 검사
    if (name === "password") {
      if (!pwRegExp.test(value)) {
        //비밀번호의 길이(length)가 4글자 이하일 때
        setPasswordText("4글자 이상 작성해주세요.");
        setIsValid({ ...isValid, isPassword: false });
      } else {
        setPasswordText("");
        setIsValid({ ...isValid, isPassword: true });
      }
    }
    //password 확인 유효성 검사
    if (name === "confirm") {
      if (input.password !== value) {
        //password의 값과 같지 않을때
        setConfirmText("비밀번호가 일치하지 않습니다.");
        setIsValid({ ...isValid, isConfirm: false });
      } else {
        setConfirmText("");
        setIsValid({ ...isValid, isConfirm: true });
      }
    }
    if (name === "state1") {
      if (value === "") {
        //value 값이 없을때
        setIsValid({ ...isValid, isState1: false });
      } else {
        setIsValid({ ...isValid, isState1: true });
      }
    }
    if (name === "state2") {
      if (value === "") {
        //value 값이 없을때
        setIsValid({ ...isValid, isState2: false });
      } else {
        setIsValid({ ...isValid, isState2: true });
      }
    }
  };

  //submit 이벤트 핸들러
  const submitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    if (imgFile === undefined) {
      formData.delete("userImage", imgFile);
    } else {
      formData.append("userImage", imgFile);
    }
    for (const property in input) {
      formData.append(`${property}`, input[property]);
    }
    formData.delete("confirm");
    dispatch(__signUp(formData));
    alert("회원가입 완료");
    navigate("/login");
  };

  //email 중복확인
  const dupEmail = () => {
    dispatch(__postDupEmail(input.email));
  };

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
      <Stupwrap>
        <form onSubmit={submitHandler}>
          <Avatar>
            <img
              src={privewImg}
              onClick={() => {
                fileInput.current.click();
              }}
              alt=""
            />
            <input
              style={{ display: "none" }}
              accept="image/*"
              name="profile_img"
              type="file"
              ref={fileInput}
              onChange={changeImgHandler}
            ></input>
          </Avatar>
          <CheckWrap>
            <label>이메일</label>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "300px",
              }}
            >
              <input
                name="email"
                type="email"
                placeholder="이메일을 입력해주세요."
                onChange={onChangeHandler}
                value={input.email}
              ></input>
              <CheckButton onClick={dupEmail}>중복확인</CheckButton>
            </div>
            <span>{emailText}</span>
            <label>닉네임</label>
            <input
              name="userName"
              type="text"
              placeholder="영문과 숫자를 혼합하여 입력해 주세요."
              onChange={onChangeHandler}
              value={input.userName}
            ></input>

            <span>{nicknameText}</span>
            <label>비밀번호</label>
            <input
              name="password"
              type="password"
              placeholder="비밀번호는 4글자 이상으로 입력해 주세요."
              onChange={onChangeHandler}
              value={input.password}
              autoComplete="off"
            ></input>
            <span>{passwordText}</span>
            <label>비밀번호 확인</label>
            <input
              name="confirm"
              type="password"
              placeholder="다시 한번 입력해 주세요."
              onChange={onChangeHandler}
              value={input.confirm}
              autoComplete="off"
            ></input>
            <span>{confirmText}</span>
            <div>
              <label>살고 있는 곳</label>
              <div style={{ display: "flex", gap: "6px", marginTop: "6px" }}>
                <StSelector name="state1" onChange={onChangeHandler}>
                  <option>:: 선택 ::</option>
                  {state.map((el) => (
                    <option key={el.state} value={el.state}>
                      {el.codeNm}
                    </option>
                  ))}
                </StSelector>
                <StSelector name="state2" onChange={onChangeHandler}>
                  <option>:: 선택 ::</option>
                  {city
                    .filter((el) => el.state === input.state1)
                    .map((el) => (
                      <option key={el.city} value={el.codeNm}>
                        {el.codeNm}
                      </option>
                    ))}
                </StSelector>
              </div>
            </div>
          </CheckWrap>
          <button
            disabled={
              !(
                isValid.isEmail &&
                isValid.isUserName &&
                isValid.isPassword &&
                isValid.isConfirm &&
                isValid.isState1 &&
                isValid.isState2
              )
            }
          >
            가입
          </button>
        </form>
      </Stupwrap>
    </StWarp>
  );
};

export default SignUp;

const StWarp = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  font-size: 0.8em;
`;
const Starrow = styled.img`
  width: 30px;
  height: 30px;
  margin: 5em 0 0 2em;
  cursor: pointer;
`;
const Avatar = styled.div`
  width: 160px;
  height: 160px;
  object-fit: cover;
  border-radius: 100%;
  overflow: hidden;
  margin: 0 auto;
  margin-bottom: 40px;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
`;

const Stupwrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100vh;
  margin: 0 auto;
  justify-content: center;
  form {
    width: 300px;
    flex-direction: column;
    input {
      all: unset;
      width: 100%;
      height: 40px;
      border: 1px solid #e0e0e0;
      border-radius: 7px;
      background-color: #fafafa;
      padding-left: 6px;
    }
    span {
      display: flex;
      flex-direction: column;
      color: red;
      font-size: 12px;
      margin: 6px 0;
    }
    button {
      border: 0;
      width: 100%;
      height: 40px;
      background-color: #ffc3d5;
      border-radius: 7px;
      color: white;
      margin-top: 12px;
      cursor: pointer;
      &:disabled {
        cursor: default;
        opacity: 0.5;
        background-color: #808080;
      }
    }
    label {
      margin: 6px 0;
    }
  }
`;
const CheckWrap = styled.div`
  display: grid;
  align-items: center;
  width: 300px;
`;
const CheckButton = styled.div`
  width: 100px;
  height: 40px;
  border-radius: 7px;
  text-align: center;
  line-height: 40px;
  background-color: #7d7d7d;
  color: white;
  margin-left: 6px;
  cursor: pointer;
`;
