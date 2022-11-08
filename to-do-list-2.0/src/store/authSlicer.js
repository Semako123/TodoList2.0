import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    newUser: false,
  },
  reducers: {
    login(state, action) {
      state.user = JSON.parse(action.payload);
    },
    logout(state) {
      state.user = null;
      localStorage.setItem("user", null);
    },
    setNewUser(state) {
      state.newUser = true;
    },
  },
});

export const authActions = AuthSlice.actions;
export default AuthSlice;
