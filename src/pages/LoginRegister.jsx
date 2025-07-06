import { useEffect, useState } from "react";
import "./LoginRegister.css";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

function LoginRegister({ setToken }) {
  const [isActive, setIsActive] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [registerData, setRegisterData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    document.body.className = "login-page";
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", loginData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      setToken(res.data.token);
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      alert(err?.response?.data?.message || "Login failed");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", registerData);
      alert("Registration successful! Please login.");
      setIsActive(false);
    } catch (err) {
      console.error("Register failed:", err.response?.data || err.message);
      alert(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className={`container ${isActive ? "active" : ""}`} id="container">
      {/* Register */}
      <div className="form-container sign-up">
        <form onSubmit={handleRegister}>
          <h1>Create Account</h1>
          <span className="gap">Use a name and password</span>
          <input
            type="text"
            placeholder="Username"
            value={registerData.username}
            onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={registerData.password}
            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
            required
          />
          <button type="submit">Register</button>
        </form>
      </div>

      {/* Login */}
      <div className="form-container sign-in">
        <form onSubmit={handleLogin}>
          <h1>Sign In</h1>
          <span className="gap">Use your name and password</span>
          <input
            type="text"
            placeholder="Username"
            value={loginData.username}
            onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            required
          />
          <button type="submit">Sign In</button>
        </form>
      </div>

      {/* Toggle */}
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your name and password to sign in</p>
            <button className="hidden" onClick={() => setIsActive(false)}>
              Sign In
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>Register with your name and password</p>
            <button className="hidden" onClick={() => setIsActive(true)}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginRegister;
