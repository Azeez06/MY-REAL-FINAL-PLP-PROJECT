import axios from "axios";

// 🔹 Backend base URL (from Vercel env ONLY)
const API_BASE = import.meta.env.VITE_API_URL;

if (!API_BASE) {
  console.warn("⚠️ VITE_API_URL is not set");
}

// 🔹 Axios instance
export const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔹 Automatically attach token to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// =====================
// API HELPERS
// =====================

// AUTH
export const registerUser = (data) =>
  apiClient.post("/api/auth/register", data);

export const loginUser = (data) =>
  apiClient.post("/api/auth/login", data);

// PORTFOLIO
export const savePortfolio = (portfolioData) =>
  apiClient.put("/api/portfolio/save", portfolioData);
