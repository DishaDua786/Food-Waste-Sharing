import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "https://foodwaste-backend.onrender.com/api";
axios.defaults.withCredentials = true;
const api = axios.create({
  baseURL: API_BASE,
});

// Attach JWT if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
