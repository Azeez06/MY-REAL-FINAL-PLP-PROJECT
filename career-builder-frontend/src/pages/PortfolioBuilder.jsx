import { useState, useEffect } from "react";
import axios from "axios";
import {
  Code2,
  PenTool,
  Share2,
  Monitor,
  Palette,
  Brain,
  Link2,
  Mail,
  Phone,
} from "lucide-react";
import { savePortfolio } from "../utils/api";

const API = import.meta.env.VITE_API_URL;

export default function PortfolioBuilder() {
  const [loading, setLoading] = useState(true);

  // Username state
  const [username, setUsername] = useState("");

  // Portfolio states
  const [portfolio, setPortfolio] = useState({
    profile: { name: "", title: "", bio: "", image: "" },
    services: [{ title: "", description: "" }],
    projects: [{ title: "", description: "", link: "" }],
    contact: { email: "", phone: "", linkedin: "" },
  });

  const [step, setStep] = useState(1);
  const [preview, setPreview] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch portfolio data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API}/api/portfolio/my`, {
          withCredentials: true,
        });

        setUsername(res.data.publicUsername || "");
        if (res.data.publicUsername) {
          localStorage.setItem("portfolioUsername", res.data.publicUsername);
        }

        setPortfolio({
          profile: res.data.profile || { name: "", title: "", bio: "", image: "" },
          services: res.data.services.length ? res.data.services : [{ title: "", description: "" }],
          projects: res.data.projects.length ? res.data.projects : [{ title: "", description: "", link: "" }],
          contact: res.data.contact || { email: "", phone: "", linkedin: "" },
        });
      } catch (err) {
        console.error("Error loading portfolio", err);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  // ------------------ Handlers ------------------
  const handleProfileChange = (e) =>
    setPortfolio({ ...portfolio, profile: { ...portfolio.profile, [e.target.name]: e.target.value } });

  const handleServiceChange = (i, e) => {
    const updated = [...portfolio.services];
    updated[i][e.target.name] = e.target.value;
    setPortfolio({ ...portfolio, services: updated });
  };

  const handleProjectChange = (i, e) => {
    const updated = [...portfolio.projects];
    updated[i][e.target.name] = e.target.value;
    setPortfolio({ ...portfolio, projects: updated });
  };

  const handleContactChange = (e) =>
    setPortfolio({ ...portfolio, contact: { ...portfolio.contact, [e.target.name]: e.target.value } });

  const addService = () => setPortfolio({ ...portfolio, services: [...portfolio.services, { title: "", description: "" }] });
  const addProject = () =>
    setPortfolio({ ...portfolio, projects: [...portfolio.projects, { title: "", description: "", link: "" }] });

const handleSave = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to save your portfolio.");
      return;
    }

    // Prepare portfolio data from state
    const portfolioData = {
       publicUsername: username,
      profile: portfolio.profile,
      services: portfolio.services,
      projects: portfolio.projects,
      contact: portfolio.contact,
    };

    // Call the API helper to save portfolio
    const result = await savePortfolio(localStorage.getItem("portfolioUsername"), portfolioData);

    // Show success message
    setMessage(result.message || "Portfolio saved successfully!");
  } catch (error) {
    console.error("Error saving portfolio:", error);
    setMessage(
      error.response?.data?.message || "Error saving portfolio. Please try again."
    );
  }
};



  const serviceIcons = [Monitor, Link2, PenTool, Share2, Palette, Brain];

  if (loading) return <p className="p-6">Loading...</p>;

  // ------------------ Preview Mode ------------------
  if (preview) {
    return (
      <div className="min-h-screen bg-[#0d1117] text-gray-100">
        {/* Navbar */}
        <nav className="flex flex-col items-center py-6 bg-[#161b22] shadow-md">
          {portfolio.profile.image && (
            <img
              src={portfolio.profile.image}
              alt="Profile"
              className="w-20 h-20 rounded-full border-2 border-blue-600 object-cover mb-3"
            />
          )}
          <h1 className="text-xl font-semibold text-blue-400">{portfolio.profile.name}</h1>
          <div className="flex gap-6 mt-3 text-gray-300 text-sm">
            {["Home", "Services", "Projects", "Contact"].map((item, i) => (
              <a key={i} href={`#${item.toLowerCase()}`} className="hover:text-blue-400 transition">
                {item}
              </a>
            ))}
          </div>
        </nav>

        {/* About Section */}
        <section id="home" className="max-w-5xl mx-auto py-20 px-6 flex flex-col md:flex-row items-center gap-10">
          {portfolio.profile.image && <img src={portfolio.profile.image} alt="Profile" className="w-80 h-80 object-cover rounded-xl shadow-lg" />}
          <div>
            <h2 className="text-4xl font-bold text-blue-400 mb-4">
              My <span className="text-gray-200">Portfolio</span>
            </h2>
            <p className="text-gray-300 leading-relaxed">{portfolio.profile.bio}</p>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="bg-[#161b22] py-20 px-6">
          <h2 className="text-3xl font-bold text-center text-blue-400 mb-4">My Services</h2>
          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {portfolio.services.filter((s) => s.title).map((service, i) => {
              const Icon = serviceIcons[i % serviceIcons.length];
              return (
                <div key={i} className="bg-[#0d1117] p-6 rounded-xl border border-gray-700 hover:border-blue-600 transition">
                  <Icon className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                  <h3 className="text-center font-semibold text-lg text-gray-100">{service.title}</h3>
                  <p className="text-center text-gray-400 text-sm mt-2">{service.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-6">
          <h2 className="text-3xl font-bold text-center text-blue-400 mb-4">My Projects</h2>
          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {portfolio.projects.filter((p) => p.title).map((project, i) => (
              <div key={i} className="bg-[#161b22] p-6 rounded-xl border border-gray-700 hover:border-blue-600 transition">
                <h3 className="text-lg font-semibold text-gray-100 text-center">{project.title}</h3>
                <p className="text-gray-400 text-sm mt-3 text-center">{project.description}</p>
                {project.link && (
                  <div className="flex justify-center mt-4">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-4 py-1 rounded-md text-sm hover:bg-blue-700">
                      View Project
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="bg-[#161b22] py-16 px-6 text-center border-t border-gray-700">
          <h2 className="text-3xl font-bold text-blue-400 mb-4">Contact Me</h2>
          <div className="flex flex-col items-center space-y-3 text-gray-300">
            {portfolio.contact.email && (
              <p className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-500" /> {portfolio.contact.email}
              </p>
            )}
            {portfolio.contact.phone && (
              <p className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-blue-500" /> {portfolio.contact.phone}
              </p>
            )}
            {portfolio.contact.linkedin && (
              <a href={portfolio.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                LinkedIn Profile
              </a>
            )}
          </div>
        </section>

        <div className="text-center py-8">
          <button onClick={() => setPreview(false)} className="bg-gray-300 text-gray-900 px-6 py-2 rounded-md hover:bg-gray-400">
            Edit Portfolio
          </button>
          <button onClick={handleSave} className="ml-4 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">
            Save Portfolio
          </button>
        </div>
      </div>
    );
  }

  // ------------------ Builder UI (Steps) ------------------
  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-16 bg-gray-100 text-gray-900 px-4">
      {/* Username Input */}
      <div className="mb-8 w-full max-w-lg p-4 border rounded">
        <h2 className="text-xl font-semibold">Public Portfolio Username</h2>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-gray-700">yourwebsite.com/portfolio/</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Enter your public username"
          />
        </div>
      </div>

      {/* Step Forms */}
      {step === 1 && (
        <div className="text-center space-y-4 max-w-lg">
          <h2 className="text-3xl font-bold text-blue-700 mb-4">About You</h2>
          <input name="name" value={portfolio.profile.name} onChange={handleProfileChange} placeholder="Full Name" className="border w-full p-3 rounded-md" />
          <input name="title" value={portfolio.profile.title} onChange={handleProfileChange} placeholder="Professional Title" className="border w-full p-3 rounded-md" />
          <textarea name="bio" value={portfolio.profile.bio} onChange={handleProfileChange} placeholder="Short bio" className="border w-full p-3 rounded-md" />
          <input type="file" accept="image/*" onChange={(e) => {
            const file = e.target.files[0];
            if (file) setPortfolio({ ...portfolio, profile: { ...portfolio.profile, image: URL.createObjectURL(file) } });
          }} className="border w-full p-3 rounded-md" />
          <button onClick={() => setStep(2)} className="bg-blue-600 text-white px-6 py-2 rounded-md">Next</button>
        </div>
      )}

      {step === 2 && (
        <div className="text-center space-y-4 max-w-lg">
          <h2 className="text-3xl font-bold text-blue-700 mb-4">Services</h2>
          {portfolio.services.map((service, i) => (
            <div key={i} className="border p-4 rounded-md bg-white mb-2">
              <input name="title" value={service.title} onChange={(e) => handleServiceChange(i, e)} placeholder="Service Title" className="border w-full p-2 rounded-md mb-2" />
              <textarea name="description" value={service.description} onChange={(e) => handleServiceChange(i, e)} placeholder="Description" className="border w-full p-2 rounded-md" />
            </div>
          ))}
          <button onClick={addService} className="text-blue-600 underline hover:text-blue-800">+ Add Another Service</button>
          <div className="flex justify-between mt-6">
            <button onClick={() => setStep(1)} className="bg-gray-300 px-6 py-2 rounded-md">Back</button>
            <button onClick={() => setStep(3)} className="bg-blue-600 text-white px-6 py-2 rounded-md">Next</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="text-center space-y-4 max-w-lg">
          <h2 className="text-3xl font-bold text-blue-700 mb-4">Projects</h2>
          {portfolio.projects.map((p, i) => (
            <div key={i} className="border p-4 rounded-md bg-white mb-2">
              <input name="title" value={p.title} onChange={(e) => handleProjectChange(i, e)} placeholder="Project Title" className="border w-full p-2 rounded-md mb-2" />
              <textarea name="description" value={p.description} onChange={(e) => handleProjectChange(i, e)} placeholder="Description" className="border w-full p-2 rounded-md mb-2" />
              <input name="link" value={p.link} onChange={(e) => handleProjectChange(i, e)} placeholder="Project Link" className="border w-full p-2 rounded-md" />
            </div>
          ))}
          <button onClick={addProject} className="text-blue-600 underline hover:text-blue-800">+ Add Another Project</button>
          <div className="flex justify-between mt-6">
            <button onClick={() => setStep(2)} className="bg-gray-300 px-6 py-2 rounded-md">Back</button>
            <button onClick={() => setStep(4)} className="bg-blue-600 text-white px-6 py-2 rounded-md">Next</button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="text-center space-y-4 max-w-lg">
          <h2 className="text-3xl font-bold text-blue-700 mb-4">Contact Info</h2>
          <input name="email" value={portfolio.contact.email} onChange={handleContactChange} placeholder="Email" className="border w-full p-3 rounded-md" />
          <input name="phone" value={portfolio.contact.phone} onChange={handleContactChange} placeholder="Phone" className="border w-full p-3 rounded-md" />
          <input name="linkedin" value={portfolio.contact.linkedin} onChange={handleContactChange} placeholder="LinkedIn URL" className="border w-full p-3 rounded-md" />
          <div className="flex justify-between mt-6">
            <button onClick={() => setStep(3)} className="bg-gray-300 px-6 py-2 rounded-md">Back</button>
            <button onClick={() => setPreview(true)} className="bg-blue-600 text-white px-6 py-2 rounded-md">Preview Portfolio</button>
          </div>
        </div>
      )}

      {/* Save button outside steps */}
      <div className="mt-6 text-center">
        <button onClick={handleSave} className="bg-green-600 text-white px-6 py-2 rounded-md">Save Portfolio</button>
        {message && <p className="mt-4 text-blue-600">{message}</p>}
      </div>
    </div>
  );
}
