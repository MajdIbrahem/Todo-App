import { createSlice } from "@reduxjs/toolkit";

const initValue = {
  todoList: [],
  filterStatus: "all",
};

const todoSlice = createSlice({
  name: "todo",
  initialState: initValue,
  reducers: {
    addTodoAction: (state, action) => {
      state.todoList.push(action.payload);
    },
    deleteTodoAction: (state, action) => {
      if (state.todoList.length > 0) {
        const todoListArr = [...state.todoList];
        todoListArr.forEach((todo, index) => {
          if (todo.id === action.payload) {
            todoListArr.splice(index, 1);
          }
        });
        state.todoList = todoListArr;
      }
    },
    updateTodoAction: (state, action) => {
      if (state.todoList.length > 0) {
        const todoListArr = [...state.todoList];

        todoListArr.forEach((todo) => {
          if (todo.id === action.payload.id) {
            todo.status = action.payload.status;
            todo.title = action.payload.title;
          }
        });
        state.todoList = [...todoListArr];
      }
    },
    updateFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
    replaceTodoList: (state, action) => {
      state.todoList = action.payload;
    },
  },
});

export const {
  addTodoAction,
  deleteTodoAction,
  updateTodoAction,
  updateFilterStatus,
  replaceTodoList,
} = todoSlice.actions;
export default todoSlice.reducer;
