// src/components/Todo.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

export const Todo = ({ task, deleteTodo, editTodo, toggleComplete }) => {
  return (
    <div className="Todo">
      <p
        className={task.completed ? "completed" : ""}
        onClick={() => toggleComplete(task._id)}
      >
        {task.text}
      </p>
      <div>
        <FontAwesomeIcon
          icon={faPenToSquare}
          className="edit-icon"
          onClick={() => editTodo(task._id)}
        />
        <FontAwesomeIcon
          icon={faTrash}
          className="delete-icon"
          onClick={() => deleteTodo(task._id)}
        />
      </div>
    </div>
  );
};
