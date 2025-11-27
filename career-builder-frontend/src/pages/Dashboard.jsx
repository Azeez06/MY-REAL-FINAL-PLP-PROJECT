// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { apiClient, authHeaders } from "../utils/api";

// Icons
import { Briefcase, Sparkles, Newspaper } from "lucide-react";

const tiles = [
  { title: "Resume Builder", desc: "Create a job-winning resume", route: "/ResumeBuilder" },
  { title: "CV Builder", desc: "Academic CV generator", route: "/resume-builder" },
  { title: "Cover Letters", desc: "Personalized cover letters", route: "/CoverLetterBuilder" },
  { title: "SOP Generator", desc: "Generate statements of purpose", route: "/SOPBuilder" },
  { title: "Job Alerts", desc: "Get job notifications", route: "/JobAlerts" },
  { title: "Portfolio", desc: "Showcase your work", route: "/PortfolioBuilder" },
  { title: "CV Analyzer", desc: "Get AI feedback", route: "/cv-analyzer" },
  { title: "Settings", desc: "Manage account", route: "/Settings" },
];
export default function Dashboard() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);

  // REMOVE THIS (you asked for that)
  // const resumes = JSON.parse(localStorage.getItem("cb_resumes")) || [];

  // Keep this — used for recommended jobs
  const user = JSON.parse(localStorage.getItem("cb_user")) || {};

  const skillOrTitle =
    user?.profession ||
    user?.skills ||
    "Mass Communication"; // fallback keyword

  // ======================================================
  // 🔥 1. FETCH JOBS (ALREADY WORKING)
  // ======================================================
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(
          `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(
            skillOrTitle
          )}&num_pages=1`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-key":
                "0b5b496647mshd574be77fbbe992p162869jsne3d2c2a4cdd0",
              "x-rapidapi-host": "jsearch.p.rapidapi.com",
            },
          }
        );

        const data = await res.json();
        setJobs(data?.data?.slice(0, 3) || []);
      } catch (err) {
        console.error("Job API error:", err);
      } finally {
        setLoadingJobs(false);
      }
    };

    fetchJobs();
  }, []);

  // ======================================================
  // 🔥 2. FETCH USER'S SAVED RESUMES FROM BACKEND
  // ======================================================
  const [savedResumes, setSavedResumes] = useState([]);

  useEffect(() => {
    const loadResumes = async () => {
      try {
        const res = await apiClient.get("/resume/my", {
          headers: authHeaders(),
        });

        console.log("Fetched resumes:", res.data);
        setSavedResumes(res.data.resumes || []);
      } catch (err) {
        console.error("Error fetching resumes:", err);
      }
    };

    loadResumes();
  }, []);

  // ======================================================
  // LOGOUT
  // ======================================================
  const handleLogout = () => {
    localStorage.removeItem("cb_auth");
    localStorage.removeItem("cb_user");
    navigate("/");
  };

  
  

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* =================== HEADER =================== */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>


        {/* ============================================================
              1️⃣ RECOMMENDED JOBS SECTION
        ============================================================ */}
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Briefcase className="text-blue-600" /> Recommended Jobs Related to Your Resume
        </h2>

        {loadingJobs ? (
          <p className="text-gray-600">Fetching job recommendations...</p>
        ) : jobs.length === 0 ? (
          <p className="text-gray-600">No job recommendations available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {jobs.map((job, i) => (
              <a
                key={i}
                href={job.job_apply_link}
                target="_blank"
                className="bg-white p-5 rounded-xl border shadow-sm hover:shadow-md transition block"
              >
                <h3 className="font-semibold text-lg">{job.job_title}</h3>
                <p className="text-gray-600 text-sm mt-1">{job.employer_name}</p>
                <p className="text-gray-500 text-sm">
                  {job.job_city}, {job.job_country}
                </p>
                <p className="text-blue-600 text-sm mt-2">View job</p>
              </a>
            ))}
          </div>
        )}

<div className="mt-8">
  <h2 className="text-xl font-bold mb-3">Your Saved Resumes</h2>

  {savedResumes.length === 0 ? (
    <p className="text-gray-500">You haven't saved any resumes yet.</p>
  ) : (
    <ul className="space-y-2">
      {savedResumes.map((resume) => (
        <li
          key={resume._id}
          className="p-4 bg-white shadow rounded-lg border flex justify-between items-start"
        >
          <div>
            <h3 className="font-semibold">{resume.title}</h3>
            <p className="text-sm text-gray-600">
              {resume.summary?.slice(0, 80)}...
            </p>
            <p className="text-xs text-gray-400">
              Created: {new Date(resume.createdAt).toLocaleString()}
            </p>
          </div>

          {/* EDIT BUTTON */}
          <button
            onClick={() => navigate(`/ResumeBuilder?edit=${resume._id}`)}
            className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 ml-4"
          >
            Edit
          </button>
        </li>
      ))}
    </ul>
  )}
</div>



        {/* ============================================================
               3️⃣ TOOLS SECTION
        ============================================================ */}
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <Sparkles className="text-purple-600" /> Explore Job Tools
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {tiles.map((t, i) => (
            <div
              key={i}
              onClick={() => navigate(t.route)}
              className="cursor-pointer bg-white p-6 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition"
            >
              <h3 className="text-lg font-semibold">{t.title}</h3>
              <p className="text-sm text-gray-600">{t.desc}</p>
            </div>
          ))}
        </div>



      </div>

    </div>
  );
}
