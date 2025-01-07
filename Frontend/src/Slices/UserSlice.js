import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authenticationStart: (state) => {
      state.loading = true;
    },
    authenticationSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload;
    },
    authenticationFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {
  authenticationStart,
  authenticationSuccess,
  authenticationFailed,
  setUser,
} = userSlice.actions;
export default userSlice.reducer;
