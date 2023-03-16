import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import PageHeader from "../components/PageHeader";
import AppHeader from "../components/AppHeader";
import TodoList from "../components/TodoList";
import { getTodo } from "../store/actions/todoActions";
import style from "../styles/modules/app.module.scss";

const TodoPage = () => {
  const userId = useSelector((state) => state.auth.user.userId);
  const userName = useSelector((state) => state.auth.user.displayName);
  const dispatch = useDispatch();

  const TitleComponent = useMemo(
    () => <PageHeader>Todo List</PageHeader>,
    [userName]
  );

  useEffect(() => {
    dispatch(getTodo(userId));
  }, [userId, dispatch]);

  return (
    <>
      <div className="container">
        {TitleComponent}
        <div className={style.app__wrapper}>
          <AppHeader />
          <TodoList />
        </div>
      </div>
    </>
  );
};

export default TodoPage;
