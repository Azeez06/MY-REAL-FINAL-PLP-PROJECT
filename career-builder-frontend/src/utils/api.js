import axios from "axios";

// Use the backend from Vercel env OR default to your Render backend
const API_BASE =
  import.meta.env.VITE_API_URL ||
  "https://career-builder-backend-anad.onrender.com";

export const apiClient = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

// Attach token helper
export const authHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};
