import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PostAPI } from "../../api/axios";

export const __createPost = createAsyncThunk(
  "mypageSlice/createPost",
  async (formData, thunkAPI) => {
    try {
      const response = await PostAPI.postCreate(formData);
      console.log(response);
      return thunkAPI.fulfillWithValue();
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState = {
  isLoading: false,
  error: false,
};

const postSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [__createPost.pending]: state => {
      state.isLoading = true;
    },
    [__createPost.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [__createPost.rejected]: state => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export default postSlice.reducer;
