// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { TodoWrapper } from "./components/TodoWrapper";
import LoginRegister from "./pages/LoginRegister";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Recheck token on storage change or reload
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={token ? <TodoWrapper /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/login"
          element={!token ? <LoginRegister setToken={setToken} /> : <Navigate to="/" replace />}
        />
        <Route
          path="/register"
          element={!token ? <LoginRegister setToken={setToken} /> : <Navigate to="/" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
