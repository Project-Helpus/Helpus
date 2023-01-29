import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ChatAPI } from "../../api/axios";

const initialState = {
  chatImage: "",
};

export const __score = createAsyncThunk(
  "mypageSlice/score",
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
  "mypageSlice/",
  async (formData, thunkAPI) => {
    try {
      const res = await ChatAPI.postImage(formData);
      console.log(res);
      if (res.status === 201) return thunkAPI.fulfillWithValue(res.data);
      else alert("이미지 업로드에 실패 했습니다.");
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const __getSenderInfo = createAsyncThunk(
  "mypageSlice/",
  async (roomId, thunkAPI) => {
    try {
      const res = await ChatAPI.getSenderInfo(roomId).then(res);
      console.log(res);
      if (res.status === 201) return thunkAPI.fulfillWithValue(res.data);
      else alert("정보 불러오기에 실패 했습니다.");
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
