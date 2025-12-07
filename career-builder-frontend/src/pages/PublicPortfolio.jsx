import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export default function PublicPortfolio() {
  const { username } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await axios.get(`${API}/api/portfolio/view/${username}`);
        setPortfolio(res.data);
      } catch (err) {
        setNotFound(true);
      }
    };

    fetchPortfolio();
  }, [username]);

  if (notFound) {
    return <p className="p-6 text-red-600">Portfolio not found.</p>;
  }

  if (!portfolio) {
    return <p className="p-6">Loading...</p>;
  }

  const { profile, services, projects } = portfolio;

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Profile */}
      <div className="text-center mb-6">
        {profile?.image && (
          <img
            src={profile.image}
            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
          />
        )}

        <h1 className="text-3xl font-bold">{profile?.fullName}</h1>
        <p className="text-gray-700 mt-2">{profile?.bio}</p>
      </div>

      {/* Services */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Services</h2>
        <ul className="list-disc ml-6">
          {services?.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>

      {/* Projects */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Projects</h2>
        <ul className="list-disc ml-6">
          {projects?.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
