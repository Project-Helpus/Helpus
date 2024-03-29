import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NotFound from "../pages/NotFound/NotFound";
import Home from "../pages/Home/Home";
import SignUp from "../pages/User/SignUp";
import Login from "../pages/User/Login";
import Mypage from "../pages/Mypage/Mypage";
import PostList from "../pages/Post/PostList";
import PostCreate from "../pages/Post/PostCreate";
import PostDetail from "../pages/Post/PostDetail";
import OpenChat from "../pages/Chat/OpenChat";
import MyChat from "../pages/Chat/ MyChat";
import KakaoLogin from "../pages/User/KakaoLogin";
import MypageDetail from "../pages/Mypage/MypageDetail";
import State from "../pages/User/State";
import PostUpdate from "../pages/Post/PostUpdate";
import MypagePostsDetail from "../pages/Mypage/MypagePostsDetail";
import MypageWishList from "../pages/Mypage/MypageWishList";
import StopService from "../pages/NotFound/StopService";

const Router = () => {
  const isStopService = true;
  return (
    <BrowserRouter>
      {!isStopService && <Header />}
      <Routes>
        {!isStopService ? <Route path="/" element={<Home />} /> : <Route path="/" element={<StopService />} />}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/mypage/detail" element={<MypageDetail />} />
        <Route path="/mypage/myposts" element={<MypagePostsDetail />} />
        <Route path="/mypage/mywish" element={<MypageWishList />} />
        <Route path="/auth/kakao" element={<KakaoLogin />} />
        <Route path="/auth/kakao/state" element={<State />} />
        <Route path="/postlist" element={<PostList />} />
        <Route path="/post" element={<PostCreate />} />
        <Route path="/post/:postId" element={<PostDetail />} />
        <Route path="/mypage/chat/:roomId" element={<MyChat />} />
        <Route path="/post/update/:postId" element={<PostUpdate />} />
        <Route path="/chat/:postId/:ownerId" element={<OpenChat />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
