import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ChatAPI } from "../api/axios";

const initialState = {
  chatImage: "",
  senderInfo: null,
  cardState: 0,
  notificationMessages: [],
};

export const __delNotification = createAsyncThunk(
  "chatSlice/delNotification",
  async (payload, thunkAPI) => {
    try {
      const res = await ChatAPI.delNotification();
      if (res.status === 200) return thunkAPI.fulfillWithValue(res.data);
      else {
        return thunkAPI.rejectWithValue();
      }
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const __getNotification = createAsyncThunk(
  "chatSlice/getNotification",
  async (payload, thunkAPI) => {
    try {
      const res = await ChatAPI.getNotification();
      if (res.status === 200) return thunkAPI.fulfillWithValue(res.data);
      else {
        alert("정보 불러오기에 실패 했습니다.");
        return thunkAPI.rejectWithValue();
      }
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const __getState = createAsyncThunk(
  "chatSlice/getState",
  async (roomId, thunkAPI) => {
    try {
      const res = await ChatAPI.getState(roomId);
      if (res.status === 200) return thunkAPI.fulfillWithValue(res.data);
      else {
        alert("정보 불러오기에 실패 했습니다.");
        return thunkAPI.rejectWithValue();
      }
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const __getSenderInfo = createAsyncThunk(
  "chatSlice/",
  async (roomId, thunkAPI) => {
    try {
      const res = await ChatAPI.getSenderInfo(roomId);
      if (res.status === 201) return thunkAPI.fulfillWithValue(res.data);
      else alert("정보 불러오기에 실패 했습니다.");
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const __score = createAsyncThunk(
  "chatSlice/score",
  async (payload, thunkAPI) => {
    try {
      const res = await ChatAPI.patchScore(payload);
      return thunkAPI.fulfillWithValue();
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const __sendImage = createAsyncThunk(
  "chatSlice/snedImage",
  async (formData, thunkAPI) => {
    try {
      const res = await ChatAPI.postImage(formData);
      if (res.status === 201) return thunkAPI.fulfillWithValue(res.data);
      else alert("이미지 업로드에 실패 했습니다.");
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

const chatSlice = createSlice({
  name: "chatSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [__getNotification.pending]: (state) => {
      state.isLoading = true;
    },
    [__getNotification.fulfilled]: (state, action) => {
      state.notificationMessages = action.payload;
    },
    [__getNotification.rejected]: (state) => {
      state.isLoading = false;
    },
    [__delNotification.pending]: (state) => {
      state.isLoading = true;
    },
    [__delNotification.fulfilled]: (state, action) => {
      state.notificationMessages = [];
    },
    [__delNotification.rejected]: (state) => {
      state.isLoading = false;
    },
    [__getState.pending]: (state) => {
      state.isLoading = true;
    },
    [__getState.fulfilled]: (state, action) => {
      state.cardState = action.payload;
    },
    [__getState.rejected]: (state) => {
      state.isLoading = false;
    },
    [__getSenderInfo.fulfilled]: (state, action) => {
      state.senderInfo = action.payload;
    },
    [__getSenderInfo.rejected]: (state) => {},
    [__sendImage.pending]: (state) => {
      state.isLoading = false;
    },
    [__sendImage.fulfilled]: (state, action) => {
      state.chatImage = action.payload;
    },
    [__sendImage.rejected]: (state) => {},
    [__score.fulfilled]: (state, action) => {
      state.score = action.payload;
    },
  },
});

export default chatSlice.reducer;
