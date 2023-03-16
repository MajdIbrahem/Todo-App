import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slices/todoSlice";
import authReducer from "./slices/authSlice";
import uiReducer from "./slices/uiSlice";

const store = configureStore({
  reducer: {
    todo: todoReducer,
    auth: authReducer,
    ui: uiReducer,
  },
});

export default store;
