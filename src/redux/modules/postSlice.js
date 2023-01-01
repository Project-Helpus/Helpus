import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PostAPI } from '../../api/axios';

export const __function = createAsyncThunk(
  "mypageSlice/",
  async (data, thunkAPI) => {
    try {
      const response = PostAPI(data);
      return thunkAPI.fulfillWithValue();
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState = {};

const postSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {},
  extraReducers: {},
});

export default postSlice.reducer;
