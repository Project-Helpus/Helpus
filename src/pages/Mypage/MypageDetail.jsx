import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { __getMyPage, __patchPassword } from "../../redux/modules/mypageSlice";
import {
  __kakaoSignOut,
  __signOut,
  __kakaoState,
  __patchMypage,
  __userImage,
} from "../../redux/modules/userSlice";
import { StSelector } from "../../components/UI/StIndex";
import { address } from "../User/element/Address";
import camera_icon from "../../asset/camera_icon.svg";
import styled from "styled-components";

const MypageDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //프로필 정보 불러오기
  const profile = useSelector((state) => state.userSlice.profile);
  const isLoginkakao = useSelector((state) => state.userSlice.isLoginkakao);
  const { userInfo } = useSelector((state) => state.userSlice);

  //수정 input 넣는 state
  const [input, setInput] = useState({
    userName: userInfo?.userName,
    state1: userInfo?.state1,
    state2: userInfo?.state2,
  });

  //패쓰워드 수정 state
  const [password, setPassword] = useState({
    password: "",
    newPw: "",
  });

  //img 넣는 state
  const [imgFile, setImgFile] = useState();
  const [privewImg, setPrivewImg] = useState(userInfo?.userImage);

  //사진 저장하기
  const fileInput = useRef();

  //주소 불러오기
  const { state, city } = address;

  //패쓰워드 input 핸들러
  const updateOnChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  //수정 input 핸들러
  const passwordUpdateOnChange = (e) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
  };

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

  //submit 이벤트 핸들러
  const submitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("userImage", imgFile);
    dispatch(__userImage(formData));
    alert("수정완료");
  };

  //패쓰워드 수정 완료 버튼
  const PassWordUpdateHandler = () => {
    dispatch(__patchPassword(password));
    alert("수정완료");
    navigate("/mypage");
  };

  //수정 완료 버튼
  const updateHandler = () => {
    dispatch(__patchMypage(input));
    alert("수정완료");
    navigate("/mypage");
  };

  //카카오 탈퇴 버튼
  const kakaosignOutHandler = () => {
    dispatch(__kakaoSignOut());
    alert("탈퇴완료");
    navigate("/");
  };

  //로컬 탈퇴 버튼
  const signOutHandler = () => {
    dispatch(__signOut());
    alert("탈퇴완료");
    navigate("/");
  };

  //프로필 정보 불러오기
  useEffect(() => {
    dispatch(__getMyPage());
  }, [dispatch]);

  useEffect(() => {
    dispatch(__kakaoState(isLoginkakao));
  }, [dispatch]);

  return (
    <StWarp>
      <StProfile>
        <div style={{ position: "relative", margin: "0 auto" }}>
          <img
            src={privewImg}
            onClick={() => {
              fileInput.current.click();
            }}
            alt=""
          />
          <StCameraImg>
            <img src={camera_icon} alt="" />
          </StCameraImg>
        </div>
        <input
          style={{ display: "none" }}
          accept="image/*"
          name="profile_img"
          type="file"
          ref={fileInput}
          onChange={changeImgHandler}
        ></input>
        <button onClick={submitHandler}>프로필 수정</button>
        <label>닉네임</label>
        <input
          onChange={updateOnChange}
          name="userName"
          defaultValue={userInfo?.userName || ""}
          required
          autoFocus
        ></input>
        <label>E-mail</label>
        <input
          value={profile?.email}
          placeholder="카카오 계정입니다."
          readOnly
        ></input>
        <div>
          <label>지역 설정</label>
          <StState>
            <StSelector
              name="state1"
              onChange={updateOnChange}
              defaultValue={userInfo?.state1 || ""}
            >
              {state.map((el) => (
                <option key={el.state} value={el.state}>
                  {el.codeNm}
                </option>
              ))}
            </StSelector>
            <StSelector
              name="state2"
              onChange={updateOnChange}
              defaultValue={userInfo?.state2 || ""}
            >
              {city
                .filter((el) => el.state === input.state1)
                .map((el) => (
                  <option key={el.city} value={el.codeNm}>
                    {el.codeNm}
                  </option>
                ))}
            </StSelector>
          </StState>
        </div>
        <button onClick={updateHandler}>수정 완료</button>
        {!isLoginkakao && (
          <div>
            <label>기존 비밀번호</label>
            <input
              type="password"
              name="password"
              onChange={passwordUpdateOnChange}
            ></input>
            <label>새로운 비밀번호</label>
            <input
              type="password"
              name="newPw"
              onChange={passwordUpdateOnChange}
            ></input>
            <button onClick={PassWordUpdateHandler}>비밀번호 수정</button>
            <StSingOut onClick={signOutHandler}>로컬회원탈퇴</StSingOut>
          </div>
        )}
        {isLoginkakao && (
          <div>
            <StSingOut onClick={kakaosignOutHandler}>카카오회원탈퇴</StSingOut>
          </div>
        )}
      </StProfile>
    </StWarp>
  );
};

export default MypageDetail;

const StWarp = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 100px auto;
`;

const StProfile = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 300px;
  img {
    width: 200px;
    height: 200px;
    border-radius: 100px;
    border: 2px solid #efefef;
  }
  button {
    margin: 10px auto;
    width: 300px;
    height: 44px;
    background-color: #ea9db4;
    border: none;
    border-radius: 7px;
  }
  input {
    width: 300px;
    height: 45px;
    border: 1px solid #efefef;
    border-radius: 7px;
    padding: 8px;
    margin: 8px 0;
    :focus {
      outline: none;
    }
    :nth-child(7) {
      background-color: #efefef;
      color: #999999;
    }
  }
`;
const StCameraImg = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 100px;
  background-color: white;
  right: 0;
  bottom: 0;
  img {
    width: 100%;
    height: 100%;
  }
`;
const StState = styled.div`
  display: flex;
  gap: 6px;
  margin-top: 6px;
`;

const StSingOut = styled.div`
  font-size: 14px;
  color: #999999;
`;
