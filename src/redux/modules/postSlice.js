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

const initialState = {
  boolHelper: false,
  boolHelpee: false,
};

const postSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {
    setBoolHelper: (state) => { state.boolHelper = true; },
    setBoolHelpee: (state) => { state.boolHelpee = true; }
  },
  extraReducers: {},
});
export const { setBoolHelper, setBoolHelpee } = postSlice.actions;
export default postSlice.reducer;
