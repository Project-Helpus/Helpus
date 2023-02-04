import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ChatAPI } from "../api/axios";

const initialState = {
  chatImage: "",
  senderInfo: null,
  cardState: 0,
};

export const __getState = createAsyncThunk(
  "chatSlice/getState",
  async (roomId, thunkAPI) => {
    try {
      const res = await ChatAPI.getState(roomId);
      if (res.status === 200) return thunkAPI.fulfillWithValue(res.data);
      else {
        alert("정보 불러오기에 실패 했습니다.");
        thunkAPI.rejectWithValue();
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
  async (userId, thunkAPI) => {
    try {
      const res = await ChatAPI.patchScore(userId);
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
    [__getState.pending]: (state) => {
      state.isLoading = true;
    },
    [__getState.fulfilled]: (state, action) => {
      state.cardState = action.payload;
    },
    [__getState.pending]: (state) => {
      state.isLoading = true;
    },
    [__getSenderInfo.fulfilled]: (state, action) => {
      state.senderInfo = action.payload;
    },
    [__getSenderInfo.rejected]: (state) => {},
    [__getSenderInfo.rejected]: (state) => {},
    [__sendImage.pending]: (state) => {
      state.isLoading = true;
    },
    [__sendImage.fulfilled]: (state, action) => {
      state.chatImage = action.payload;
    },
    [__sendImage.rejected]: (state) => {},
  },
});

export default chatSlice.reducer;
