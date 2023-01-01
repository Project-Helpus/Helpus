import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserAPI } from '../../api/axios';

export const __function = createAsyncThunk(
  "mypageSlice/",
  async (data, thunkAPI) => {
    try {
      const response = UserAPI(data);
      return thunkAPI.fulfillWithValue();
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState = {};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: {},
});

export default userSlice.reducer;
