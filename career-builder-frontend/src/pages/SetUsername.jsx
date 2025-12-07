import { useEffect, useState } from "react";
import axios from "axios";
import PortfolioBuilder from "./PortfolioBuilder"; // import your builder

const API = import.meta.env.VITE_API_URL;

export default function SetUsername() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [portfolio, setPortfolio] = useState({
    profile: { name: "", title: "", bio: "", image: "" },
    services: [{ title: "", description: "" }],
    projects: [{ title: "", description: "", link: "" }],
    contact: { email: "", phone: "", linkedin: "" },
  });
  const [message, setMessage] = useState("");

 useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axios.get(`${API}/api/portfolio/my`, {
        withCredentials: true,
      });

      setUsername(res.data.publicUsername || "");
      setPortfolio({
        profile: res.data.profile || {},
        services: res.data.services || [],
        projects: res.data.projects || [],
        contact: res.data.contact || {},
      });

    } catch (err) {
      console.error("Error loading portfolio", err);
    }
    setLoading(false);
  };

  fetchData();
}, []);

  // Save username
const handleSaveUsername = async () => {
  try {
    const res = await axios.put(
      `${API}/api/portfolio/set-username`,
      { username },
      { withCredentials: true }
    );

    // 💥 ADD THIS LINE
    localStorage.setItem("portfolioUsername", username);

    setMessage(res.data.message);
  } catch (err) {
    setMessage(err.response?.data?.message || "Error saving username");
  }
};

  // Save portfolio from builder
  const handleSavePortfolio = async (updatedPortfolio) => {
    try {
      const res = await axios.put(`${API}/api/portfolio/save`, updatedPortfolio, {
        withCredentials: true,
      });
      setPortfolio(updatedPortfolio); // update local state
      setMessage("Portfolio saved successfully!");
    } catch (err) {
      setMessage("Error saving portfolio");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Portfolio Dashboard</h1>

      {/* Username section */}
      <div className="mb-8 p-4 border rounded">
        <h2 className="text-xl font-semibold">Public Portfolio Username</h2>
        <p className="text-gray-600 mb-2">
          Choose how your public URL will look.
        </p>

        <div className="flex items-center gap-2">
          <span className="text-gray-700">yourwebsite.com/portfolio/</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>

        <button
          onClick={handleSaveUsername}
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save Username
        </button>
      </div>

      {/* Portfolio Builder */}
      <PortfolioBuilder
        initialProfile={portfolio.profile}
        initialServices={portfolio.services}
        initialProjects={portfolio.projects}
        initialContact={portfolio.contact}
        onSavePortfolio={handleSavePortfolio}
      />

      {message && <p className="mt-4 text-blue-600">{message}</p>}
    </div>
  );
}
