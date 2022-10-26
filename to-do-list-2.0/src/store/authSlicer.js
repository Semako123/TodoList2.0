import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "auth",
  initialState: { user: JSON.parse(localStorage.getItem("user")) || null },
  reducers: {
    login(state) {
      state.user = JSON.parse(localStorage.getItem("user"));
    },
    logout(state) {
      state.user = null;
    },
  },
});

export const authActions = AuthSlice.actions;
export default AuthSlice;
