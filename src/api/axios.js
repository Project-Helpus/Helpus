import axios from "axios";
import { Cookies } from "react-cookie";
const cookie = new Cookies();

export const client = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
});

export const ChatAPI = {
  // ChatAPI
};

export const PostAPI = {
  postCreate: (formData) => client.post("/api/post", formData),
  getAllPost: (id) => client.get(`/api/post?lastId=${id}`),
  getDetailPost: (postId) => client.get(`/api/post/${postId}`),
  putPost: (postId, formData) => client.put(`/api/post/${postId}`, formData),
  deletePost: (postId) => client.delete(`/api/post/${postId}`),
  postReport: (userId, type, reason) =>
    client.post(`/api/report/${userId}`, type, reason),
  postWishList: (postId) => client.post(`/api/board/post/${postId}/wish`),
  // 검색 확정되면 재 확인 필요
  postSearch: () => client.post("/api/search"),
  getSearch: (keyword, type, location) =>
    client.get(`/api/search?keyword=${keyword}&type=${type}`),
};

export const UserAPI = {
  kakaoLogin: (code) => client.get(`/api/user/kakao?code=${code}`),
  kakaoState: (payload) => client.post(`/api/user/kakao/state`, payload),
  emailCheck: (email) => client.post(`/api/user/email`, { email }),
  signUp: (formData) => client.post("/api/user/signup", formData),
  login: (loginData) => client.post("/api/user/login", loginData),
};

export const MypageAPI = {
  getMyPage: () => client.get("/api/user/detail"),
  getMyposts: () => client.get("/api/user/myposts"),
  getWishlist: () => client.get("/api/user/wishlist"),
  patchMypage: (userData) => client.patch("api/user/detail", userData),
  userImage: (formData) => client.patch("api/user/image", formData),
  patchPassword: (changePassword) =>
    client.patch("api/user/password", changePassword),
  getUserPage: (userId) => client.get(`/api/user/${userId}/detail`),
};

client.interceptors.request.use(
  function (config) {
    if (cookie.get("token")) {
      config.headers.authorization = `Bearer ${cookie.get("token")}`;
    }
    return config;
  },
  function (error) {
    return error;
  }
);

client.interceptors.response.use(
  function (response) {
    if (response.data.token) {
      cookie.set("token", response.data.token, { path: "/" });
    }
    return response;
  },

  function (error) {
    if (error?.response.status === 401) {
      cookie.remove("token", { path: "/" });
      return error;
    }
    return error;
  }
);
