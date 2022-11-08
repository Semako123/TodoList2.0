import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./authSlicer";
import TasksSlice from "./tasksSlicer";

const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    tasks:TasksSlice.reducer
  },
});

export default store;
