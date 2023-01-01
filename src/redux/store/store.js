import { configureStore } from '@reduxjs/toolkit';
import chatSlice from '../modules/chatSlice';
import userSlice from '../modules/userSlice';
import postSlice from '../modules/postSlice';
import mypageSlice from '../modules/mypageSlice';

export const store = configureStore({
  reducer: {
    chatSlice, userSlice, postSlice, mypageSlice
  },
});
