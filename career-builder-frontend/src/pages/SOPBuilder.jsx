import { useState, memo } from "react";
import jsPDF from "jspdf";
import Footer from "../components/Footer";
import React from "react";

// Memoized QuestionBox to prevent unnecessary re-renders
const QuestionBox = memo(({ title, subtitle, children }) => (
  <div className="w-full bg-white rounded-2xl shadow-lg border border-gray-200 p-10 mt-12">
    <h2 className="text-3xl font-bold text-blue-700 text-center">{title}</h2>
    {subtitle && (
      <p className="text-gray-600 text-center mt-2 text-lg">{subtitle}</p>
    )}
    <div className="mt-10 flex flex-col items-center gap-8">{children}</div>
  </div>
));

export default function SOPBuilder() {
  const [step, setStep] = useState(1);

  // Form fields
  const [motivation, setMotivation] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [researchInterest, setResearchInterest] = useState("");
  const [institutionReason, setInstitutionReason] = useState("");
  const [futureGoal, setFutureGoal] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [program, setProgram] = useState("");
  const [institution, setInstitution] = useState("");

  const [generatedSOP, setGeneratedSOP] = useState("");

  // Generate SOP
  const generateSOP = () => {
    const sop = `
${fullName}
${email}
${institution ? `${institution} – ${program}` : ""}


---

${motivation}

My academic foundation in ${education || "my previous studies"} has equipped me with critical thinking, research, and communication skills that continue to shape my intellectual curiosity. These experiences not only deepened my understanding of the field but also strengthened my resolve to pursue advanced studies that combine theory and real-world impact.

Professionally, ${experience || "I have gained experience through internships, volunteer work, and collaborative projects that challenged me to apply classroom learning to practical scenarios."} These experiences have allowed me to cultivate analytical ability, adaptability, and leadership — qualities that I believe are essential for succeeding in a rigorous academic environment.

My research interests lie in ${researchInterest || "exploring the intersection of communication, culture, and development"} — an area that aligns perfectly with the focus of ${institution || "this program"}. I am particularly drawn to your institution’s commitment to fostering interdisciplinary learning and its reputation for producing socially conscious graduates.

I have chosen to apply to ${institution || "this program"} because ${institutionReason ||
      "its faculty, research facilities, and community align with my academic values and intellectual ambitions."} The opportunity to learn from and collaborate with experts in ${program ||
      "my field"} would provide an ideal platform to refine my skills and expand my scholarly perspective.

Upon completing this program, ${futureGoal ||
      "I intend to contribute to the global conversation on education, communication, and sustainable development by applying the insights gained to both academic and professional contexts."} My long-term goal is to create impact through storytelling, research, and inclusive education initiatives that empower communities.

In essence, this program represents the next step in my ongoing journey of learning, unlearning, and relearning — values I hold deeply as I seek to merge purpose with practice. I am confident that my background, determination, and passion make me a strong candidate for admission to ${institution ||
      "your institution"}.

Thank you for considering my application.

Sincerely,  
${fullName}
    `;
    setGeneratedSOP(sop.trim());
    setStep(9);
  };

  const downloadSOP = () => {
    const doc = new jsPDF({
      unit: "pt",
      format: "a4",
    });

    const leftMargin = 40;
    const topMargin = 50;
    const maxWidth = 520;

    doc.setFont("Times", "Normal");
    doc.setFontSize(12);

    doc.text(generatedSOP, leftMargin, topMargin, {
      maxWidth,
      lineHeightFactor: 1.5,
    });

    doc.save(`${fullName.replace(/\s+/g, "_")}_SOP.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-14 px-6">
      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-blue-700 tracking-tight">
          SOP Builder
        </h1>
        <p className="text-gray-600 text-lg mt-2">
          Answer simple questions → Get a refined academic Statement of Purpose
        </p>
      </div>

      <div className="max-w-3xl w-full">
        {/* Step 1 */}
        {step === 1 && (
          <QuestionBox
            title="What inspired you to pursue this field?"
            subtitle="Share a story, moment, or motivation behind your academic passion."
          >
            <textarea
              value={motivation}
              onChange={(e) => setMotivation(e.target.value)}
              placeholder="Example: My interest in journalism began when..."
              className="w-full px-5 py-4 h-36 rounded-xl border border-gray-300 
                     focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition text-lg"
            />
            <button
              onClick={() => setStep(2)}
              className="w-40 bg-blue-600 text-white font-semibold py-3 rounded-xl
                     hover:bg-blue-700 shadow-md transition"
            >
              Next
            </button>
          </QuestionBox>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <QuestionBox
            title="What is your academic background?"
            subtitle="Describe your degree, coursework, or relevant academic skills."
          >
            <textarea
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              placeholder="Example: I hold a Bachelor's in Mass Communication..."
              className="w-full px-5 py-4 h-32 rounded-xl border border-gray-300 
                     focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition text-lg"
            />
            <button
              onClick={() => setStep(3)}
              className="w-40 bg-blue-600 text-white font-semibold py-3 rounded-xl
                     hover:bg-blue-700 shadow-md transition"
            >
              Next
            </button>
          </QuestionBox>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <QuestionBox
            title="What relevant experience do you have?"
            subtitle="Internships, projects, leadership, or practical skills."
          >
            <textarea
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="Example: Served as Editor-in-Chief of student magazine..."
              className="w-full px-5 py-4 h-32 rounded-xl border border-gray-300 
                     focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition text-lg"
            />
            <button
              onClick={() => setStep(4)}
              className="w-40 bg-blue-600 text-white font-semibold py-3 rounded-xl
                     hover:bg-blue-700 shadow-md transition"
            >
              Next
            </button>
          </QuestionBox>
        )}

        {/* Step 4 */}
        {step === 4 && (
          <QuestionBox
            title="What are your research interests?"
            subtitle="Describe topics, themes, or academic problems that excite you."
          >
            <textarea
              value={researchInterest}
              onChange={(e) => setResearchInterest(e.target.value)}
              placeholder="Example: Media literacy, climate communication..."
              className="w-full px-5 py-4 h-32 rounded-xl border border-gray-300 
                     focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition text-lg"
            />
            <button
              onClick={() => setStep(5)}
              className="w-40 bg-blue-600 text-white font-semibold py-3 rounded-xl
                     hover:bg-blue-700 shadow-md transition"
            >
              Next
            </button>
          </QuestionBox>
        )}

        {/* Step 5 */}
        {step === 5 && (
          <QuestionBox
            title="Why this program or institution?"
            subtitle="Share what attracts you to the university or program."
          >
            <textarea
              value={institutionReason}
              onChange={(e) => setInstitutionReason(e.target.value)}
              placeholder="Example: The program’s focus on research and innovation..."
              className="w-full px-5 py-4 h-32 rounded-xl border border-gray-300 
                     focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition text-lg"
            />
            <button
              onClick={() => setStep(6)}
              className="w-40 bg-blue-600 text-white font-semibold py-3 rounded-xl
                     hover:bg-blue-700 shadow-md transition"
            >
              Next
            </button>
          </QuestionBox>
        )}

        {/* Step 6 */}
        {step === 6 && (
          <QuestionBox
            title="What are your future goals?"
            subtitle="Explain how the program supports your long-term vision."
          >
            <textarea
              value={futureGoal}
              onChange={(e) => setFutureGoal(e.target.value)}
              placeholder="Example: I aim to become a researcher in..."
              className="w-full px-5 py-4 h-32 rounded-xl border border-gray-300 
                     focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition text-lg"
            />
            <button
              onClick={() => setStep(7)}
              className="w-40 bg-blue-600 text-white font-semibold py-3 rounded-xl
                     hover:bg-blue-700 shadow-md transition"
            >
              Next
            </button>
          </QuestionBox>
        )}

        {/* Step 7 - Personal info */}
        {step === 7 && (
          <QuestionBox
            title="Your Personal Information"
            subtitle="These details help personalize your Statement of Purpose."
          >
            <div className="w-full space-y-4">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
                className="w-full px-5 py-4 rounded-xl border border-gray-300 
                       focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition text-lg"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full px-5 py-4 rounded-xl border border-gray-300 
                       focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition text-lg"
              />
              <input
                type="text"
                value={program}
                onChange={(e) => setProgram(e.target.value)}
                placeholder="Program Name (e.g. MSc in Media Studies)"
                className="w-full px-5 py-4 rounded-xl border border-gray-300 
                       focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition text-lg"
              />
              <input
                type="text"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                placeholder="Institution Name"
                className="w-full px-5 py-4 rounded-xl border border-gray-300 
                       focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition text-lg"
              />
            </div>

            <button
              onClick={generateSOP}
              className="mt-6 w-48 bg-blue-600 text-white font-semibold py-3 rounded-xl
                         hover:bg-blue-700 shadow-md transition"
            >
              Generate SOP
            </button>
          </QuestionBox>
        )}

        {/* Step 9 - Generated SOP */}
        {step === 9 && generatedSOP && (
          <div className="mt-16 bg-white p-10 rounded-2xl shadow-xl border border-gray-200">
            <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
              Your Generated SOP
            </h2>

            <pre className="whitespace-pre-wrap text-gray-800 text-lg leading-relaxed mb-6">
              {generatedSOP}
            </pre>

            {/* PDF BUTTON */}
            <button
              onClick={downloadSOP}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
            >
              Download as PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
