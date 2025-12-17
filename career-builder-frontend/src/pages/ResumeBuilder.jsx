import { useState, useRef, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Footer from "../components/Footer";  
import { apiClient, authHeaders } from "../utils/api";
import { useSearchParams } from "react-router-dom";




export default function ResumeBuilder() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    city: "",
    postcode: "",
    country: "",
    email: "",
    phone: "",
    linkedin: "",
    experiences: [{ title: "", description: "" }],
    education: [{ school: "", degree: "", year: "", description: "" }],
    skills: "",
    certifications: [""],
    technicalSkills: "",
    summary: "",
  });

  const totalSteps = 8; // Updated
  const progress = (step / totalSteps) * 100;

  const previewRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleExperienceChange = (index, e) => {
    const newExperiences = [...formData.experiences];
    newExperiences[index][e.target.name] = e.target.value;
    setFormData({ ...formData, experiences: newExperiences });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experiences: [...formData.experiences, { title: "", description: "" }],
    });
  };
const handleEducationChange = (index, e) => {
  const newEdu = [...formData.education];
  newEdu[index][e.target.name] = e.target.value;
  setFormData({ ...formData, education: newEdu });
};

const addEducation = () => {
  setFormData({
    ...formData,
    education: [
      ...formData.education,
      { school: "", degree: "", year: "", description: "" },
    ],
  });
};

  const handleCertificationChange = (index, e) => {
    const newCerts = [...formData.certifications];
    newCerts[index] = e.target.value;
    setFormData({ ...formData, certifications: newCerts });
  };

  const addCertification = () => {
    setFormData({
      ...formData,
      certifications: [...formData.certifications, ""],
    });
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

 const handleDownloadPDF = async () => {
  const element = previewRef.current;

  // Ensure preview exists
  if (!element) {
    alert("Preview is not ready.");
    return;
  }

  // High resolution canvas (Sharp PDF)
  const canvas = await html2canvas(element, {
    scale: 3,            // BIG improvement in text clarity
    useCORS: true,       
    backgroundColor: "#FFFFFF"
  });

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();     // 210mm
  const pdfHeight = pdf.internal.pageSize.getHeight();   // 297mm

  const imgWidth = pdfWidth;
  const imgHeight = (canvas.height * pdfWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 0;

  // Add first page
  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  heightLeft -= pdfHeight;

  // Add more pages if content is long
  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;
  }

  pdf.save(`${formData.name || "My"}_Professional_CV.pdf`);
};
const saveResumeToServer = async () => {
  try {
    const payload = {
      title: `${formData.name} ${formData.surname} CV`,
      personal: {
        fullName: `${formData.name} ${formData.surname}`,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        country: formData.country,
        linkedin: formData.linkedin,
      },
      summary: formData.summary,
      experiences: formData.experiences,
      education: formData.education,
      skills: (formData.skills || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      certifications: formData.certifications,
      technicalSkills: formData.technicalSkills,
    };

    const res = await apiClient.post(
      "/api/resume/create", // ✅ THIS IS THE FIX
      payload,
      { headers: authHeaders() }
    );

    alert("Saved resume to dashboard!");
  } catch (err) {
    console.error("SAVE RESUME ERROR:", err.response || err);
    alert(err.response?.data?.message || "Save failed");
  }
};

 
const [searchParams] = useSearchParams();
const editId = searchParams.get("edit");

const [loadingEdit, setLoadingEdit] = useState(false);
// ======================================================
// 🚀 EDIT MODE — Load existing resume
// ======================================================
useEffect(() => {
  const loadResumeForEdit = async () => {
    if (!editId) return; // not editing

    setLoadingEdit(true);
    try {
      const res = await apiClient.get(`/resume/${editId}`, {
        headers: authHeaders(),
      });

      console.log("Loaded resume for editing:", res.data);

      // Fill form with the saved resume
      setFormData(res.data.resume);

    } catch (err) {
      console.error("Failed to load resume for edit:", err);
    } finally {
      setLoadingEdit(false);
    }
  };

  loadResumeForEdit();
}, [editId]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">

      {/* Sidebar */}
      <div className="w-full md:w-[22%] bg-blue-600 text-white p-6 rounded-r-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-8 text-center tracking-wide">
          Resume Steps
        </h2>

        <ul className="space-y-4">
          {[
            "Heading",
            "Experience",
            "Education",
            "Skills",
            "Certifications",
            "Technical Skills",
            "Summary",
            "Finalize",
          ].map((item, i) => (
            <li
              key={i}
              className={`flex items-center space-x-3 transition-all ${
                step === i + 1
                  ? "font-semibold text-yellow-300 scale-[1.07]"
                  : "text-gray-200"
              }`}
            >
              <span className="text-lg">{i + 1}.</span>
              <span className="text-lg">{item}</span>
            </li>
          ))}
        </ul>

        {/* Progress */}
        <div className="mt-10">
          <div className="h-2 bg-blue-300 rounded-full">
            <div
              className="h-2 bg-yellow-400 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-center mt-2">
            Progress: {Math.round(progress)}%
          </p>
        </div>
      </div>

      {/* Main Section */}
      <div className="flex-1 grid md:grid-cols-2 gap-6 p-8">

        {/* Form Area */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">

          {/* STEP 1 — HEADING */}
          {step === 1 && (
            <div>
              <h1 className="text-3xl font-bold text-blue-700 mb-6">
                Heading Information
              </h1>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "name",
                  "surname",
                  "city",
                  "postcode",
                  "country",
                  "email",
                  "phone",
                  "linkedin",
                ].map((field, i) => (
                  <input
                    key={i}
                    name={field}
                    placeholder={
                      field === "linkedin"
                        ? "LinkedIn Profile URL"
                        : field.charAt(0).toUpperCase() + field.slice(1)
                    }
                    value={formData[field]}
                    onChange={handleChange}
                    className="p-3 border border-blue-200 rounded-md w-full focus:ring-2 focus:ring-blue-400"
                  />
                ))}
              </div>
            </div>
          )}

          {/* STEP 2 — EXPERIENCE */}
          {step === 2 && (
            <div>
              <h1 className="text-3xl font-bold text-blue-700 mb-6">Experience</h1>

              {formData.experiences.map((exp, index) => (
                <div key={index} className="mb-4 border p-4 rounded-lg bg-gray-50">
                  <input
                    name="title"
                    placeholder="Job Title"
                    value={exp.title}
                    onChange={(e) => handleExperienceChange(index, e)}
                    className="p-3 border rounded-md w-full mb-3"
                  />
                  <textarea
                    name="description"
                    placeholder="Job Description"
                    value={exp.description}
                    onChange={(e) => handleExperienceChange(index, e)}
                    className="p-3 border rounded-md w-full"
                  />
                </div>
              ))}

              <button
                onClick={addExperience}
                className="mt-3 bg-blue-600 text-white px-5 py-2 rounded-md"
              >
                + Add Another Experience
              </button>
            </div>
          )}

     {/* STEP 3 — EDUCATION */}
{step === 3 && (
  <div>
    <h1 className="text-3xl font-bold text-blue-700 mb-6">Education</h1>

    {formData.education.map((edu, index) => (
      <div key={index} className="mb-4 border p-4 rounded-lg bg-gray-50">

        <input
          name="school"
          placeholder="School / Institution"
          value={edu.school}
          onChange={(e) => handleEducationChange(index, e)}
          className="p-3 border rounded-md w-full mb-3"
        />

        <input
          name="degree"
          placeholder="Degree (e.g. BSc in Mass Communication)"
          value={edu.degree}
          onChange={(e) => handleEducationChange(index, e)}
          className="p-3 border rounded-md w-full mb-3"
        />

        <input
          name="year"
          placeholder="Year (e.g. 2019 - 2023)"
          value={edu.year}
          onChange={(e) => handleEducationChange(index, e)}
          className="p-3 border rounded-md w-full mb-3"
        />

        <textarea
          name="description"
          placeholder="Additional details (optional)"
          value={edu.description}
          onChange={(e) => handleEducationChange(index, e)}
          className="p-3 border rounded-md w-full"
        />
      </div>
    ))}

    <button
      onClick={addEducation}
      className="mt-3 bg-blue-600 text-white px-5 py-2 rounded-md"
    >
      + Add Another Education
    </button>
  </div>
)}

          {/* STEP 4 — SKILLS */}
          {step === 4 && (
            <div>
              <h1 className="text-3xl font-bold text-blue-700 mb-6">Core Skills</h1>
              <textarea
                name="skills"
                placeholder="e.g. SEO, Social Media Strategy..."
                value={formData.skills}
                onChange={handleChange}
                className="p-3 border rounded-md w-full"
              />
            </div>
          )}

          {/* STEP 5 — CERTIFICATIONS */}
          {step === 5 && (
            <div>
              <h1 className="text-3xl font-bold text-blue-700 mb-6">
                Certifications
              </h1>

              {formData.certifications.map((cert, index) => (
                <input
                  key={index}
                  placeholder="Certificate Name"
                  value={cert}
                  onChange={(e) => handleCertificationChange(index, e)}
                  className="p-3 border rounded-md w-full mb-3"
                />
              ))}

              <button
                onClick={addCertification}
                className="mt-3 bg-blue-600 text-white px-5 py-2 rounded-md"
              >
                + Add More
              </button>
            </div>
          )}

          {/* STEP 6 — TECHNICAL SKILLS */}
          {step === 6 && (
            <div>
              <h1 className="text-3xl font-bold text-blue-700 mb-6">
                Technical Skills
              </h1>
              <textarea
                name="technicalSkills"
                placeholder="e.g. Network Engineering, OSINT Tools..."
                value={formData.technicalSkills}
                onChange={handleChange}
                className="p-3 border rounded-md w-full"
              />
            </div>
          )}

          {/* STEP 7 — SUMMARY */}
          {step === 7 && (
            <div>
              <h1 className="text-3xl font-bold text-blue-700 mb-6">
                Professional Summary
              </h1>
              <textarea
                name="summary"
                placeholder="Short professional summary"
                value={formData.summary}
                onChange={handleChange}
                className="p-3 border rounded-md w-full"
              />
            </div>
          )}

          {/* STEP 8 — FINALIZE */}
          {step === 8 && (
            <div className="text-center p-10">
              <h1 className="text-3xl font-bold text-blue-700 mb-4">Finalize</h1>
              <button
                onClick={handleDownloadPDF}
                className="bg-blue-600 text-white px-6 py-3 rounded-md"
              >
                Download Professional PDF
              </button>
              <button onClick={saveResumeToServer} className="ml-3 bg-green-600 text-white px-4 py-2 rounded-md">
  Save to Account
</button>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                onClick={prevStep}
                className="bg-gray-300 px-6 py-2 rounded-md"
              >
                Previous
              </button>
            )}

            {step < totalSteps && (
              <button
                onClick={nextStep}
                className="bg-blue-600 text-white px-6 py-2 rounded-md ml-auto"
              >
                Next
              </button>
            )}
          </div>
        </div>

        {/* 🔵 PDF-SAFE CV PREVIEW (Improved A4 layout) */}
<div
  ref={previewRef}
  className="pdf-safe mx-auto shadow-lg"
  style={{
    width: "794px",        // exact A4 width in px
    minHeight: "1123px",   // exact A4 height in px
    backgroundColor: "#ffffff",
    border: "1px solid #cccccc",
    padding: "40px 50px",
    fontFamily: "'Palatino Linotype', Palatino, 'Book Antiqua', serif",
    lineHeight: "1.4",
    color: "#222222",
  }}
>
  {(() => {
    const SectionTitle = ({ children }) => (
  <div
    style={{
      backgroundColor: "#0A2A6D",
      color: "#ffffff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",      // ⬅️ centers vertically
      height: "32px",            // ⬅️ perfect professional bar height
      fontSize: "14px",
      fontWeight: "bold",
      marginTop: "22px",
      marginBottom: "10px",
      borderRadius: "3px",
      fontFamily: "'Palatino Linotype', Palatino, 'Book Antiqua', serif"
    }}
  >
    {children}
  </div>
);

const LightSectionTitle = ({ children }) => (
  <div
    style={{
      backgroundColor: "#E7E8EB",
      color: "#0A2A6D",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",      // ⬅️ centers vertically
      height: "32px",            // ⬅️ same height for consistency
      fontSize: "14px",
      fontWeight: "bold",
      marginTop: "22px",
      marginBottom: "10px",
      borderRadius: "3px",
      fontFamily: "'Palatino Linotype', Palatino, 'Book Antiqua', serif"
    }}
  >
    {children}
  </div>
);


    return (
      <>
        {/* 🔵 NAME */}
        <h1
          style={{
            fontSize: "26px",
            fontWeight: "bold",
            textAlign: "center",
            textTransform: "uppercase",
            color: "#000000",
            marginBottom: "6px"
          }}
        >
          {formData.name} {formData.surname}
        </h1>

        {/* 🔵 CONTACT */}
        <p
          style={{
            textAlign: "center",
            fontSize: "12px",
            color: "#555555",
            marginBottom: "3px"
          }}
        >
          {formData.city}, {formData.country} {formData.postcode} •{" "}
          {formData.email} • {formData.phone}
        </p>

        {/* 🔵 LINKEDIN */}
        <p
          style={{
            textAlign: "center",
            fontSize: "12px",
            color: "#0645AD",
            marginBottom: "20px"
          }}
        >
          {formData.linkedin}
        </p>

        {/* 🔵 SUMMARY */}
        <LightSectionTitle>PROFESSIONAL SUMMARY</LightSectionTitle>
        <p
          style={{
            textAlign: "center",
            fontSize: "12px",
            width: "90%",
            margin: "0 auto 15px auto",
            color: "#555555",   // ← lighter grey like uploaded PDF
    lineHeight: "1.5"
          }}
        >
          {formData.summary}
        </p>

        {/* 🔵 CORE COMPETENCIES */}
       <LightSectionTitle>CORE COMPETENCIES</LightSectionTitle>
        <p
          style={{
            textAlign: "center",
            fontSize: "12px",
            width: "90%",
            margin: "0 auto 15px auto",
            color: "#333333",
            whiteSpace: "pre-line"
          }}
        >
          {formData.skills}
        </p>

        {/* 🔵 EXPERIENCE */}
        <SectionTitle>PROFESSIONAL EXPERIENCE</SectionTitle>
        {formData.experiences.map((exp, i) => (
          <div key={i} style={{ marginBottom: "12px" }}>
            <p
              style={{ fontWeight: "bold", fontSize: "13px", marginBottom: "3px" }}
            >
              {exp.title}
            </p>
            <p
              style={{
                whiteSpace: "pre-line",
                fontSize: "12px",
                color: "#333333"
              }}
            >
              {exp.description}
            </p>
          </div>
        ))}

        {/* 🔵 EDUCATION */}
        <SectionTitle>EDUCATION</SectionTitle>
        {formData.education.map((edu, i) => (
          <p
            key={i}
            style={{ fontSize: "12px", marginBottom: "6px", color: "#333333" }}
          >
            {edu.degree} — {edu.school} ({edu.year})
          </p>
        ))}

        {/* 🔵 CERTIFICATIONS */}
        <SectionTitle>CERTIFICATIONS</SectionTitle>
        {formData.certifications.map((c, i) => (
          <p
            key={i}
            style={{ fontSize: "12px", marginBottom: "4px", color: "#333333" }}
          >
            • {c}
          </p>
        ))}

        {/* 🔵 TECHNICAL SKILLS */}
        <SectionTitle>TECHNICAL SKILLS</SectionTitle>
        <p style={{ fontSize: "12px", color: "#333333" }}>
          {formData.technicalSkills}
        </p>
      </>
    );
  })()}
</div>
      </div>
    </div>
  );
}