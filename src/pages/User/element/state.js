import { useState } from "react";

const state = () => {
  const kakao = window["kakao"];
  const [state1, setState1] = useState();
  const [state2, setState2] = useState();

  const currentLocation = () => {
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
    return [currentLocation, state1, state2];
  };
};

export default state;
