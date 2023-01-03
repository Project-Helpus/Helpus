import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserAPI } from "../../api/axios";

const initialState = {
  email: "",
  userName: "",
  password: "",
  isConfirm: false,
  dupCheck: false,
  isLoading: false,
  state1: "",
  state2: "",
  error: false,
  isLogin: false,
  isSignup: false,
};

//회원가입 post
export const __signUp = createAsyncThunk(
  "user/signUp",
  async (payload, thunkAPI) => {
    try {
      const res = await UserAPI.signUp(payload);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      window.alert("회원가입에 실패했습니다.");
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// ID 중복확인 POST
export const __postDupEmail = createAsyncThunk(
  "user/dupEmail",
  async (payload, thunkAPI) => {
    try {
      const res = await UserAPI.emailCheck(payload);
      if (res.status === 200) {
        window.alert("사용 가능한 ID입니다.");
        return thunkAPI.fulfillWithValue(res.data);
      } else {
        window.alert("중복된 ID가 있습니다.");
        return thunkAPI.rejectWithValue("1");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//로그인 POST
export const __postLogin = createAsyncThunk(
  "user/postLogin",
  async (payload, thunkAPI) => {
    try {
      const res = await UserAPI.login(payload);
      console.log("🚀 ~ file: userSlice.js:56 ~ res", res);
      //window.alert("로그인 성공!");
      //window.location.replace("/");
      return thunkAPI.fulfillWithValue(res.data.accessToken);
    } catch (error) {
      window.alert("가입하신 이메일, 비밀번호와 다릅니다!!");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//카카오 로그인 post
export const kakaoLogin = createAsyncThunk(
  "signSlice/kakaoLogin",
  async (code, thunkAPI) => {
    try {
      const response = await UserAPI.kakaoLogin(code);
      console.log("🚀 ~ file: userSlice.js:72 ~ response", response);
      if (response.status === 200) {
        return thunkAPI.fulfillWithValue();
      } else {
        return thunkAPI.rejectWithValue("kakao error");
      }
    } catch (err) {
      return thunkAPI.rejectWithValue("kakao error");
    }
  }
);
//slice 데이터 저장
const userSlice = createSlice({
  name: "user",
  initialState,
  reducer: {},

  extraReducers: {
    [__signUp.pending]: (state) => {
      state.isLoading = true;
    },
    [__signUp.fulfilled]: (state) => {
      state.isLoading = false;
      state.isSignup = true;
    },
    [__signUp.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //__postDupEmail
    [__postDupEmail.pending]: (state) => {
      state.isLoading = true;
    },
    [__postDupEmail.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.dupCheck = action.payload.result;
      console.log(12);
    },
    [__postDupEmail.rejected]: (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      state.error = true;
    },

    //__postLogin
    [__postLogin.pending]: (state) => {
      state.isLoading = true;
    },
    [__postLogin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isLogin = true;
    },
    [__postLogin.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //kakaoLogin
    [kakaoLogin.pending]: (state) => {},
    [kakaoLogin.fulfilled]: (state, action) => {
      state.isLogedIn = true;
    },
    [kakaoLogin.rejected]: (state, action) => {
      state.error = false;
      state.errorMsg = action.payload;
    },
  },
});
export default userSlice.reducer;
