import { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Footer from "../components/Footer";
import React from "react";

const NoRerender = React.memo(function ({ children }) {
  return children;
});



export default function CoverLetterBuilder() {
  const [step, setStep] = useState(1);
  const [experience, setExperience] = useState("");
  const [student, setStudent] = useState("");
  const [schoolType, setSchoolType] = useState("");
  const [graduated, setGraduated] = useState("");
  const [study, setStudy] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [skills, setSkills] = useState("");
  const [companyFocus, setCompanyFocus] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [generatedLetter, setGeneratedLetter] = useState("");

  // Options
  const experienceOptions = [
    "No Experience",
    "Less Than 3 Years",
    "3-5 Years",
    "5-10 Years",
    "10+ Years",
  ];
  const studentOptions = ["Yes", "No", "Recent Graduate"];
  const schoolOptions = [
    "High School",
    "Trade School",
    "College",
    "Graduate School",
  ];
const downloadPDF = () => {
  const pdf = new jsPDF({
    unit: "pt",
    format: "a4"
  });

  const margin = 40;
  const maxWidth = 515; // width inside A4 minus margins

  pdf.setFont("Times", "Normal");
  pdf.setFontSize(12);

  const lines = pdf.splitTextToSize(generatedLetter, maxWidth);

  let y = 60;
  lines.forEach(line => {
    if (y > 780) {
      pdf.addPage();
      y = 60;
    }
    pdf.text(line, margin, y);
    y += 18; 
  });

  pdf.save(`${fullName.replace(/\s+/g, "_")}_Cover_Letter.pdf`);
};

  // Generate connected, professional letter
  const generateLetter = () => {
    const today = new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const header = `${fullName}\n${email} | ${phone}\n\n${today}\n\n${company}\n\nDear Hiring Manager,\n`;

    const intro = `I am excited to apply for the ${role} position at ${company}. With ${experience.toLowerCase()} of professional experience and a background in ${study ||
      "a related field"}, I am eager to contribute to ${company}’s mission of ${companyFocus ||
      "driving innovation and growth"}.\n`;

    const experienceText =
      experience === "No Experience"
        ? `Although I may not yet have formal work experience, I have developed a strong foundation through academic work and personal projects that demonstrate initiative, creativity, and adaptability.`
        : `Throughout my career, I have built expertise in ${skills ||
            "leadership, communication, and problem-solving"}. These experiences have enabled me to refine my professional and technical abilities while consistently achieving positive results.`;

    const studentText =
      student === "Yes" || student === "Recent Graduate"
        ? `As a ${student.toLowerCase()} from ${schoolType}, I’ve combined theoretical knowledge with practical learning experiences that align with ${company}’s focus areas.`
        : graduated === "Yes"
        ? `As a high school graduate, I bring discipline, responsibility, and a continuous drive to learn—qualities that match the values of ${company}.`
        : `While I may not have completed formal education, my dedication to learning and growth has driven me to acquire skills relevant to the ${role} role.`;

    const connectionText = `I am particularly inspired by ${company}’s dedication to ${companyFocus}. The organization’s vision deeply resonates with my passion for making meaningful contributions through teamwork, innovation, and results-driven performance.`;

    const closing = `I am confident that my background, motivation, and commitment will make me a valuable addition to your team. I would welcome the opportunity to discuss how I can contribute to ${company}’s continued success.\n\nThank you for considering my application.\n\nSincerely,\n${fullName}`;

    const letter = `${header}\n${intro}\n${experienceText}\n\n${studentText}\n\n${connectionText}\n\n${closing}`;

    setGeneratedLetter(letter);
    setStep(9);
  };

  const QuestionBox = ({ title, children }) => (
    <div className="text-center mt-16 space-y-6">
      <h2 className="text-3xl font-semibold text-gray-900">{title}</h2>
      {children}
    </div>
  );

  const OptionButton = ({ label, active, onClick }) => (
    <button
      onClick={onClick}
      className={`px-8 py-4 rounded-md border text-lg min-w-[220px] transition-all duration-200 ${
        active
          ? "border-blue-600 text-blue-600 font-semibold bg-blue-50 shadow-sm"
          : "border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600"
      }`}
    >
      {label}
    </button>
  );

 return (
  <div className="min-h-screen bg-white flex flex-col items-center py-20 px-6 text-gray-900">

    {/* MAIN CONTENT WRAPPER */}
    <div className="max-w-4xl w-full">

      {/* Step 1 */}
      {step === 1 && (
        <QuestionBox title="How long have you been working?">
          <p className="text-gray-500 mb-6">
            We’ll find the best templates for your experience level.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {experienceOptions.map((option) => (
              <OptionButton
                key={option}
                label={option}
                active={experience === option}
                onClick={() => {
                  setExperience(option);
                  setStep(2);
                }}
              />
            ))}
          </div>
        </QuestionBox>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <QuestionBox title="Are you a student?">
          <div className="flex flex-wrap justify-center gap-6">
            {studentOptions.map((option) => (
              <OptionButton
                key={option}
                label={option}
                active={student === option}
                onClick={() => {
                  setStudent(option);
                  setStep(3);
                }}
              />
            ))}
          </div>
        </QuestionBox>
      )}

      {/* Step 3 — Student or Graduate */}
      {step === 3 && (student === "Yes" || student === "Recent Graduate") && (
        <QuestionBox title="What kind of school is it?">
          <div className="flex flex-wrap justify-center gap-6">
            {schoolOptions.map((option) => (
              <OptionButton
                key={option}
                label={option}
                active={schoolType === option}
                onClick={() => {
                  setSchoolType(option);
                  setStep(4);
                }}
              />
            ))}
          </div>
        </QuestionBox>
      )}

      {/* Step 4 — Non-student */}
      {step === 3 && student === "No" && (
        <QuestionBox title="Did you graduate from high school?">
          <div className="flex flex-wrap justify-center gap-6">
            {["Yes", "No"].map((option) => (
              <OptionButton
                key={option}
                label={option}
                active={graduated === option}
                onClick={() => {
                  setGraduated(option);
                  setStep(4);
                }}
              />
            ))}
          </div>
        </QuestionBox>
      )}

      {/* Step 5 */}
      {step === 4 && (
        <QuestionBox title="What did you study?">
          <NoRerender>
  <input
    type="text"
    value={study}
    onChange={(e) => setStudy(e.target.value)}
    placeholder="e.g. Computer Science"
    className="border border-gray-300 rounded-md px-6 py-4 text-lg w-96 text-center focus:outline-none focus:border-blue-500"
  />
</NoRerender>

          <h2 className="text-3xl font-semibold mt-12">
            What company and role are you applying for?
          </h2>

          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g. Software Engineer"
            className="border border-gray-300 rounded-md px-6 py-4 text-lg w-96 text-center focus:outline-none focus:border-blue-500"
          />

          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="e.g. Google"
            className="border border-gray-300 rounded-md px-6 py-4 text-lg w-96 text-center focus:outline-none focus:border-blue-500"
          />

          <button
            onClick={() => setStep(5)}
            className="mt-8 bg-blue-600 text-white px-8 py-4 rounded-md hover:bg-blue-700 transition"
          >
            Next
          </button>
        </QuestionBox>
      )}

      {/* Step 6 */}
      {step === 5 && (
        <QuestionBox title="What are your key skills or experiences?">
          <textarea
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="e.g. Leadership, communication, data analysis, media management"
            className="border border-gray-300 rounded-md px-6 py-4 text-lg w-[30rem] h-28 text-center focus:outline-none focus:border-blue-500"
          />

          <button
            onClick={() => setStep(6)}
            className="mt-8 bg-blue-600 text-white px-8 py-4 rounded-md hover:bg-blue-700 transition"
          >
            Next
          </button>
        </QuestionBox>
      )}

      {/* Step 7 */}
      {step === 6 && (
        <QuestionBox title="What do you admire or know about the company?">
          <textarea
            value={companyFocus}
            onChange={(e) => setCompanyFocus(e.target.value)}
            placeholder="e.g. Promoting innovation in fintech, empowering startups, fostering collaboration"
            className="border border-gray-300 rounded-md px-6 py-4 text-lg w-[30rem] h-28 text-center focus:outline-none focus:border-blue-500"
          />

          <button
            onClick={() => setStep(7)}
            className="mt-8 bg-blue-600 text-white px-8 py-4 rounded-md hover:bg-blue-700 transition"
          >
            Next
          </button>
        </QuestionBox>
      )}

      {/* Step 8 */}
      {step === 7 && (
        <QuestionBox title="Please enter your details">
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
            className="border border-gray-300 rounded-md px-6 py-4 text-lg w-96 text-center focus:outline-none focus:border-blue-500"
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="border border-gray-300 rounded-md px-6 py-4 text-lg w-96 text-center focus:outline-none focus:border-blue-500"
          />

          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
            className="border border-gray-300 rounded-md px-6 py-4 text-lg w-96 text-center focus:outline-none focus:border-blue-500"
          />

          <button
            onClick={generateLetter}
            className="mt-8 bg-blue-600 text-white px-8 py-4 rounded-md hover:bg-blue-700 transition"
          >
            Generate Cover Letter
          </button>
        </QuestionBox>
      )}

      {/* Step 9 */}
      {step === 9 && generatedLetter && (
        <div className="mt-16 bg-gray-50 border border-gray-200 rounded-lg p-8 shadow-md">
          <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
            Your Generated Cover Letter
          </h2>

          <pre className="whitespace-pre-wrap text-left text-gray-800 text-lg leading-relaxed">
            {generatedLetter}
          </pre>

          <button
            onClick={downloadPDF}
            className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Download as PDF
          </button>
        </div>
      )}

    </div>

  </div>
);
}