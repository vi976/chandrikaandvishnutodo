// src/components/EditTodoForm.jsx
import { useState } from "react";

export const EditTodoForm = ({ editTodo, task }) => {
  const [value, setValue] = useState(task.text);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    editTodo(value.trim(), task._id);
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        type="text"
        className="todo-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Update task"
      />
      <button type="submit" className="todo-btn">Update</button>
    </form>
  );
};
