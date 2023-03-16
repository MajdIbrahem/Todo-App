import {
  addTodoRequest,
  deleteTodoRequest,
  getTodoRequest,
  updateTodoRequest,
} from "../../api/todo-api";
import {
  replaceTodoList,
  addTodoAction,
  updateTodoAction,
  deleteTodoAction,
} from "../slices/todoSlice";
import { showNotification } from "../slices/uiSlice";
import { ERROR_STATUS, SUCCESS_STATUS } from "../../utils/constants";

export const getTodo = (userId) => {
  return async (dispatch) => {
    try {
      const res = await getTodoRequest(userId);
      dispatch(replaceTodoList(res));
    } catch (e) {
      dispatch(
        showNotification({
          status: ERROR_STATUS,
          message: "Some thing wrong, Try again later!",
        })
      );
    }
  };
};

export const addTodo = (userId, todo) => {
  return async (dispatch) => {
    try {
      const res = await addTodoRequest(userId, todo);
      dispatch(addTodoAction(res));
      dispatch(
        showNotification({
          status: SUCCESS_STATUS,
          message: "Task Added successfully",
        })
      );
    } catch (e) {
      dispatch(
        showNotification({
          status: ERROR_STATUS,
          message: "Some thing went wrong, Try again!",
        })
      );
    }
  };
};

export const updateTodo = (userId, todo) => {
  return async (dispatch) => {
    try {
      const res = await updateTodoRequest(userId, todo);
      dispatch(updateTodoAction({ ...res, ...todo }));
      dispatch(
        showNotification({
          status: SUCCESS_STATUS,
          message: "Task Updated successfully",
        })
      );
    } catch (e) {
      dispatch(
        showNotification({
          status: ERROR_STATUS,
          message: "Some thing went wrong, Try again!",
        })
      );
    }
  };
};

export const deleteTodo = (userId, todoId) => {
  return async (dispatch) => {
    try {
      await deleteTodoRequest(userId, todoId);
      dispatch(deleteTodoAction(todoId));
      dispatch(
        showNotification({
          status: SUCCESS_STATUS,
          message: "Task Deleted successfully",
        })
      );
    } catch (e) {
      dispatch(
        showNotification({
          status: ERROR_STATUS,
          message: "Some thing went wrong, Try again!",
        })
      );
    }
  };
};
