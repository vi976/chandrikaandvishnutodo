import { useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        /><label>username</label>
        <br />
        <input
          type="password"
         
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        /><label>password</label>
        <br />
        <button type="submit">Register
          <span className="span1"></span>
          <span className="span1"></span>
        </button>
      </form>
    </div>
  );
}

export default Register;
