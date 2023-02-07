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
  __logout,
} from "../../redux/modules/userSlice";
import { StSelector } from "../../components/UI/StIndex";
import { address } from "../../asset/address";
import icon_camera from "../../asset/icon_camera.svg";
import styled from "styled-components";

const MypageDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //프로필 정보 불러오기
  const profile = useSelector((state) => state.mypageSlice.profile);
  const isLoginKakao = useSelector((state) => state.userSlice.isLoginKakao);
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
    if (imgFile === undefined) {
      alert("이미지 등록을 해주세요:)");
    } else {
      alert("수정 완료");
    }
  };

  //패쓰워드 수정 완료 버튼
  const PassWordUpdateHandler = () => {
    if (password === "") {
      alert("비밀번호를 입력해주세요.");
    } else {
      dispatch(__patchPassword(password));
      dispatch(__logout());
      navigate("/");
    }
  };

  //수정 완료 버튼
  const updateHandler = () => {
    dispatch(__patchMypage(input));
    alert("수정완료");
    navigate("/mypage");
  };

  //카카오 탈퇴 버튼
  const kakaosignOutHandler = () => {
    if (window.confirm("정말 탈퇴하시겠습니까?")) {
      dispatch(__kakaoSignOut());
      navigate("/");
    } else {
      alert("취소합니다.");
    }
  };

  //로컬 탈퇴 버튼
  const signOutHandler = () => {
    if (window.confirm("정말 탈퇴하시겠습니까?")) {
      dispatch(__signOut());
      navigate("/");
    } else {
      alert("취소합니다.");
    }
  };

  //프로필 정보 불러오기
  useEffect(() => {
    dispatch(__getMyPage());
  }, [dispatch]);

  useEffect(() => {
    dispatch(__kakaoState(isLoginKakao));
  }, [dispatch]);

  return (
    <StWarp>
      <StBoxWrap>
        <StProfile>
          <StProfileWrap>
            <img
              src={privewImg}
              onClick={() => {
                fileInput.current.click();
              }}
              alt=""
            />
            <StCameraImg>
              <div src={icon_camera} alt="" />
            </StCameraImg>
          </StProfileWrap>
          <input
            style={{ display: "none" }}
            accept="image/*"
            name="profile_img"
            type="file"
            ref={fileInput}
            onChange={changeImgHandler}
          ></input>
          <button onClick={submitHandler}>프로필 수정</button>
        </StProfile>
        <StFormWrap>
          <label>닉네임</label>
          <input
            onChange={updateOnChange}
            name="userName"
            defaultValue={userInfo?.userName || ""}
            required
            autoFocus
          ></input>
        </StFormWrap>
        <StFormWrap>
          <label>이메일</label>
          <input
            value={profile?.email}
            placeholder="카카오 계정입니다."
            readOnly
          ></input>
        </StFormWrap>
        <StFormWrap>
          <label>살고 있는 곳</label>
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
        </StFormWrap>
        <StFormWrap>
          <button
            onClick={() => {
              navigate("/mypage");
            }}
          >
            취소하기
          </button>
          <button onClick={updateHandler}>수정하기</button>
        </StFormWrap>
      </StBoxWrap>
      {!isLoginKakao && (
        <div>
          <StPwBoxWrap>
            <StFormWrap>
              <label>기존 비밀번호</label>
              <input
                type="password"
                name="password"
                onChange={passwordUpdateOnChange}
                value={password.password}
              ></input>
            </StFormWrap>
            <StFormWrap>
              <label>새로운 비밀번호</label>
              <input
                type="password"
                name="newPw"
                value={password.newPw}
                onChange={passwordUpdateOnChange}
              ></input>
            </StFormWrap>
            <StFormWrap>
              <button onClick={PassWordUpdateHandler}>비밀번호 수정</button>
            </StFormWrap>
          </StPwBoxWrap>
          <StSingOut onClick={signOutHandler}>회원탈퇴</StSingOut>
        </div>
      )}
      {isLoginKakao && (
        <div>
          <StSingOut onClick={kakaosignOutHandler}>회원탈퇴</StSingOut>
        </div>
      )}
    </StWarp>
  );
};

export default MypageDetail;

const StWarp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding: 80px 0;
  background-color: #f0f0f0;
`;
const StBoxWrap = styled.div`
  width: 400px;
  margin-top: 4em;
  padding: 178px 28px 48px 28px;
  background: white;
  border-radius: 20px;
  border: 1px solid #f5f5f5;
  box-shadow: 4px 6px 10px rgb(0 0 0 / 1%), 0 4px 6px rgb(0 0 0 / 5%);
`;

const StPwBoxWrap = styled.div`
  width: 400px;
  margin-top: 2em;
  padding: 38px 28px;
  background: white;
  border-radius: 20px;
  border: 1px solid #f5f5f5;
  box-shadow: 4px 6px 10px rgb(0 0 0 / 1%), 0 4px 6px rgb(0 0 0 / 5%);
`;
const StProfileWrap = styled.div`
  position: relative;
  margin: 12px auto;
`;

const StProfile = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  width: 50%;
  top: 10em;
  left: 25%;
  img {
    width: 130px;
    height: 130px;
    object-fit: cover;
    border-radius: 100%;
    border: 2px solid #f5f5f5;
    overflow: hidden;
    cursor: pointer;
    &:hover {
      background: rgba(0, 0, 0, 0.3);
      transition: 0.2s ease-out;
      filter: brightness(70%);
    }
  }
  button {
    margin: 10px auto;
    width: 300px;
    height: 44px;
    background-color: ${(props) => props.theme.colors.subPink};
    border: none;
    border-radius: 7px;
    color: white;
    :nth-child(3) {
      width: 120px;
      height: 44px;
      background: white;
      border: 1px solid #d9d9d9;
      color: #747474;
      margin-bottom: 60px;
    }
  }
`;
const StCameraImg = styled.div`
  position: absolute;
  width: 36px;
  height: 36px;
  border-radius: 100px;
  background-color: black;
  right: 0em;
  bottom: 0em;
  div {
    background-image: url(${icon_camera});
    position: absolute;
    width: 55%;
    height: 50%;
    right: 20%;
    top: 24%;
  }
`;
const StFormWrap = styled.div`
  width: 100%;
  height: 45px;
  padding: 0 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  gap: 8px;
  input {
    width: 100%;
    border-radius: 7px;
    padding: 12px;
    margin: 8px 0;
    background-color: #f6f6f6;
    border: none;
    :focus {
      outline: none;
    }
    :nth-child(1) {
      background-color: #929292;
      color: #b3b3b3;
    }
  }
  label {
    width: 180px;
  }
  button {
    width: 300px;
    height: 48px;
    background-color: ${(props) => props.theme.colors.subPink};
    border: none;
    border-radius: 7px;
    margin-top: 36px;
    color: white;
    :nth-child(1) {
      background: white;
      border: 1px solid #d9d9d9;
      color: #747474;
    }
  }
`;

const StSingOut = styled.div`
  width: 400px;
  margin: 12px 0;
  font-size: 14px;
  color: ${(props) => props.theme.colors.middleGray};
`;
