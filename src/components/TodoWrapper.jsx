import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "./Todo";
import "./todoapp.css";
import { TodoForm } from "./TodoForm";
import { EditTodoForm } from "./EditTodoForm";
import DarkModeToggle from "./DarkModeToggle";
import API from "../utils/api";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    document.body.className = "todo-page";
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await API.get("/todos");
      setTodos(res.data);
    } catch (err) {
      console.error("Fetch failed:", err);
      alert("Please login again.");
    }
  };

  const addTodo = async (text) => {
    try {
      const res = await API.post("/todos", { text });
      setTodos([...todos, res.data]);
    } catch (err) {
      console.error("Add failed:", err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await API.delete(`/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const toggleComplete = async (id) => {
    const todo = todos.find((t) => t._id === id);
    try {
      const res = await API.put(`/todos/${id}`, { completed: !todo.completed });
      setTodos(todos.map((t) => (t._id === id ? res.data : t)));
    } catch (err) {
      console.error("Toggle failed:", err);
    }
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo._id === id ? { ...todo, isEditing: true } : todo
      )
    );
  };

  const editTask = async (text, id) => {
    try {
      const res = await API.put(`/todos/${id}`, { text });
      setTodos(
        todos.map((todo) =>
          todo._id === id ? { ...res.data, isEditing: false } : todo
        )
      );
    } catch (err) {
      console.error("Edit failed:", err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "/login";
  };

  return (
    <div className="todo-container">
      <div className="todo-header">
        <div className="top-bar">
          <h2 className="heading">📝 Todo List</h2>
          <div className="right-controls">
            <DarkModeToggle />
            <button onClick={logout} className="logout-btn">Logout</button>
          </div>
        </div>
        <p className="wel">Welcome, {localStorage.getItem("username")}!</p>
        <TodoForm addTodo={addTodo} />
      </div>

      <div className="task-list">
        {todos.map((todo) =>
          todo.isEditing ? (
            <EditTodoForm key={todo._id} editTodo={editTask} task={todo} />
          ) : (
            <Todo
              key={todo._id}
              task={todo}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
              toggleComplete={toggleComplete}
            />
          )
        )}
      </div>
    </div>
  );
};
