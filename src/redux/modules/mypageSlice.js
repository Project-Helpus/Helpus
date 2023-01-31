import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MypageAPI } from "../../api/axios";

const initialState = {
  profile: "",
  myPosts: "",
  isLogin: false,
  error: false,
  isLoading: false,
  data: "",
  chatList: "",
  wish: [],
  dataLength: "",
};

//프로필 조회
export const __getMyPage = createAsyncThunk(
  "mypage/getMyPage",
  async (data, thunkAPI) => {
    try {
      const res = await MypageAPI.getMyPage(data);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

// 내 게시글 조회
export const __getMyposts = createAsyncThunk(
  "mypage/getMyposts",
  async (data, thunkAPI) => {
    try {
      const res = await MypageAPI.getMyposts(data);
      console.log("🚀 ~ file: mypageSlice.js:35 ~ res", res);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

//비밀번호 수정
export const __patchPassword = createAsyncThunk(
  "mypage/patchPassword",
  async (data, thunkAPI) => {
    try {
      const res = await MypageAPI.patchPassword(data);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

//채팅 목록 조회
export const __getChat = createAsyncThunk(
  "mypage/getChat",
  async (data, thunkAPI) => {
    try {
      const res = await MypageAPI.getChat(data);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

//찜한 게시물
export const __getWishPost = createAsyncThunk(
  "mypageSlice/getWishPost",
  async (data, thunkAPI) => {
    try {
      const res = await MypageAPI.getWishlist(data);
      console.log("🚀 ~ file: mypageSlice.js:74 ~ res", res);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

const mypageSlice = createSlice({
  name: "mypageSlice",
  initialState,
  reducers: {},
  extraReducers: {
    //마이페이지 조회
    [__getMyPage.pending]: (state) => {
      state.isLoading = true;
    },
    [__getMyPage.fulfilled]: (state, action) => {
      state.profile = action.payload;
    },
    [__getMyPage.rejected]: (state) => {
      state.isLoading = false;
    },
    //내 게시물 조회
    [__getMyposts.pending]: (state) => {
      state.isLoading = true;
    },
    [__getMyposts.fulfilled]: (state, action) => {
      state.myPosts = action.payload;
      console.log("🚀 ~ file: mypageSlice.js:104 ~ myPosts", state.myPosts);
      state.isLoading = false;
      // state.dataLength = action.payload.result.length;
      // if (state.dataLength !== 0) {
      //   state.myPosts = [...state.myPosts, ...action.payload.result];
      // }
    },
    [__getMyposts.rejected]: (state) => {
      state.isLoading = false;
    },

    //내 채팅 목록 조회
    [__getChat.pending]: (state) => {
      state.isLoading = true;
    },
    [__getChat.fulfilled]: (state, action) => {
      state.chatList = action.payload;
      console.log("🚀 ~ file: mypageSlice.js:121 ~ chatList", state.chatList);
    },
    [__getChat.rejected]: (state) => {
      state.isLoading = false;
    },

    //패스워드 수정
    [__patchPassword.pending]: (state) => {
      state.isLoading = true;
    },
    [__patchPassword.fulfilled]: (state, action) => {
      state.patchPassword = action.payload;
    },
    [__patchPassword.rejected]: (state) => {},

    //찜한 게시물
    [__getWishPost.pending]: (state) => {
      state.isLoading = true;
    },
    [__getWishPost.fulfilled]: (state, action) => {
      state.wish = action.payload;
    },
    [__getWishPost.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default mypageSlice.reducer;
