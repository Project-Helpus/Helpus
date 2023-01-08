import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserAPI } from "../../api/axios";
import { Cookies } from "react-cookie";

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
      if (res.status === 201) {
        return thunkAPI.fulfillWithValue(res.data);
      } else {
        window.alert("회원가입에 실패했습니다.");
        return thunkAPI.rejectWithValue();
      }
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
        return thunkAPI.rejectWithValue();
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
      console.log("🚀 ~ file: userSlice.js:61 ~ res", res);
      if (res.status === 200) {
        window.alert("로그인 성공!");
        return thunkAPI.fulfillWithValue(res.data.token);
      } else {
        window.alert("가입하신 이메일, 비밀번호와 다릅니다!!");
        return thunkAPI.rejectWithValue();
      }
    } catch (error) {
      window.alert(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//카카오 로그인 get
export const __kakaoLogin = createAsyncThunk(
  "user/kakaoLogin",
  async (code, thunkAPI) => {
    try {
      const response = await UserAPI.kakaoLogin(code);
      if (response.status === 200) {
        return thunkAPI.fulfillWithValue();
      } else {
        return thunkAPI.rejectWithValue();
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//카카오 회원가입 지역 추가
export const __kakaoState = createAsyncThunk(
  "user/kakaoLoginState",
  async (payload, thunkAPI) => {
    try {
      const response = await UserAPI.kakaoLoginState(payload);
      if (response.status === 200) {
        return thunkAPI.fulfillWithValue();
      } else {
        return thunkAPI.rejectWithValue();
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//slice 데이터 저장
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    checkLogin: (state, action) => {
      const cookie = new Cookies();
      if (cookie.get("token")) {
        state.isLogin = true;
      } else {
        state.isLogin = false;
      }
    },
    __logout: (state, action) => {
      const cookie = new Cookies();
      if ((state.isLogin = true)) {
        cookie.remove("token");
        state.isLogin = false;
      } else {
        return;
      }
    },
  },

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
    [__postDupEmail.fulfilled]: (state) => {
      state.isLoading = false;
      state.dupCheck = true;
    },
    [__postDupEmail.rejected]: (state) => {
      state.isLoading = false;
      state.error = true;
    },

    //__postLogin
    [__postLogin.pending]: (state) => {
      state.isLoading = true;
    },
    [__postLogin.fulfilled]: (state) => {
      state.isLoading = false;
      state.isLogin = true;
    },
    [__postLogin.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //kakaoLogin
    [__kakaoLogin.pending]: (state) => {
      state.isLoading = true;
    },
    [__kakaoLogin.fulfilled]: (state) => {
      state.isLogin = true;
    },
    [__kakaoLogin.rejected]: (state, action) => {
      state.error = false;
      state.error = action.payload;
    },
  },
});

export const { checkLogin, __logout } = userSlice.actions;
export default userSlice.reducer;
