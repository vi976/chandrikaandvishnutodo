import { useState, useEffect } from "react";
import API from "../utils/api"; // axios instance with token
import Todo from "./todo";

function TodoApp() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const res = await API.get("/todos");
      setTodos(res.data);
    } catch (err) {
      console.error(err);
      alert("Please login again.");
    }
  };

  const addTodo = async () => {
    if (!text.trim()) return;
    await API.post("/todos", { text });
    setText("");
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await API.delete(`/todos/${id}`);
    fetchTodos();
  };

  const toggleTodo = async (id) => {
    const todo = todos.find((t) => t._id === id);
    await API.put(`/todos/${id}`, { completed: !todo.completed });
    fetchTodos();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "/login";
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h2>📝 Todo List</h2>
      <p>Welcome, {localStorage.getItem("username")}!</p>
      <button onClick={handleLogout}>Logout</button>
      <br /><br />
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter a task"
        style={{ padding: "0.5rem", marginRight: "0.5rem" }}
      />
      <button onClick={addTodo}>Add</button>

      <div style={{ marginTop: "2rem" }}>
        {todos.map((todo) => (
          <Todo
            key={todo._id}
            todo={todo}
            onDelete={deleteTodo}
            onToggle={toggleTodo}
          />
        ))}
      </div>
    </div>
  );
}

export default TodoApp;
