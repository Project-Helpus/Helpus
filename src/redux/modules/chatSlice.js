import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ChatAPI } from '../../api/axios';

export const __function = createAsyncThunk(
  "mypageSlice/",
  async (data, thunkAPI) => {
    try {
      const response = ChatAPI(data);
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
