import React from "react";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

import TodoItem from "./TodoItem";
import style from "../styles/modules/app.module.scss";

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const TodoList = () => {
  const todoList = useSelector((state) => state.todo.todoList);
  const filterStatus = useSelector((state) => state.todo.filterStatus);

  const sortedTodoList = [...todoList];
  sortedTodoList.sort((a, b) => new Date(b.time) - new Date(a.time));

  const filteredTodoList = sortedTodoList.filter((item) => {
    if (filterStatus === "all") {
      return true;
    }
    return item.status === filterStatus;
  });
  console.log(todoList);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className={style.content__wrapper}
    >
      <AnimatePresence>
        {filteredTodoList && filteredTodoList.length > 0 ? (
          filteredTodoList.map((i) => <TodoItem key={i.id} todo={i} />)
        ) : (
          <motion.p variants={child} className={style.emptyText}>
            No Tasks Found
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TodoList;
