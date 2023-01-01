import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';
import NotFound from '../pages/NotFound/NotFound';
import Home from '../pages/Home/Home';
import SignUp from '../pages/User/SignUp';
import Login from '../pages/User/Login';
import Mypage from '../pages/Mypage/Mypage';
import PostList from '../pages/Post/PostList';
import PostCreate from '../pages/Post/PostCreate';
import PostDetail from '../pages/Post/PostDetail';
import Chat from '../pages/Chat/Chat';
import KakaoLogin from '../pages/User/KakaoLogin';

const Router = () => {
  return (
    <BrowserRouter>
        <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/mypage/:userid" element={<Mypage />} />
            <Route path="/auth/kakao" element={<KakaoLogin />} />
            <Route path="/postlist" element={<PostList />} />
            <Route path="/post" element={<PostCreate />} />
            <Route path="/post/:postId" element={<PostDetail />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        <Footer />
      </BrowserRouter>
  );
};

export default Router;