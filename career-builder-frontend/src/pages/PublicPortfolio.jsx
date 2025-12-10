// src/pages/PublicPortfolio.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Mail, Phone } from "lucide-react";
import { useParams } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

export default function PublicPortfolio() {
  const { username } = useParams();
  const [portfolio, setPortfolio] = useState(null);


  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await axios.get(`${API}/api/portfolio/public/${username}`);
        setPortfolio(res.data);
      } catch (err) {
        console.error("Error fetching public portfolio", err);
      }
    };
    fetchPortfolio();
  }, [username]);

  if (!portfolio) return <p className="p-6">Loading portfolio...</p>;

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-100">
      <section className="max-w-5xl mx-auto py-20 px-6 flex flex-col md:flex-row items-center gap-10">
        {portfolio.profile.image && <img src={portfolio.profile.image} alt="Profile" className="w-80 h-80 object-cover rounded-xl shadow-lg" />}
        <div>
          <h2 className="text-4xl font-bold text-blue-400 mb-4">{portfolio.profile.name}</h2>
          <p className="text-gray-300 leading-relaxed">{portfolio.profile.bio}</p>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-6">
        <h2 className="text-3xl font-bold text-blue-400 mb-4">Services</h2>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
          {portfolio.services.map((s, i) => (
            <div key={i} className="bg-[#161b22] p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold text-gray-100">{s.title}</h3>
              <p className="text-gray-400 text-sm mt-2">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="py-20 px-6">
        <h2 className="text-3xl font-bold text-blue-400 mb-4">Projects</h2>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
          {portfolio.projects.map((p, i) => (
            <div key={i} className="bg-[#161b22] p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold text-gray-100">{p.title}</h3>
              <p className="text-gray-400 text-sm mt-2">{p.description}</p>
              {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 mt-2 block">View Project</a>}
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 px-6 text-center border-t border-gray-700">
        <h2 className="text-3xl font-bold text-blue-400 mb-4">Contact</h2>
        <p className="flex items-center justify-center gap-2 text-gray-300">
          <Mail /> {portfolio.contact.email}
        </p>
        <p className="flex items-center justify-center gap-2 text-gray-300 mt-2">
          <Phone /> {portfolio.contact.phone}
        </p>
        {portfolio.contact.linkedin && (
          <a href={portfolio.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline block mt-2">
            LinkedIn Profile
          </a>
        )}
      </section>
    </div>
  );
}
