import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "https://my-real-final-plp-project-1.onrender.com";

export const apiClient = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

// attach token helper

export const authHeaders = () => {
  const token = localStorage.getItem("token"); // <-- USE THE REAL TOKEN
  return token ? { Authorization: `Bearer ${token}` } : {};
};