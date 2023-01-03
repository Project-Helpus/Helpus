import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MypageAPI } from '../../api/axios';

//    <  헬퍼 조회하기  >
export const __getHelper = createAsyncThunk(
  "mypageSlice/getHelper",
  async (payload, thunkAPI) => {
    console.log('헬퍼 조회 서버 통신전')
    try {
      const res = await MypageAPI.getHelper();
      console.log('헬퍼 res:', res)
      return thunkAPI.fulfillWithValue(res);
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  });

//    <  헬피 조회하기  >
export const __getHelpee = createAsyncThunk(
  "mypageSlice/getHelper",
  async (payload, thunkAPI) => {
    console.log('헬피 조회 서버 통신전')
    try {
      const res = await MypageAPI.getHelpee();
      console.log('헬피 res:', res)
      return thunkAPI.fulfillWithValue(res);
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  });


const initialState = {};

const mypageSlice = createSlice({
  name: "mypageSlice",
  initialState,
  reducers: {},
  extraReducers: {
    //    <  헬퍼 가져오기  >
    [__getHelper.pending]: (state) => { },
    [__getHelper.fulfilled]: (state, action) => { state.wishData = action.payload; console.log('헬퍼 가져오기 fulrilled 성공') },
    [__getHelper.rejected]: (state, action) => { console.log('헬퍼 가져오기 Error') },

    //    <  헬피 가져오기  >
    [__getHelpee.pending]: (state) => { },
    [__getHelpee.fulfilled]: (state, action) => { state.wishData = action.payload; console.log('헬pee 가져오기 fulrilled 성공') },
    [__getHelpee.rejected]: (state, action) => { console.log('헬pee 가져오기 Error') },
  },
});

export default mypageSlice.reducer;
