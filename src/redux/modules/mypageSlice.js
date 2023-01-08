import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MypageAPI, PostAPI } from "../../api/axios";

const initialState = {};

export const __getMyPage = createAsyncThunk(
  "mypage/getMyPage",
  async (data, thunkAPI) => {
    try {
      const res = await MypageAPI.getMyPage(data);
      console.log("🚀 ~ file: mypageSlice.js:11 ~ res", res);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const __getAllPost = createAsyncThunk(
  "mypageSlice/getAllPost",
  async (data, thunkAPI) => {
    try {
      const res = await PostAPI.getAllPost(data);
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
      state.data = action.payload;
    },
    [__getMyPage.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default mypageSlice.reducer;
