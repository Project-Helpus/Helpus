import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __kakaoState } from "../../redux/modules/userSlice";
import styled from "styled-components";
import { useNavigate } from "react-router";

const State = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { kakaoInfo } = useSelector((state) => state.userSlice);
  console.log("🚀 ~ file: State.jsx:11 ~ State ~ kakaoInfo", kakaoInfo);
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
            setState1(result[0].road_address.address_name.split(" ")[0]);
            setState2(result[0].road_address.region_2depth_name);
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
    const paylode = {
      userId: kakaoInfo?.userid,
      state1: state1,
      state2: state2,
    };
    dispatch(__kakaoState(paylode));
    alert("가입완료");
    navigate("/");
  };

  return (
    <StProfile>
      <form onSubmit={submitHandler}>
        <button onClick={currentLocation}>내 위치 찾기</button>
        <div>
          <img src={kakaoInfo?.userImage} alt="" />
        </div>
        <div>
          {state1}
          {state2}
        </div>
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
    border: 2px solid #efefef;
    border-radius: 100%;
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
