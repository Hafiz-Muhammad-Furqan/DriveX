import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Slices/UserSlice.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
