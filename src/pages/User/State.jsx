import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { address } from "./element/Address";
import { __kakaoState } from "../../redux/modules/userSlice";

const State = () => {
  const dispatch = useDispatch();
  //input state 초기값
  const [input, setInput] = useState({
    state1: "",
    state2: "",
  });
  const [user_id, setUserId] = useState();
  const [nickName, setNickName] = useState();
  const [profileImage, setProfileImage] = useState();

  const getProfile = async () => {
    try {
      // Kakao SDK API를 이용해 사용자 정보 획득
      let data = await window.Kakao.API.request({
        url: "/v2/user/me",
      });
      // 사용자 정보 변수에 저장
      setUserId(data.id);
      setNickName(data.properties.nickname);
      setProfileImage(data.properties.profile_image);
    } catch (err) {
      console.log(err);
    }
  };

  //주소 불러오기
  const { state, city } = address;

  //submit 이벤트 핸들러
  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(__kakaoState(input));
    //alert("회원가입 완료");
    //navigate("/");
  };
  //input 이벤트 핸들러
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <h2>{user_id}</h2>
          <h2>{nickName}</h2>
          <img src={profileImage}></img>
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
    </div>
  );
};

export default State;
