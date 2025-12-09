import axios from "axios";

// Use the backend from Vercel env OR default to your Render backend
const API_BASE =
  import.meta.env.VITE_API_URL ||
  "https://career-builder-backend-anad.onrender.com";

// Axios instance
export const apiClient = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

// Attach token helper
export const authHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const savePortfolio = async (username, data) => {
  try {
    const response = await apiClient.put(
      `/api/portfolio/save`,
      { username, ...data },
      { headers: authHeaders(), withCredentials: true }
    );

    return response.data;
  } catch (error) {
    console.error("Error saving portfolio:", error);
    throw error;
  }
};

// You can add more API helper functions here as needed
