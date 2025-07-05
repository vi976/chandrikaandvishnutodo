import axios from 'axios';
const API = axios.create({
  baseURL: "https://mern-to-do-w3ru.onrender.com/api", // ✅ Use your deployed backend
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
