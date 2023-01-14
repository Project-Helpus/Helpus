import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MypageAPI } from "../../api/axios";

const initialState = {
  email: "",
  userName: "",
  userId: 0,
  profile: "",
  myPosts: "",
  state1: "",
  state2: "",
  userImage: "",
  score: 0,
  isLogin: false,
  error: false,
  isLoading: false,
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
      return thunkAPI.fulfillWithValue(res.data);
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

// 내가 찜한 게시글 조회
export const __getWishlist = createAsyncThunk(
  "mypage/getWishlist",
  async (data, thunkAPI) => {
    try {
      const res = await MypageAPI.getWishlist(data);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

// 마이페이지 프로필 수정
export const __patchMypage = createAsyncThunk(
  "mypage/patchMypage",
  async (data, thunkAPI) => {
    try {
      const res = await MypageAPI.patchMypage(data);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

// 마이페이지 프로필 이미지 수정
export const __userImage = createAsyncThunk(
  "mypage/userImage",
  async (data, thunkAPI) => {
    try {
      const res = await MypageAPI.userImage(data);
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

const mypageSlice = createSlice({
  name: "mypageSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [__getMyPage.pending]: (state) => {
      state.isLoading = true;
    },
    [__getMyPage.fulfilled]: (state, action) => {
      state.profile = action.payload;
    },
    [__getMyPage.rejected]: (state) => {
      state.isLoading = false;
    },
    [__getMyposts.pending]: (state) => {
      state.isLoading = true;
    },
    [__getMyposts.fulfilled]: (state, action) => {
      state.myPosts = action.payload;
    },
    [__getMyposts.rejected]: (state) => {
      state.isLoading = false;
    },
    [__getWishlist.pending]: (state) => {
      state.isLoading = true;
    },
    [__getWishlist.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
    [__getWishlist.rejected]: (state) => {
      state.isLoading = false;
    },
    [__patchMypage.pending]: (state) => {
      state.isLoading = true;
    },
    [__patchMypage.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
    [__patchMypage.rejected]: (state) => {
      state.isLoading = false;
    },
    [__userImage.pending]: (state) => {
      state.isLoading = true;
    },
    [__userImage.fulfilled]: (state, action) => {
      state.userImage = action.payload;
    },
    [__userImage.rejected]: (state) => {
      state.isLoading = false;
    },
    [__patchPassword.pending]: (state) => {
      state.isLoading = true;
    },
    [__patchPassword.fulfilled]: (state, action) => {
      state.patchPassword = action.payload;
    },
    [__patchPassword.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default mypageSlice.reducer;
