import {
  loginRequest,
  registerRequest,
  updateProfile,
} from "../../api/auth-api";
import { handleLogin, handleLogout } from "../slices/authSlice";
import { setLoading } from "../slices/uiSlice";
import { showNotification } from "../slices/uiSlice";
import { ERROR_STATUS, SUCCESS_STATUS } from "../../utils/constants";
import { replaceTodoList } from "../slices/todoSlice";
import { initUserTodoCollection } from "../../api/todo-api";

export const login = (inputData) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await loginRequest(inputData);

      dispatch(
        handleLogin({
          displayName: res.displayName,
          email: res.email,
          token: res.idToken,
          userId: res.localId,
        })
      );
      dispatch(
        showNotification({
          message: "Welcome again",
          status: SUCCESS_STATUS,
        })
      );
    } catch (e) {
      dispatch(
        showNotification({
          message: e.message,
          status: ERROR_STATUS,
        })
      );
    }
    dispatch(setLoading(false));
  };
};

export const register = (inputData) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await registerRequest(inputData);
      const secondRes = await updateProfile({
        displayName: inputData.displayName,
        token: res.idToken,
      });
      await initUserTodoCollection(res.localId, secondRes.displayName);
      dispatch(
        handleLogin({
          displayName: secondRes.displayName,
          email: res.email,
          token: res.idToken,
          userId: res.localId,
        })
      );
      dispatch(
        showNotification({
          message: "Welcome in todo app",
          status: SUCCESS_STATUS,
        })
      );
    } catch (e) {
      dispatch(
        showNotification({
          message: e.message,
          status: ERROR_STATUS,
        })
      );
    }
    dispatch(setLoading(false));
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch(handleLogout());
    dispatch(replaceTodoList([]));
  };
};
