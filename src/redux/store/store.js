import { configureStore, combineReducers } from "@reduxjs/toolkit";
import chatSlice from "../modules/chatSlice";
import userSlice from "../modules/userSlice";
import postSlice from "../modules/postSlice";
import mypageSlice from "../modules/mypageSlice";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whiteList: ["userSlice"],
};

const reducer = combineReducers({
  chatSlice,
  userSlice,
  postSlice,
  mypageSlice,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST, PURGE, REGISTER, REHYDRATE],
      },
    }),
});
