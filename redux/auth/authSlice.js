import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: null,
    nickname: null,
    stateChange: null,
  },
  reducers: {
    updateUserProfile: (state, { payload }) => {
      state.userId = payload.userId;
      state.nickname = payload.nickname;
    },
    authStateChange: (state, { payload }) => {
      state.stateChange = payload;
    },
  },
});
