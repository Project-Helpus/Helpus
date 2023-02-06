import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserAPI } from "../api/axios";
import storage from "redux-persist/lib/storage";

const initialState = {
  dupCheck: false,
  isLogin: false,
  isSignup: false,
  kakaoInfo: "",
  userInfo: {
    state1: null,
    state2: null,
    userId: 0,
    userImage: "",
    userName: "",
  },
  kakaoState: "",
  isLoginKakao: false,
  isLoading: false,
  error: false,
};

//회원가입 post
export const __signUp = createAsyncThunk(
  "userSlice/signUp",
  async (payload, thunkAPI) => {
    try {
      const res = await UserAPI.signUp(payload);
      if (res.status === 201) {
        window.alert("회원가입이 완료되었습니다.");
        return thunkAPI.fulfillWithValue(res.data);
      } else {
        window.alert("회원가입에 실패했습니다.");
        return thunkAPI.rejectWithValue();
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// ID 중복확인 POST
export const __postDupEmail = createAsyncThunk(
  "userSlice/dupEmail",
  async (payload, thunkAPI) => {
    try {
      const res = await UserAPI.emailCheck(payload);
      if (res.status === 200) {
        window.alert("사용 가능한 이메일입니다.");
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
  "userSlice/postLogin",
  async (payload, thunkAPI) => {
    try {
      const res = await UserAPI.login(payload);
      if (res.status === 200) {
        return thunkAPI.fulfillWithValue(res.data);
      } else {
        window.alert("가입하신 이메일, 비밀번호와 다릅니다.");
        return thunkAPI.rejectWithValue();
      }
    } catch (error) {
      window.alert(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 로그아웃 DELETE
export const __logout = createAsyncThunk(
  "userSlice/logout",
  async (payload, thunkAPI) => {
    try {
      const res = await UserAPI.logout();
      if (res.status === 200) {
        return thunkAPI.fulfillWithValue();
      } else {
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
  "userSlice/kakaoLogin",
  async (payload, thunkAPI) => {
    try {
      const response = await UserAPI.kakaoLogin(payload);
      if (response.status === 200) {
        return thunkAPI.fulfillWithValue(response.data);
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
  "userSlice/kakaoLoginState",
  async (payload, thunkAPI) => {
    try {
      const response = await UserAPI.kakaoState(payload);
      if (response.status === 201) {
        return thunkAPI.fulfillWithValue(response.data);
      } else {
        return thunkAPI.rejectWithValue();
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//카카오 탈퇴
export const __kakaoSignOut = createAsyncThunk(
  "user/kakaoSignOut",
  async (payload, thunkAPI) => {
    try {
      const response = await UserAPI.kakaoSignOut();
      if (response.status === 200) {
        window.alert("탈퇴가 완료되었습니다.");
        return thunkAPI.fulfillWithValue(response.data);
      } else {
        return thunkAPI.rejectWithValue();
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//로컬 탈퇴
export const __signOut = createAsyncThunk(
  "userSlice/signOut",
  async (payload, thunkAPI) => {
    try {
      const response = await UserAPI.signOut();
      if (response.status === 200) {
        window.alert("탈퇴가 완료되었습니다.");
        return thunkAPI.fulfillWithValue(response.data);
      } else {
        return thunkAPI.rejectWithValue();
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// 마이페이지 프로필 수정
export const __patchMypage = createAsyncThunk(
  "userSlice/patchMypage",
  async (data, thunkAPI) => {
    try {
      const res = await UserAPI.patchMypage(data);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

// 마이페이지 프로필 이미지 수정
export const __userImage = createAsyncThunk(
  "userSlice/userImage",
  async (data, thunkAPI) => {
    try {
      const res = await UserAPI.userImage(data);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

//slice 데이터 저장
const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
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
      state.dupCheck = false;
    },
    //__postLogin
    [__postLogin.pending]: (state) => {
      state.isLoading = true;
    },
    [__postLogin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isLogin = true;
      state.userInfo = action.payload;
    },
    [__postLogin.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //__logout
    [__logout.pending]: (state) => {
      state.isLoading = true;
    },
    [__logout.fulfilled]: (state) => {
      state.isLoading = false;
      state.isLogin = false;
      state.isLoginKakao = false;
      state = initialState;
      storage.removeItem("persist:root");
    },
    [__logout.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //kakaoLogin
    [__kakaoLogin.pending]: (state) => {
      state.isLoading = true;
    },
    [__kakaoLogin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isLoginKakao = true;
      state.userInfo = action.payload;
    },
    [__kakaoLogin.rejected]: (state, action) => {
      state.error = false;
      state.error = action.payload;
    },
    //kakaoLoginState
    [__kakaoState.pending]: (state) => {
      state.isLoading = true;
    },
    [__kakaoState.fulfilled]: (state, action) => {
      state.userInfo = action.payload;
    },
    [__kakaoState.rejected]: (state, action) => {
      state.error = false;
      state.error = action.payload;
    },

    //kakaosignOut
    [__kakaoSignOut.pending]: (state) => {
      state.isLoading = true;
    },
    [__kakaoSignOut.fulfilled]: (state, action) => {
      state.isLoginKakao = false;
      storage.removeItem("persist:root");
    },
    [__kakaoSignOut.rejected]: (state, action) => {
      state.error = false;
      state.error = action.payload;
    },

    //signOut
    [__signOut.pending]: (state) => {
      state.isLoading = true;
    },
    [__signOut.fulfilled]: (state, action) => {
      state.isLogin = false;
      storage.removeItem("persist:root");
    },
    [__signOut.rejected]: (state, action) => {
      state.error = false;
      state.error = action.payload;
    },
    //프로필 수정
    [__patchMypage.pending]: (state) => {
      state.isLoading = true;
    },
    [__patchMypage.fulfilled]: (state, action) => {
      state.userInfo = { ...state.userInfo, ...action.payload };
    },
    [__patchMypage.rejected]: (state) => {
      state.isLoading = false;
    },
    //프로필 이미지 수정
    [__userImage.pending]: (state) => {
      state.isLoading = true;
    },
    [__userImage.fulfilled]: (state, action) => {
      state.userInfo = { ...state.userInfo, ...action.payload };
    },
    [__userImage.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default userSlice.reducer;
