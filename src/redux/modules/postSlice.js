import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PostAPI } from '../../api/axios';

export const __search = createAsyncThunk(
  "mypageSlice/__search",
  async (payload, thunkAPI) => {
    try {
      console.log('서버로 search값을 전송')
      const res = PostAPI.getSearch(payload);
      console.log('search res:', res)
      return thunkAPI.fulfillWithValue(res);
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
    setBoolHelper: (state) => { state.boolHelper = true; state.boolHelpee = false; },
    setBoolHelpee: (state) => { state.boolHelpee = true; state.boolHelper = false; }
  },
  extraReducers: {},
});
export const { setBoolHelper, setBoolHelpee } = postSlice.actions;
export default postSlice.reducer;
