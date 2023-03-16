import React, { useState, useEffect } from "react";
import { MdOutlineClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import { v4 as uuid } from "uuid";

import { updateTodo, addTodo } from "../store/actions/todoActions";
import style from "../styles/modules/modal.module.scss";
import Button from "./Button";

const dropIn = {
  hidden: {
    opacity: 0,
    transform: "scale(0.9)",
  },
  visible: {
    transform: "scale(1)",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    transform: "scale(0.9)",
    opacity: 0,
  },
};

const TodoModal = ({ type, todo, handleCloseModal }) => {
  const userId = useSelector((state) => state.auth.user.userId);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("incomplete");
  const dispatch = useDispatch();

  useEffect(() => {
    if (type === "update" && todo) {
      setTitle(todo.title);
      setStatus(todo.status);
    } else {
      setTitle("");
      setStatus("incomplete");
    }
  }, [type, todo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "") {
      toast.error("Please enter a title");
      return;
    }
    if (title && status && type !== "update") {
      dispatch(
        addTodo(userId, {
          id: uuid(),
          title,
          status,
          time: new Date().toLocaleString(),
        })
      );
      handleCloseModal();
    }
    if (type === "update") {
      if (todo.title !== title || todo.status !== status) {
        dispatch(updateTodo(userId, { ...todo, title, status }));
      } else {
        toast.error("No changes made");
        return;
      }
    }
    handleCloseModal();
  };
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={style.wrapper}
      >
        <motion.div
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={style.container}
        >
          <motion.div
            onClick={handleCloseModal}
            className={style.closeButton}
            // animation
            initial={{ top: 40, opacity: 0 }}
            animate={{ top: -10, opacity: 1 }}
            exit={{ top: 40, opacity: 0 }}
          >
            <MdOutlineClose />
          </motion.div>
          <form className={style.form} onSubmit={handleSubmit}>
            <h1 className={style.formTitle}>
              {type === "add" ? "Add" : "Update"} Todo
            </h1>
            <label htmlFor="title">
              Title
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                id="title"
              />
            </label>
            <label htmlFor="status">
              Status
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                id="status"
                name="status"
              >
                <option value="incomplete">In Complete</option>
                <option value="complete">Complete</option>
              </select>
            </label>
            <div className={style.buttonContainer}>
              <Button type="submit" variant="primary">
                {type === "add" ? "Add Task" : "Update Task"}
              </Button>
              <Button
                onClick={handleCloseModal}
                type="button"
                variant="secondary"
              >
                Cancel
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TodoModal;
