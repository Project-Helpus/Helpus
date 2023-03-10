import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MypageAPI } from "../api/axios";

const initialState = {
  profile: "",
  myPosts: [],
  isLogin: false,
  error: false,
  isLoading: false,
  isPostLoading: false,
  postCount: 0,
  data: "",
  chatList: "",
  wish: [],
  dataLength: [],
};

//프로필 조회
export const __getMyPage = createAsyncThunk(
  "mypageSlice/getMyPage",
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
  "mypageSlice/getMyposts",
  async (data, thunkAPI) => {
    try {
      const res = await MypageAPI.getMyposts(data);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

//비밀번호 수정
export const __patchPassword = createAsyncThunk(
  "mypageSlice/patchPassword",
  async (data, thunkAPI) => {
    try {
      const res = await MypageAPI.patchPassword(data);
      if (res.status === 200) {
        window.alert("비밀번호 수정이 완료됐습니다.");
        return thunkAPI.fulfillWithValue(res.data);
      } else {
        return thunkAPI.rejectWithValue();
      }
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

//채팅 목록 조회
export const __getChat = createAsyncThunk(
  "mypageSlice/getChat",
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
      state.isPostLoading = true;
    },
    [__getMyposts.fulfilled]: (state, action) => {
      state.isPostLoading = false;
      state.myPosts = action.payload.result;
    },
    [__getMyposts.rejected]: (state) => {
      state.isPostLoading = false;
    },

    //내 채팅 목록 조회
    [__getChat.pending]: (state) => {
      state.isLoading = true;
    },
    [__getChat.fulfilled]: (state, action) => {
      state.chatList = action.payload;
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
