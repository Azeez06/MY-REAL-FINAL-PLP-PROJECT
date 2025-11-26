import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  CheckCircle,
  FileText,
  PenTool,
  Bell,
  Monitor,
  Download,
  BookOpen,
  Briefcase,
} from "lucide-react";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-20 bg-gradient-to-br from-blue-50 to-white">
        {/* Left side - Text */}
        <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Free AI Resume Builder: <br /> Make Yours in Minutes
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Build a professional resume that stands out. Fast, free, and powered by AI 
            tailored to your career goals.
          </p>
          <a
            href="/register"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Get Started
          </a>
        </div>

        {/* Right side - Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src="/CVVVV.jpg"
            alt="Sample resume"
            className="w-full max-w-md rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Build Your Professional CV in 3 Easy Steps
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
          {/* Step 1 */}
          <div className="bg-gray-50 p-8 rounded-2xl shadow-md text-center hover:shadow-xl transition duration-300">
            <div className="text-blue-600 text-4xl font-bold mb-4">1</div>
            <h3 className="text-xl font-semibold mb-3">Create an Account</h3>
            <p className="text-gray-600">
              Sign up with your email to get started. It’s fast, free, and secure.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-gray-50 p-8 rounded-2xl shadow-md text-center hover:shadow-xl transition duration-300">
            <div className="text-blue-600 text-4xl font-bold mb-4">2</div>
            <h3 className="text-xl font-semibold mb-3">Fill in Your Details</h3>
            <p className="text-gray-600">
              Add your personal info, education, experience, and skills using our guided form.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-gray-50 p-8 rounded-2xl shadow-md text-center hover:shadow-xl transition duration-300">
            <div className="text-blue-600 text-4xl font-bold mb-4">3</div>
            <h3 className="text-xl font-semibold mb-3">Download Your Resume</h3>
            <p className="text-gray-600">
              Choose a template, preview your resume, and download it instantly as PDF.
            </p>
          </div>
        </div>
      </section>

      {/* Why Career Builder is the Best Section */}
      <section className="py-20 bg-gradient-to-b from-white via-blue-50 to-blue-100">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          Why Choose <span className="text-blue-600">Career Builder?</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-6">
          {/* Box 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition duration-300 text-center">
            <CheckCircle className="text-blue-600 w-10 h-10 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-blue-600 mb-3">ATS Friendly</h3>
            <p className="text-gray-600">
              Our templates are optimized to pass Applicant Tracking Systems (ATS) used by top companies.
            </p>
          </div>

          {/* Box 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition duration-300 text-center">
            <FileText className="text-blue-600 w-10 h-10 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-blue-600 mb-3">Beautiful CVs & Resumes</h3>
            <p className="text-gray-600">
              Build elegant, professional-looking resumes that stand out from the crowd.
            </p>
          </div>

          {/* Box 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition duration-300 text-center">
            <PenTool className="text-blue-600 w-10 h-10 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-blue-600 mb-3">Great Cover Letters</h3>
            <p className="text-gray-600">
              Generate personalized cover letters that align with your experience and job role.
            </p>
          </div>

          {/* Box 4 */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition duration-300 text-center">
            <Bell className="text-blue-600 w-10 h-10 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-blue-600 mb-3">Smart Job Notifications</h3>
            <p className="text-gray-600">
              Get job alerts based on your career goals and interests directly to your dashboard.
            </p>
          </div>

          {/* Box 5 */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition duration-300 text-center">
            <Monitor className="text-blue-600 w-10 h-10 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-blue-600 mb-3">User-Friendly Interface</h3>
            <p className="text-gray-600">
              Our platform is simple, clean, and easy to use. In fact, you dont need a tech skills before you use it.
            </p>
          </div>

          {/* Box 6 */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition duration-300 text-center">
            <Download className="text-blue-600 w-10 h-10 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-blue-600 mb-3">Instant Download</h3>
            <p className="text-gray-600">
              Once done, download your CV or cover letter instantly as a PDF. You dont have to waith.
            </p>
          </div>

          {/* Box 7 - SOP Creation */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition duration-300 text-center">
            <BookOpen className="text-blue-600 w-10 h-10 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-blue-600 mb-3">SOP Generator</h3>
            <p className="text-gray-600">
              Write a compelling Statement of Purpose (SOP) for your academic or professional journey with ease.
            </p>
          </div>

          {/* Box 8 - Portfolio Builder */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition duration-300 text-center">
            <Briefcase className="text-blue-600 w-10 h-10 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-blue-600 mb-3">Portfolio Builder</h3>
            <p className="text-gray-600">
              Showcase your skills, experience, and achievements beautifully — all in one professional portfolio.
            </p>
          </div>
          
        </div>
         <Footer />
      </section>
    </>
  );
}
