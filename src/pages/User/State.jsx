import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __kakaoState } from "../../redux/modules/userSlice";
import styled from "styled-components";
import { useNavigate } from "react-router";
import StUserWrap from "../../components/UI/StUserWrap";
import arrow_forward_ios from "../../asset/arrow_forward_ios.svg";
import location_searching from "../../asset/location_searching.svg";

const State = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userSlice);
  const kakao = window["kakao"];
  const [state1, setState1] = useState();
  const [state2, setState2] = useState();

  const currentLocation = (event) => {
    event.preventDefault();
    // HTML5의 geolocation으로 사용할 수 있는지 확인합니다.
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude; // 위도
        const lon = position.coords.longitude; // 경도

        const locPosition = new kakao.maps.LatLng(lat, lon);
        //위도, 경도를 주소로 변환해 주는 라이브러리
        const geocoder = new kakao.maps.services.Geocoder();
        const callback = function (result, status) {
          if (status === kakao.maps.services.Status.OK) {
            setState1(result[0].address.address_name.split(" ")[0]);
            setState2(result[0].address.region_2depth_name);
          }
        };
        geocoder.coord2Address(
          locPosition.getLng(),
          locPosition.getLat(),
          callback
        );
      });
    } else {
      alert("위치정보");
    }
  };

  //submit 이벤트 핸들러
  const submitHandler = (event) => {
    event.preventDefault();
    const payload = {
      userId: userInfo?.userId,
      state1: state1,
      state2: state2,
    };
    dispatch(__kakaoState(payload));
    alert("회원 가입이 완료 되었습니다");
    navigate("/postlist");
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
      <StProfile>
        <StProfileImg src={userInfo?.userImage} alt="" />
        <form>
          <StStateBtn onClick={currentLocation}>
            <StLocation src={location_searching} alt="" />내 위치 가져오기
          </StStateBtn>
          <StStateInputWrap>
            <input type="text" value={state1 || ""} readOnly></input>
            <input type="text" value={state2 || ""} readOnly></input>
          </StStateInputWrap>
          <StSubmitBtn onClick={submitHandler}>회원가입</StSubmitBtn>
        </form>
      </StProfile>
    </StWarp>
  );
};

export default State;

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
const StProfile = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  form {
    width: 300px;
    flex-direction: column;
  }
`;
const StProfileImg = styled.img`
  width: 180px;
  height: 180px;
  border: 2px solid #efefef;
  border-radius: 100%;
`;
const StSubmitBtn = styled.button`
  margin: 16px auto;
  width: 300px;
  height: 40px;
  background-color: #ffc3d5;
  border: none;
  border-radius: 7px;
`;
const StStateBtn = styled.button`
  position: relative;
  margin: 16px auto;
  width: 300px;
  height: 40px;
  line-height: 40px;
  background-color: #c5db85;
  border: none;
  border-radius: 7px;
`;
const StLocation = styled.img`
  width: 18px;
  height: 18px;
  position: absolute;
  top: 50%;
  left: 30%;
  transform: translate(-50%, -50%);
`;
const StStateInputWrap = styled.div`
  display: flex;
  width: 100%;
  gap: 6px;
  input {
    all: unset;
    border: 1px solid #e0e0e0;
    width: 50%;
    height: 40px;
    border-radius: 7px;
    padding: 0 6px;
  }
`;
const StRadio = styled.div`
  appearance: none;
  width: 1rem;
  height: 1rem;
  border-radius: 100%;
  border: 1px solid #e0e0e0;
`;
