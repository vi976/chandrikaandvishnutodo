import { useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      window.location.href= "/";
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      
      <form onSubmit={handleLogin}>
        <div className="container">
        <input
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        /><label>username</label>
        <br></br>
        <input
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        /><label>password</label>
        </div>
        <button type="submit">Login
          <span className="span1"></span>
          <span className="span2"></span>
        </button>
      </form>
    </div>
  );
}

export default Login;
