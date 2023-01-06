import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PostAPI } from '../../api/axios';
import { client } from "../../api/axios";
import axios from "axios";
import { Cookies } from "react-cookie";

const cookie = new Cookies();

export const __searchFalse = createAsyncThunk(
  "mypageSlice/__searchFalse",
  async (payload, thunkAPI) => {
    try {
      console.log('서버로 전국search값을 전송')
      // const res = PostAPI.getSearch(payload);
      const res = await axios.get(`http://43.201.70.95/api/post/all-location?categoty=`);
      console.log('search res:', res)
      return thunkAPI.fulfillWithValue(res.data);
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);
//    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<  전국  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//    <  전국 false  >
export const __getAllFalse = createAsyncThunk(
  "mypageSlice/getAllFalse",
  async (payload, thunkAPI) => {
    try {
      console.log("서버야 전체게시물 false 주세요");
      // const res = await client.get("/api/post");
      const res = await axios.get(`http://idlefanpage.shop/api/post/all-location`);
      // const res = await axios.get("http://43.201.70.95/api/post/all-location");
      // const res = await axios.get("http://13.209.80.182/api/post/all-location");
      console.log("전체 false res:", res);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

//    <  헬피 false  >
export const __getHelpeeFalse = createAsyncThunk(
  "mypageSlice/__getHelpeeFalse",
  async (payload, thunkAPI) => {
    try {
      console.log('서버야 헬피 false 주세요')
      const res = await axios.get(`http://idlefanpage.shop/api/post/all-location?category=1/`);
      // const res = await axios.get(`http://43.201.70.95/api/post/all-location?category=1`);
      console.log('헬피 false res:', res)
      return thunkAPI.fulfillWithValue(res.data);
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
      const res = await axios.get(`http://idlefanpage.shop/api/post/all-location?category=2/`);
      // const res = await axios.get(`http://43.201.70.95/api/post/all-location?category=2`);
      console.log('헬퍼 false res:', res)
      return thunkAPI.fulfillWithValue(res.data);
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
      const res = await axios.get(`http://idlefanpage.shop/api/post/all-location?category=3&${payload}/`);
      // const res = await axios.get(`http://43.201.70.95/api/post/all-location?category=3&${payload}`);
      console.log('헬퍼스 false res:', res)
      return thunkAPI.fulfillWithValue(res.data);
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);


//    <<<<<<><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<  로컬  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.
//    <  전체 게시물 search  >
export const __searchTrue = createAsyncThunk(
  "mypageSlice/__searchTrue",
  async (payload, thunkAPI) => {
    try {
      console.log("서버야 전체게시물 false 주세요");
      const res = await axios.get(`http://idlefanpage.shop/api/post/my-location?category/`);
      // const res = await axios.get(`http://43.201.70.95/api/post/my-location?category=0&${payload}`);
      // const res = await axios.get("http://13.209.80.182/api/post/all-location");
      console.log("전체 false res:", res);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);
//    <  전체 게시물 true  >
export const __getAllTrue = createAsyncThunk(
  "mypageSlice/__getAllTrue",
  async (payload, thunkAPI) => {
    try {
      console.log('서버야 전체게시물 True 주세요')
      const res = await axios.get(`http://idlefanpage.shop/api/post/my-location/`, '',
        { header: { Authorization: `Bearer ${cookie.get('token')}` } });
      console.log('전체 True res:', res)
      return thunkAPI.fulfillWithValue(res.data);
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);
//    <  헬피 true  >
export const __getHelpeeTrue = createAsyncThunk(
  "mypageSlice/__getHelpeeTrue",
  async (payload, thunkAPI) => {
    try {
      console.log('서버야 헬피 true 주세요')
      const res = await axios.get(`http://idlefanpage.shop/api/post/my-location?category=1/`, '',
        { Header: { Authorization: `Bearer ${cookie.get('token')}` } });
      console.log('헬피 true res:', res)
      return thunkAPI.fulfillWithValue(res.data);
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
      const res = await axios.get(`http://idlefanpage.shop/api/post/my-location?category=2/`, '',
        { Header: { Authorization: `Bearer ${cookie.get('token')}` } });
      console.log('헬퍼 true res:', res)
      return thunkAPI.fulfillWithValue(res.data);
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);
//    <  헬퍼스 true  >
export const __getHelpUsTrue = createAsyncThunk(
  "mypageSlice/__getHelpUsTrue",
  async (payload, thunkAPI) => {
    const cookie = new Cookies();
    try {
      console.log('서버야 헬퍼스 true 주세요')
      const res = await axios.get(`http://idlefanpage.shop/api/post/my-location?category=3/`, '',
        { headers: { authorization: `Bearer ${cookie.get('token')}` } });
      // headers.authorization = `Bearer ${cookie.get("token")}`
      console.log('헬퍼스 true res:', res)
      return thunkAPI.fulfillWithValue(res.data);
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState = {
  boolHelper: false,
  boolHelpee: false,
  boolAll: false,
  AllFalseDate: [],
  helpeeFalseDate: [],
  helperFalseDate: [],
  helpUsFalseDate: [],
  AllTrueDate: [],
  helpeeTrueDate: [],
  helperTrueDate: [],
  helpUsTrueDate: [],


};

const postSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {
    setBoolHelper: (state) => { state.boolHelper = true; state.boolHelpee = false; state.bollAll = false; },
    setBoolHelpee: (state) => { state.boolHelpee = true; state.boolHelper = false; state.bollAll = false; }
  },
  extraReducers: {
    //    <  전체 false 가져오기  >
    [__getAllFalse.pending]: (state) => { },
    [__getAllFalse.fulfilled]: (state, action) => { state.AllFalseDate = action.payload; console.log('전체 false 가져오기 fulfilled 성공') },
    [__getAllFalse.rejected]: (state, action) => { console.log('전체 false 가져오기 Error') },

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
    [__getHelpUsFalse.fulfilled]: (state, action) => { state.helpUsFalseDate = action.payload; console.log('헬퍼스 false 가져오기 fulfilled 성공') },
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
