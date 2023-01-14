import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {
  __getMyPage,
  __patchMypage,
  __userImage,
  __patchPassword,
} from "../../redux/modules/mypageSlice";
import { StSelector } from "../../components/UI/StIndex";
import { address } from "../User/element/Address";
import camera_icon from "../../asset/camera_icon.svg";
import styled from "styled-components";

const MypageDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //프로필 정보 불러오기
  const userImage = useSelector((state) => state.mypageSlice.userImage);
  const profile = useSelector((state) => state.mypageSlice.profile);
  const kakaoState = useSelector((state) => state.userSlice.kakaoState);
  const isLoginkakao = useSelector((state) => state.userSlice.isLoginkakao);
  console.log(
    "🚀 ~ file: MypageDetail.jsx:24 ~ MypageDetail ~ isLoginkakao",
    isLoginkakao
  );
  console.log(
    "🚀 ~ file: MypageDetail.jsx:22 ~ MypageDetail ~ profile",
    profile
  );
  console.log(
    "🚀 ~ file: MypageDetail.jsx:21 ~ MypageDetail ~ userImage",
    userImage
  );
  console.log(
    "🚀 ~ file: MypageDetail.jsx:23 ~ MypageDetail ~ kakaoState",
    kakaoState
  );

  //수정 input 넣는 state
  const [input, setInput] = useState({
    userName: profile?.userName,
    state1: profile?.state1,
    state2: profile?.state2,
  });

  //패쓰워드 수정 state
  const [password, setPassword] = useState({
    password: "",
    newPw: "",
  });

  //img 넣는 state
  const [imgFile, setImgFile] = useState();
  const [privewImg, setPrivewImg] = useState(profile?.userImage);

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

  //프로필 정보 불러오기
  useEffect(() => {
    dispatch(__getMyPage());
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
        <input
          onChange={updateOnChange}
          name="userName"
          defaultValue={profile?.userName || ""}
          required
          autoFocus
        ></input>
        <input
          value={profile?.email}
          placeholder="카카오 계정입니다."
          readOnly
        ></input>
        <div>
          <StState>
            <StSelector
              name="state1"
              onChange={updateOnChange}
              defaultValue={profile?.state1 || ""}
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
              defaultValue={profile?.state2 || ""}
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
          </div>
        )}
        {isLoginkakao && <div></div>}
        <button>회원탈퇴</button>
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
    background-color: #00c2ff;
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
    :nth-child(5) {
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
