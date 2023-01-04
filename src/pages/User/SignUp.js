import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __signUp, __postDupEmail } from "../../redux/modules/userSlice";
import { address } from "./element/Address";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [emailText, setEmailText] = useState("");
  const [nicknameText, setNicknameText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [confirmText, setConfirmText] = useState("");
  const [state1Text, setState1Text] = useState("");
  const [state2Text, setState2Text] = useState("");

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
      setImgFile("");
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
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  const nickRegExp = /^[A-Za-z0-9]{1,}$/;
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
        setNicknameText("영문과 숫자 혼합하여 작성해주세요");
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
        setState1Text("지역을 입력해주세요.");
        setIsValid({ ...isValid, isState1: false });
      } else {
        setState1Text("");
        setIsValid({ ...isValid, isState1: true });
      }
    }
    if (name === "state2") {
      if (value === "") {
        //value 값이 없을때
        setState2Text("지역을 입력해주세요.");
        setIsValid({ ...isValid, isState2: false });
      } else {
        setState2Text("");
        setIsValid({ ...isValid, isState2: true });
      }
    }
  };

  //submit 이벤트 핸들러
  const submitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("userImage", imgFile);
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
      <Stupwrap>
        <form onSubmit={submitHandler}>
          <Avatar>
            <img
              src={privewImg}
              onClick={() => {
                fileInput.current.click();
              }}
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
            <input
              name="email"
              type="email"
              placeholder="이메일을 입력해주세요."
              onChange={onChangeHandler}
              value={input.email}
            ></input>
            <CheckButton onClick={dupEmail}>중복확인</CheckButton>
          </CheckWrap>
          <span>{emailText}</span>
          <CheckWrap>
            <label>닉네임</label>
            <input
              name="userName"
              type="text"
              placeholder="영문과 숫자를 혼합하여 입력해 주세요."
              onChange={onChangeHandler}
              value={input.userName}
            ></input>
          </CheckWrap>
          <span>{nicknameText}</span>
          <label>패쓰워드</label>
          <input
            name="password"
            type="password"
            placeholder="비밀번호는 4글자 이상으로 입력해 주세요."
            onChange={onChangeHandler}
            value={input.password}
            autoComplete="off"
          ></input>
          <span>{passwordText}</span>
          <label></label>
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
            <label>지역 설정</label>
            <div>
              <select name="state1" onChange={onChangeHandler}>
                <option>:: 선택 ::</option>
                {state.map((el) => (
                  <option key={el.state} value={el.state}>
                    {el.codeNm}
                  </option>
                ))}
              </select>
              <span>{state1Text}</span>
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
              <span>{state2Text}</span>
            </div>
          </div>
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
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  font-size: 0.8em;
  p {
    width: 200px;
    text-align: center;
    margin: 0 auto;
    color: #999;
    font-size: 1.3em;
    font-weight: 800;
  }
`;

const Avatar = styled.div`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 100%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Stupwrap = styled.div`
  width: 350px;
  margin: 0 auto;
  border: 1px solid #e0e0e0;
  background-color: white;
  padding: 40px 0;
  img {
    width: 200px;
    display: block;
    margin: 0px auto;
  }
  form {
    display: flex;
    flex-direction: column;
    padding: 20px;
    input {
      all: unset;
      width: 100%;
      height: 36px;
      border: 1px solid #e0e0e0;
      border-radius: 5px;
      margin: 6px;
      background-color: #fafafa;
    }
    span {
      display: flex;
      flex-direction: column;
      color: red;
      font-size: 12px;
      margin: 0px 6px;
    }
    button {
      border: 0;
      width: 100%;
      height: 38px;
      background-color: #0095f6;
      border-radius: 5px;
      margin: 6px;
      color: white;
      cursor: pointer;
      &:disabled {
        cursor: default;
        opacity: 0.5;
        background-color: #808080;
      }
    }
    select {
      width: 120px;
      height: 32px;
    }
  }
`;
const CheckWrap = styled.div`
  display: flex;
  align-items: center;
`;
const CheckButton = styled.div`
  width: 76px;
  height: 36px;
  border-radius: 5px;
  text-align: center;
  line-height: 36px;
  background-color: white;
  border: 1px solid #e0e0e0;
  cursor: pointer;
`;
const Stbox1 = styled.div`
  display: block;
  width: 350px;
  padding: 20px 0;
  background-color: white;
  border: 1px solid #e0e0e0;
  text-align: center;
  margin: 10px auto;
  button {
    all: unset;
    color: #0095f6;
    font-weight: 900;
    padding-left: 8px;
    cursor: pointer;
  }
`;
