import React from "react";

import style from "../styles/modules/button.module.scss";
import { getStyleClasses } from "../utils/getStyleClasses";

const SelectButton = ({ children, ...rest }) => {
  return (
    <select
      className={getStyleClasses([style.button, style.button__select])}
      {...rest}
    >
      {children}
    </select>
  );
};

export default SelectButton;
