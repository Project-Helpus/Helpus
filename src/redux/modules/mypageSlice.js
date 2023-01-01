import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MypageAPI } from '../../api/axios';

export const __function = createAsyncThunk(
  "mypageSlice/",
  async (data, thunkAPI) => {
    try {
      const response = await MypageAPI.getMyPage();
      return thunkAPI.fulfillWithValue();
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState = {};

const mypageSlice = createSlice({
  name: "mypageSlice",
  initialState,
  reducers: {},
  extraReducers: {},
});

export default mypageSlice.reducer;
