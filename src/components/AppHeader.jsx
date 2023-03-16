import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateFilterStatus } from "../store/slices/todoSlice";
import style from "../styles/modules/app.module.scss";
import Button from "./Button";
import SelectButton from "./SelectButton";
import TodoModal from "./TodoModal";

const AppHeader = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const filterStatus = useSelector((state) => state.todo.filterStatus);
  const dispatch = useDispatch();

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  const handleFilter = (e) => dispatch(updateFilterStatus(e.target.value));
  return (
    <div className={style.appHeader}>
      <Button variant="primary" onClick={handleOpenModal}>
        Add Task
      </Button>
      <SelectButton id="status" value={filterStatus} onChange={handleFilter}>
        <option value="all">All</option>
        <option value="incomplete">In Completed</option>
        <option value="complete">Completed</option>
      </SelectButton>
      {modalOpen && (
        <TodoModal type="add" handleCloseModal={handleCloseModal} />
      )}
    </div>
  );
};

export default AppHeader;
