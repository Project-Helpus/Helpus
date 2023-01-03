import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { kakaoLogin } from "../../redux/modules/userSlice";

const REST_API_KEY = process.env.REACT_APP_KAKAO_KEY;
const KAKAO_REDIRECT_URL = process.env.REACT_APP_KAKAO_SERVER;
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URL}&response_type=code`;

const KakaoLogin = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const sendAuth = () => {
    const code = location.search.split("=")[1];
    console.log("🚀 ~ file: KakaoLogin.js:17 ~ sendAuth ~ code", code);
    dispatch(kakaoLogin(code));
  };

  useEffect(() => {
    sendAuth();
  }, []);

  return <div>로그인 중...</div>;
};

export default KakaoLogin;
