import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PostAPI } from '../../api/axios';
import { client } from "../../api/axios";

export const __search = createAsyncThunk(
  "mypageSlice/__search",
  async (payload, thunkAPI) => {
    try {
      console.log('서버로 search값을 전송')
      const res = PostAPI.getSearch(payload);
      console.log('search res:', res)
      return thunkAPI.fulfillWithValue(res);
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);
//    <<<<<<<  전국  >>>>>>>>
//    <  헬피 false  >
export const __getHelpeeFalse = createAsyncThunk(
  "mypageSlice/__getHelpeeFalse",
  async (payload, thunkAPI) => {
    try {
      console.log('서버야 헬피 false 주세요')
      const res = await client.get(`/api/post?category=1`);
      console.log('헬피 false res:', res)
      return thunkAPI.fulfillWithValue(res);
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);
//    <  헬퍼 false  >
export const __getHelperFalse = createAsyncThunk(
  "mypageSlice/__getHelperFalse",
  async (payload, thunkAPI) => {
    try {
      console.log('서버야 헬퍼 false 주세요')
      const res = await client.get(`/api/post?category=2`);
      console.log('헬퍼 false res:', res)
      return thunkAPI.fulfillWithValue(res);
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);
//    <  헬퍼스 false  >
export const __getHelpUsFalse = createAsyncThunk(
  "mypageSlice/__getHelpUsFalse",
  async (payload, thunkAPI) => {
    try {
      console.log('서버야 헬퍼스 false 주세요')
      const res = await client.get(`/api/post?category=3`);
      console.log('헬퍼스 false res:', res)
      return thunkAPI.fulfillWithValue(res);
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

//    <<<<<<<<  로컬  >>>>>>>>
//    <  헬피 true  >
export const __getHelpeeTrue = createAsyncThunk(
  "mypageSlice/__getHelpeeTrue",
  async (payload, thunkAPI) => {
    try {
      console.log('서버야 헬피 true 주세요')
      const res = await client.get(`/api/post/mylocation?category=1`);
      console.log('헬피 true res:', res)
      return thunkAPI.fulfillWithValue(res);
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);
//    <  헬퍼 true  >
export const __getHelperTrue = createAsyncThunk(
  "mypageSlice/__getHelperTrue",
  async (payload, thunkAPI) => {
    try {
      console.log('서버야 헬퍼 true 주세요')
      const res = await client.get(`/api/post/mylocation?category=2`);
      console.log('헬퍼 true res:', res)
      return thunkAPI.fulfillWithValue(res);
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);
//    <  헬퍼스 true  >
export const __getHelpUsTrue = createAsyncThunk(
  "mypageSlice/__getHelpUsTrue",
  async (payload, thunkAPI) => {
    try {
      console.log('서버야 헬퍼스 true 주세요')
      const res = await client.get(`/api/post/mylocation?category=3`);
      console.log('헬퍼스 true res:', res)
      return thunkAPI.fulfillWithValue(res);
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState = {
  boolHelper: false,
  boolHelpee: false,
  helpeeFalseDate: [],
  helperFalseDate: [],
  helpUsFalseDate: [],
  helpeeTrueDate: [],
  helperTrueDate: [],
  helpUsTrueDate: [],


};

const postSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {
    setBoolHelper: (state) => { state.boolHelper = true; state.boolHelpee = false; },
    setBoolHelpee: (state) => { state.boolHelpee = true; state.boolHelper = false; }
  },
  extraReducers: {
    //    <  헬피 false 가져오기  >
    [__getHelpeeFalse.pending]: (state) => { },
    [__getHelpeeFalse.fulfilled]: (state, action) => { state.helpeeFalseDate = action.payload; console.log('헬피 false 가져오기 fulfilled 성공') },
    [__getHelpeeFalse.rejected]: (state, action) => { console.log('헬피 false 가져오기 Error') },
    //    <  헬퍼 false 가져오기  >
    [__getHelperFalse.pending]: (state) => { },
    [__getHelperFalse.fulfilled]: (state, action) => { state.helperFalseDate = action.payload; console.log('헬퍼 false 가져오기 fulfilled 성공') },
    [__getHelperFalse.rejected]: (state, action) => { console.log('헬퍼 false 가져오기 Error') },
    //    <  헬퍼스 false 가져오기  >
    [__getHelpUsFalse.pending]: (state) => { },
    [__getHelpUsFalse.fulfilled]: (state, action) => { state.helpeeTrueDate = action.payload; console.log('헬퍼스 false 가져오기 fulfilled 성공') },
    [__getHelpUsFalse.rejected]: (state, action) => { console.log('헬퍼스 false 가져오기 Error') },

    //    <  헬피 true 가져오기  >
    [__getHelpeeTrue.pending]: (state) => { },
    [__getHelpeeTrue.fulfilled]: (state, action) => { state.helpeeTueDate = action.payload; console.log('헬피 true 가져오기 fulfilled 성공') },
    [__getHelpeeTrue.rejected]: (state, action) => { console.log('헬피 true 가져오기 Error') },
    //    <  헬퍼 true 가져오기  >
    [__getHelperTrue.pending]: (state) => { },
    [__getHelperTrue.fulfilled]: (state, action) => { state.helperTueDate = action.payload; console.log('헬퍼 true 가져오기 fulfilled 성공') },
    [__getHelperTrue.rejected]: (state, action) => { console.log('헬퍼 true 가져오기 Error') },
    //    <  헬퍼스 true 가져오기  >
    [__getHelpUsTrue.pending]: (state) => { },
    [__getHelpUsTrue.fulfilled]: (state, action) => { state.helpUsTrueDate = action.payload; console.log('헬퍼 true 가져오기 fulfilled 성공') },
    [__getHelpUsTrue.rejected]: (state, action) => { console.log('헬퍼 true 가져오기 Error') },

  },
});
export const { setBoolHelper, setBoolHelpee } = postSlice.actions;
export default postSlice.reducer;
