import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "./Button";
import { logout } from "../store/actions/authActions";
import img from "../assets/icons/todo.png";
import style from "../styles/modules/header.module.scss";

const PageHeader = ({ children, ...rest }) => {
  const userName = useSelector((state) => state.auth.user.displayName);
  const dispatch = useDispatch();
  return (
    <div className={style.header}>
      <img src={img} alt="todo" />
      <p className={style.title} {...rest}>
        {children}
      </p>
      <div>
        <p className={style.username}>{userName}</p>
        <Button onClick={() => dispatch(logout())}>Logout</Button>
      </div>
    </div>
  );
};

export default PageHeader;
