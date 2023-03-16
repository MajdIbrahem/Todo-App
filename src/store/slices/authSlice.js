import { createSlice } from "@reduxjs/toolkit";
import { authStorageKey } from "../../utils/constants";

const initValue = {
  user: JSON.parse(localStorage.getItem(authStorageKey)) || null,
  isAuth: !!JSON.parse(localStorage.getItem(authStorageKey)),
};

// const calRemainingTime = (expirationTime) => {
//   const currentTime = new Date().getTime();
//   const adjExpireationTime = new Date(expirationTime).getTime();
//   const result = adjExpireationTime - currentTime;
//   return result;
// };

const authSlice = createSlice({
  name: "auth",
  initialState: initValue,
  reducers: {
    handleLogin: (state, action) => {
      state.user = action.payload;
      localStorage.setItem(authStorageKey, JSON.stringify(action.payload));
      state.isAuth = true;
    },
    handleLogout: (state, action) => {
      state.user = null;
      localStorage.removeItem(authStorageKey);
      state.isAuth = false;
    },
  },
});

export const { handleLogin, handleLogout } = authSlice.actions;
export default authSlice.reducer;
