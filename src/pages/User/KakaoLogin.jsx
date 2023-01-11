import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { __kakaoLogin } from "../../redux/modules/userSlice";

const REST_API_KEY = process.env.REACT_APP_KAKAO_KEY;
const KAKAO_REDIRECT_URL = process.env.REACT_APP_KAKAO_SERVER;
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URL}&response_type=code`;

const KakaoLogin = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const kakaoInfo = useSelector((state) => state.userSlice);
  const sendAuth = () => {
    const code = location.search.split("=")[1];
    dispatch(__kakaoLogin(code));
  };

  useEffect(() => {
    sendAuth();
  }, []);

  return <div>로그인 중...</div>;
};

export default KakaoLogin;
