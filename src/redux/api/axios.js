import axios from "axios";
import storage from "redux-persist/lib/storage";

export const client = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
  withCredentials: true,
});

export const ChatAPI = {
  getState: (roomId) => client.post("api/chat/state", roomId),
  getSenderInfo: (roomId) => client.post("/api/chat/info", roomId),
  postImage: (formData) => client.post("api/chat/image", formData),
  patchScore: (userId) => client.patch(`api/score/${userId}`),
};

export const PostAPI = {
  postCreate: (formData) => client.post("/api/post", formData),
  postUpdate: (id, data) => client.put(`api/post/${id}`, data),
  postDelete: (id) => client.delete(`api/post/${id}`),
  postZZim: (id) => client.post(`api/wish/${id}`),
  postDeadLine: (id, isDeadLine) =>
    client.put(`api/post/deadLine/${id}`, isDeadLine),
  getAllFalse: (payload, searchValue) =>
    client.get(
      `api/post/all-location?q=${payload}&category=&search=${searchValue}`
    ),
  // getAllFalse: (searchValue) =>
  //   client.get(`api/post/all-location?category=&search=${searchValue}`),
  getHelpeeFalse: (searchValue) =>
    client.get(`api/post/all-location?category=1&search=${searchValue}`),
  getHelperFalse: (searchValue) =>
    client.get(`api/post/all-location?category=2&search=${searchValue}`),
  getHelpUsFalse: (searchValue) =>
    client.get(`api/post/all-location?category=3&search=${searchValue}`),
  getAllTrue: (searchValue) =>
    client.get(`api/post/my-location?category=&search=${searchValue}`),
  getHelpeeTrue: (searchValue) =>
    client.get(`api/post/my-location?category=1&search=${searchValue}`),
  getHelperTrue: (searchValue) =>
    client.get(`api/post/my-location?category=2&search=${searchValue}`),
  getHelpUsTrue: (searchValue) =>
    client.get(`api/post/my-location?category=3&search=${searchValue}`),

  getAllPost: (id) => client.get(`/api/post?lastId=${id}`),
  getDetailPost: (postId) => client.get(`/api/post/${postId}`),
  putPost: (postId, formData) => client.put(`/api/post/${postId}`, formData),
  deletePost: (postId) => client.delete(`/api/post/${postId}`),
  postReport: (userId, type, reason) =>
    client.post(`/api/report/${userId}`, type, reason),
  postWishList: (postId) => client.post(`/api/board/post/${postId}/wish`),
  postSearch: () => client.post("/api/search"),
  getSearch: (keyword, type, location) =>
    client.get(`/api/search?keyword=${keyword}&type=${type}`),
};

export const UserAPI = {
  kakaoLogin: (code) => client.get(`/api/user/kakao?code=${code}`),
  kakaoState: (payload) => client.post("/api/user/kakao/state", payload),
  emailCheck: (email) => client.post("/api/user/email", { email }),
  signUp: (formData) => client.post("/api/user/signup", formData),
  login: (loginData) => client.post("/api/user/login", loginData),
  logout: () => client.delete("/api/token"),
  kakaoSignOut: () => client.delete("/api/user/delete/kakao"),
  signOut: () => client.delete("/api/user/delete"),
  patchMypage: (userData) => client.patch("api/user/detail", userData),
  userImage: (formData) => client.patch("api/user/image", formData),
};

export const MypageAPI = {
  getMyPage: () => client.get("/api/user/detail"),
  getMyposts: (count) => client.get(`/api/user/myposts?q=${count}`),
  getWishlist: () => client.get("/api/user/wishlist"),
  getChat: () => client.get("api/chat/list"),
  patchPassword: (changePassword) =>
    client.patch("api/user/password", changePassword),
  getUserPage: (userId) => client.get(`/api/user/${userId}/detail`),
};

client.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return error;
  }
);

client.interceptors.response.use(
  function (response) {
    return response;
  },

  async function (error) {
    if (error.response.data.errorMessage === "토큰 재발급 필요") {
      await client.get("api/token");
      client.request(error.config);
      return;
    } else if (error.response.data.errorMessage === "토큰 없음. 로그인 필요") {
      storage.removeItem("persist:root");
      window.alert("로그인이 필요한 기능입니다.");
      window.location.replace("/login");
    } else if (
      error.response.data.errorMessage === "리프레시 토큰 만료, 로그인 필요"
    ) {
      await client.delete("api/token");
      storage.removeItem("persist:root");
      window.alert("로그인이 필요한 기능입니다.");
      window.location.replace("/login");
    } else return error;
  }
);
