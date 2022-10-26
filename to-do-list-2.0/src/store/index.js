import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./authSlicer";

const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
  },
});

export default store;
