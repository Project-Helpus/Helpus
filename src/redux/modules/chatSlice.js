import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ChatAPI } from '../../api/axios';

export const __score = createAsyncThunk(
  "mypageSlice/",
  async (userId, thunkAPI) => {
    try {
      const res= ChatAPI.patchScore(userId);
      return thunkAPI.fulfillWithValue();
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState = {};

const chatSlice = createSlice({
  name: "chatSlice",
  initialState,
  reducers: {},
  extraReducers: {},
});

export default chatSlice.reducer;
