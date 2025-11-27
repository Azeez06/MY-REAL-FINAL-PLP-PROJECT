import { useState } from "react";
import Footer from "../components/Footer";
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

export default function PortfolioBuilder() {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({
    name: "",
    title: "",
    bio: "",
    image: "",
  });
  const [services, setServices] = useState([{ title: "", description: "" }]);
  const [projects, setProjects] = useState([
    { title: "", description: "", link: "" },
  ]);
  const [contact, setContact] = useState({
    email: "",
    phone: "",
    linkedin: "",
  });
  const [preview, setPreview] = useState(false);

  // Handlers
  const handleProfileChange = (e) =>
    setProfile({ ...profile, [e.target.name]: e.target.value });
  const handleServiceChange = (i, e) => {
    const updated = [...services];
    updated[i][e.target.name] = e.target.value;
    setServices(updated);
  };
  const handleProjectChange = (i, e) => {
    const updated = [...projects];
    updated[i][e.target.name] = e.target.value;
    setProjects(updated);
  };
  const handleContactChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const addService = () =>
    setServices([...services, { title: "", description: "" }]);
  const addProject = () =>
    setProjects([...projects, { title: "", description: "", link: "" }]);

  const handlePreview = () => setPreview(true);

  // ICON SET for services (rotates through lucide icons)
  const serviceIcons = [Monitor, Link2, PenTool, Share2, Palette, Brain];

  if (preview) {
    return (
      <div className="min-h-screen bg-[#0d1117] text-gray-100">
        {/* Navbar */}
        <nav className="flex flex-col items-center py-6 bg-[#161b22] shadow-md">
          {profile.image && (
            <img
              src={profile.image}
              alt="Profile"
              className="w-20 h-20 rounded-full border-2 border-blue-600 object-cover mb-3"
            />
          )}
          <h1 className="text-xl font-semibold text-blue-400">
            {profile.name}
          </h1>
          <div className="flex gap-6 mt-3 text-gray-300 text-sm">
            {["Home", "Services", "Projects", "Contact"].map((item, i) => (
              <a
                key={i}
                href={`#${item.toLowerCase()}`}
                className="hover:text-blue-400 transition"
              >
                {item}
              </a>
            ))}
          </div>
        </nav>

        {/* About Section */}
        <section
          id="home"
          className="max-w-5xl mx-auto py-20 px-6 flex flex-col md:flex-row items-center gap-10"
        >
          {profile.image && (
            <img
              src={profile.image}
              alt="Profile"
              className="w-80 h-80 object-cover rounded-xl shadow-lg"
            />
          )}
          <div>
            <h2 className="text-4xl font-bold text-blue-400 mb-4">
              My <span className="text-gray-200">Portfolio</span>
            </h2>
            <p className="text-gray-300 leading-relaxed">{profile.bio}</p>
            <div className="mt-6 flex gap-4">
              <a
                href="#projects"
                className="bg-blue-600 px-5 py-2 rounded-md text-white hover:bg-blue-700"
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="border border-blue-500 px-5 py-2 rounded-md text-blue-400 hover:bg-blue-500 hover:text-white transition"
              >
                Let’s Talk
              </a>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="bg-[#161b22] py-20 px-6">
          <h2 className="text-3xl font-bold text-center text-blue-400 mb-4">
            My Services
          </h2>
          <p className="text-center text-gray-400 mb-10">
            Here are the services I offer to help bring your ideas to life.
          </p>
          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {services
              .filter((s) => s.title)
              .map((service, i) => {
                const Icon = serviceIcons[i % serviceIcons.length];
                return (
                  <div
                    key={i}
                    className="bg-[#0d1117] p-6 rounded-xl border border-gray-700 hover:border-blue-600 transition"
                  >
                    <Icon className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                    <h3 className="text-center font-semibold text-lg text-gray-100">
                      {service.title}
                    </h3>
                    <p className="text-center text-gray-400 text-sm mt-2">
                      {service.description}
                    </p>
                  </div>
                );
              })}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-6">
          <h2 className="text-3xl font-bold text-center text-blue-400 mb-4">
            My Projects
          </h2>
          <p className="text-center text-gray-400 mb-10">
            A selection of my recent projects that reflect creativity, skill,
            and innovation.
          </p>
          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {projects
              .filter((p) => p.title)
              .map((project, i) => (
                <div
                  key={i}
                  className="bg-[#161b22] p-6 rounded-xl border border-gray-700 hover:border-blue-600 transition"
                >
                  <h3 className="text-lg font-semibold text-gray-100 text-center">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-3 text-center">
                    {project.description}
                  </p>
                  {project.link && (
                    <div className="flex justify-center mt-4">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 text-white px-4 py-1 rounded-md text-sm hover:bg-blue-700"
                      >
                        View Project
                      </a>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="bg-[#161b22] py-16 px-6 text-center border-t border-gray-700"
        >
          <h2 className="text-3xl font-bold text-blue-400 mb-4">Contact Me</h2>
          <div className="flex flex-col items-center space-y-3 text-gray-300">
            {contact.email && (
              <p className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-500" /> {contact.email}
              </p>
            )}
            {contact.phone && (
              <p className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-blue-500" /> {contact.phone}
              </p>
            )}
            {contact.linkedin && (
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                LinkedIn Profile
              </a>
            )}
          </div>
        </section>

        {/* Back Button */}
        <div className="text-center py-8">
          <button
            onClick={() => setPreview(false)}
            className="bg-gray-300 text-gray-900 px-6 py-2 rounded-md hover:bg-gray-400"
          >
            Edit Portfolio
          </button>
        </div>
      </div>
    );
  }

  // --------------------- Builder UI ----------------------
  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-16 bg-gray-100 text-gray-900 px-4">
      {/* Step 1: About */}
      {step === 1 && (
        <div className="text-center space-y-6 max-w-lg">
          <h2 className="text-3xl font-bold text-blue-700 mb-4">About You</h2>
          <input
            name="name"
            value={profile.name}
            onChange={handleProfileChange}
            placeholder="Full Name"
            className="border w-full p-3 rounded-md"
          />
          <input
            name="title"
            value={profile.title}
            onChange={handleProfileChange}
            placeholder="Professional Title (e.g., Web Developer)"
            className="border w-full p-3 rounded-md"
          />
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleProfileChange}
            placeholder="Write a short bio about yourself..."
            className="border w-full p-3 rounded-md"
          />
          <input
            name="image"
            value={profile.image}
            onChange={handleProfileChange}
            placeholder="Profile Image URL"
            className="border w-full p-3 rounded-md"
          />
          <button
            onClick={() => setStep(2)}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
          >
            Next
          </button>
        </div>
      )}

      {/* Step 2: Services */}
      {step === 2 && (
        <div className="text-center space-y-6 max-w-lg">
          <h2 className="text-3xl font-bold text-blue-700 mb-4">Your Services</h2>
          {services.map((service, i) => (
            <div key={i} className="border p-4 rounded-md bg-white">
              <input
                name="title"
                value={service.title}
                onChange={(e) => handleServiceChange(i, e)}
                placeholder="Service Title"
                className="border w-full p-2 rounded-md mb-2"
              />
              <textarea
                name="description"
                value={service.description}
                onChange={(e) => handleServiceChange(i, e)}
                placeholder="Short description"
                className="border w-full p-2 rounded-md"
              />
            </div>
          ))}
          <button
            onClick={addService}
            className="text-blue-600 underline hover:text-blue-800"
          >
            + Add Another Service
          </button>
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setStep(1)}
              className="bg-gray-300 px-6 py-2 rounded-md hover:bg-gray-400"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Projects */}
      {step === 3 && (
        <div className="text-center space-y-6 max-w-lg">
          <h2 className="text-3xl font-bold text-blue-700 mb-4">Your Projects</h2>
          {projects.map((p, i) => (
            <div key={i} className="border p-4 rounded-md bg-white">
              <input
                name="title"
                value={p.title}
                onChange={(e) => handleProjectChange(i, e)}
                placeholder="Project Title"
                className="border w-full p-2 rounded-md mb-2"
              />
              <textarea
                name="description"
                value={p.description}
                onChange={(e) => handleProjectChange(i, e)}
                placeholder="Short description"
                className="border w-full p-2 rounded-md mb-2"
              />
              <input
                name="link"
                value={p.link}
                onChange={(e) => handleProjectChange(i, e)}
                placeholder="Project Link (GitHub / Live Demo)"
                className="border w-full p-2 rounded-md"
              />
            </div>
          ))}
          <button
            onClick={addProject}
            className="text-blue-600 underline hover:text-blue-800"
          >
            + Add Another Project
          </button>
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setStep(2)}
              className="bg-gray-300 px-6 py-2 rounded-md hover:bg-gray-400"
            >
              Back
            </button>
            <button
              onClick={() => setStep(4)}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Contact */}
      {step === 4 && (
        <div className="text-center space-y-6 max-w-lg">
          <h2 className="text-3xl font-bold text-blue-700 mb-4">
            Contact Information
          </h2>
          <input
            name="email"
            value={contact.email}
            onChange={handleContactChange}
            placeholder="Email Address"
            className="border w-full p-3 rounded-md"
          />
          <input
            name="phone"
            value={contact.phone}
            onChange={handleContactChange}
            placeholder="Phone Number"
            className="border w-full p-3 rounded-md"
          />
          <input
            name="linkedin"
            value={contact.linkedin}
            onChange={handleContactChange}
            placeholder="LinkedIn URL"
            className="border w-full p-3 rounded-md"
          />
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setStep(3)}
              className="bg-gray-300 px-6 py-2 rounded-md hover:bg-gray-400"
            >
              Back
            </button>
            <button
              onClick={handlePreview}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
            >
              Preview Portfolio
            </button>
          </div>
         
        </div>
      )}
    </div>
  );
}
