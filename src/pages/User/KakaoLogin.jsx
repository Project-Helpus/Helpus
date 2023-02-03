import React from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { __kakaoLogin } from "../../redux/modules/userSlice";

const REST_API_KEY = process.env.REACT_APP_KAKAO_KEY;
const KAKAO_REDIRECT_URL = process.env.REACT_APP_KAKAO_SERVER;
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URL}&response_type=code`;

const KakaoLogin = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  //카카오 인가코드 보내기
  const sendAuth = async () => {
    const code = location.search.split("=")[1];
    const res = await dispatch(__kakaoLogin(code));
    if (res.payload.state1 === null && res.payload.state2 === null) {
      navigate("/auth/kakao/state");
    } else {
      navigate("/postlist");
    }
  };

  useEffect(() => {
    sendAuth();
  }, []);

  return <div>로그인 중...</div>;
};

export default KakaoLogin;
