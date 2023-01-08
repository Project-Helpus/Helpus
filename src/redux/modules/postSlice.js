import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PostAPI } from '../../api/axios';
import { client } from "../../api/axios";
import axios from "axios";
import { Cookies } from "react-cookie";

const cookie = new Cookies();

export const __createPost = createAsyncThunk(
  async (formData, thunkAPI) => {
    try {
      console.log('작동중')
      const response = await PostAPI.postCreate(formData);
      console.log(response);
      return thunkAPI.fulfillWithValue();
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

// export const __searchFalse = createAsyncThunk(
//   "mypageSlice/__searchFalse",
//   async (payload, thunkAPI) => {
//     try {
//       console.log('서버로 전국search값을 전송')
//       // const res = PostAPI.getSearch(payload);
//       const res = await axios.get(`http://idlefanpage.shop/api/post/all-location?categoty=&search=${payload}`);
//       console.log('search res:', res)
//       return thunkAPI.fulfillWithValue(res.data);
//     } catch (err) {
//       return thunkAPI.rejectWithValue();
//     }
//   }
// );
//    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<  전국  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//    <  전국 false  >
export const __getAllFalse = createAsyncThunk(
  "mypageSlice/getAllFalse",
  async (payload, thunkAPI) => {
    try {
      // console.log("서버야 전체게시물 false 주세요");
      // const res = await client.get("/api/post");
      const res = await axios.get(`https://helpus-api.shop/api/post/all-location`);
      // const res = await axios.get("http://43.201.70.95/api/post/all-location");
      // const res = await axios.get("http://13.209.80.182/api/post/all-location");
      // console.log("전체 false res:", res);
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
      const res = await axios.get(`https://helpus-api.shop/api/post/all-location?category=1/`);
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
      const res = await axios.get(`https://helpus-api.shop/api/post/all-location?category=2`);

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
      const res = await axios.get(`https://helpus-api.shop/api/post/all-location?category=3`);
      // const res = await axios.get(`http://43.201.70.95/api/post/all-location?category=3&${payload}`);
      console.log('헬퍼스 false res:', res)
      return thunkAPI.fulfillWithValue(res.data);
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);
//    < search false  >
export const __searchFalse = createAsyncThunk(
  "mypageSlice/__searchFalse",
  async (payload, thunkAPI) => {
    try {
      console.log('서버로 전국search값을 전송')
      // const res = PostAPI.getSearch(payload);
      const res = await axios.get(`https://helpus-api.shop/api/post/all-location?categoty=&search=${payload}`);
      console.log('search res:', res)
      return thunkAPI.fulfillWithValue(res.data);
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);


//    <<<<<<><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<  로컬  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.
//    <  search true  >
export const __searchTrue = createAsyncThunk(
  "mypageSlice/__searchTrue",
  async (payload, thunkAPI) => {
    try {
      console.log("서버야 전국 검색 true 주세요");
      const res = await axios.get(
        `https://helpus-api.shop/api/post/my-location?category=$&search=${payload}`,
        {
          headers: { Authorization: `Bearer ${cookie.get("token")}` },
        })
      // const res = await axios.get(`http://43.201.70.95/api/post/my-location?category=0&${payload}`);
      // const res = await axios.get("http://13.209.80.182/api/post/all-location");
      console.log("전국 검색 false res:", res);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);
//    <  전체 게시물 true  >
export const __getAllTrue = createAsyncThunk(
  "mypageSlice/getAllTrue",
  async (payload, thunkAPI) => {
    try {
      // console.log("서버야 전체게시물 True 주세요");
      const res = await axios.get(
        `https://helpus-api.shop/api/post/my-location`,
        { headers: { Authorization: `Bearer ${cookie.get("token")}` }, }
      );
      // console.log("전체 True res:", res);
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
      const res = await axios.get(`https://helpus-api.shop/api/post/my-location?category=1`,
        { headers: { Authorization: `Bearer ${cookie.get('token')}` } });
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
      const res = await axios.get(`https://helpus-api.shop/api/post/my-location?category=2`,
        { headers: { Authorization: `Bearer ${cookie.get('token')}` } });
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
    try {
      console.log('서버야 헬퍼스 true 주세요')
      const res = await axios.get(`https://helpus-api.shop/api/post/my-location?category=3`,
        { headers: { Authorization: `Bearer ${cookie.get('token')}` } });
      // headers.authorization = `Bearer ${cookie.get("token")}`
      console.log('헬퍼스 true res:', res)
      return thunkAPI.fulfillWithValue(res.data);
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState = {
  isLoading: false,
  error: false,
  boolHelper: false,
  boolHelpee: false,
  boolAll: false,
  searched: false,
  boolLocation: false,
  AllFalseDate: [],
  helpeeFalseDate: [],
  helperFalseDate: [],
  helpUsFalseDate: [],
  AllTrueDate: [],
  helpeeTrueDate: [],
  helperTrueDate: [],
  helpUsTrueDate: [],
  searchFalse: [],
  searchTrue: [],


};

const postSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {
    setBoolHelper: (state) => { state.boolHelper = true; state.boolHelpee = false; state.boolAll = false; },
    setBoolHelpee: (state) => { state.boolHelpee = true; state.boolHelper = false; state.boolAll = false; },
    setBoolLocationTrue: (state) => { state.boolLocation = true; console.log('작동') },
    setBoolLocationFalse: (state) => { state.boolLocation = false; console.log('작동') },
  },
  extraReducers: {
    [__createPost.pending]: state => {
      state.isLoading = true;
    },
    [__createPost.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [__createPost.rejected]: state => {
      state.isLoading = false;
      state.error = true;
    },

    //    <<<<<<<<<<<<<<<<<<  전체 false 가져오기  >>>>>>>>>>>>>>>>>>>>>
    [__getAllFalse.pending]: (state) => { },
    [__getAllFalse.fulfilled]: (state, action) => { state.AllFalseDate = action.payload; },
    [__getAllFalse.rejected]: (state, action) => { console.log('전체 false 가져오기 Error') },

    //    <  헬피 false 가져오기  >
    [__getHelpeeFalse.pending]: (state) => { },
    [__getHelpeeFalse.fulfilled]: (state, action) => { state.helpeeFalseDate = action.payload; },
    [__getHelpeeFalse.rejected]: (state, action) => { console.log('헬피 false 가져오기 Error') },
    //    <  헬퍼 false 가져오기  >
    [__getHelperFalse.pending]: (state) => { },
    [__getHelperFalse.fulfilled]: (state, action) => { state.helperFalseDate = action.payload; },
    [__getHelperFalse.rejected]: (state, action) => { console.log('헬퍼 false 가져오기 Error') },
    //    <  헬퍼스 false 가져오기  >
    [__getHelpUsFalse.pending]: (state) => { },
    [__getHelpUsFalse.fulfilled]: (state, action) => { state.helpUsFalseDate = action.payload; },
    [__getHelpUsFalse.rejected]: (state, action) => { console.log('헬퍼스 false 가져오기 Error') },
    //    < search false 가져오기  >
    [__searchFalse.pending]: (state) => { },
    [__searchFalse.fulfilled]: (state, action) => { state.searchFalse = action.payload; state.searched = true; console.log('search false 가져오기 fulfilled 성공') },
    [__searchFalse.rejected]: (state, action) => { console.log('search false 가져오기 Error') },




    //    <<<<<<<<<<<<<<<<<<  전체 true 가져오기  >>>>>>>>>>>>>>>>>>>>>
    [__getAllTrue.pending]: (state) => { },
    [__getAllTrue.fulfilled]: (state, action) => { state.AllTrueDate = action.payload; console.log('전체 true 가져오기 fulfilled 성공') },
    [__getAllTrue.rejected]: (state, action) => { console.log('전체 true 가져오기 Error') },
    //    <  헬피 true 가져오기  >
    [__getHelpeeTrue.pending]: (state) => { },
    [__getHelpeeTrue.fulfilled]: (state, action) => { state.helpeeTrueDate = action.payload; console.log('헬피 true 가져오기 fulfilled 성공') },
    [__getHelpeeTrue.rejected]: (state, action) => { console.log('헬피 true 가져오기 Error') },
    //    <  헬퍼 true 가져오기  >
    [__getHelperTrue.pending]: (state) => { },
    [__getHelperTrue.fulfilled]: (state, action) => { state.helperTrueDate = action.payload; console.log('헬퍼 true 가져오기 fulfilled 성공') },
    [__getHelperTrue.rejected]: (state, action) => { console.log('헬퍼 true 가져오기 Error') },
    //    <  헬퍼스 true 가져오기  >
    [__getHelpUsTrue.pending]: (state) => { },
    [__getHelpUsTrue.fulfilled]: (state, action) => { state.helpUsTrueDate = action.payload; console.log('헬퍼 true 가져오기 fulfilled 성공') },
    [__getHelpUsTrue.rejected]: (state, action) => { console.log('헬퍼 true 가져오기 Error') },
    //    < search true 가져오기  >
    [__searchTrue.pending]: (state) => { },
    [__searchTrue.fulfilled]: (state, action) => { state.searchTrue = action.payload; state.searched = true; console.log('search true 가져오기 fulfilled 성공') },
    [__searchTrue.rejected]: (state, action) => { console.log('search true 가져오기 Error') },

  },
});
export const { setBoolHelper, setBoolHelpee, setBoolLocationTrue, setBoolLocationFalse } = postSlice.actions;
export default postSlice.reducer;
