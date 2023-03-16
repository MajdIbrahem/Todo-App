import React from "react";

import style from "../styles/modules/button.module.scss";
import { getStyleClasses } from "../utils/getStyleClasses";

const buttonTypes = {
  primary: "primary",
  secondary: "secondary",
};

const Button = ({ children, variant, pending, type, ...rest }) => {
  return (
    <button
      className={getStyleClasses([
        style.button,
        style[`button--${buttonTypes[variant]}`],
        style[`button--${pending && "disable"}`],
      ])}
      disabled={pending}
      type={type === "submit" ? "submit" : "button"}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
