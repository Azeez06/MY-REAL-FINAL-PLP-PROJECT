export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 mt-24 border-t-4 border-blue-700 shadow-xl w-full">
      <div className="px-10 py-12 w-full">

        {/* === TOP ROW === */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-12 w-full">

          {/* BRAND */}
          <div className="text-center md:text-left mb-8 md:mb-0 max-w-sm">
            <h2 className="text-2xl font-extrabold tracking-wide text-white">
              CAREER BUILDER
            </h2>
            <p className="text-gray-400 text-sm mt-2 leading-relaxed">
              Nigeria’s most trusted toolkit for resumes, cover letters,
              SOPs, and professional career growth.
            </p>
          </div>

          {/* NAVIGATION */}
          <div className="grid grid-cols-2 md:grid-cols-1 gap-4 text-sm font-medium text-center md:text-left">
            <a href="/ResumeBuilder" className="hover:text-white transition">Resume Builder</a>
            <a href="/CoverLetterBuilder" className="hover:text-white transition">Cover Letter</a>
            <a href="/SOPBuilder" className="hover:text-white transition">SOP Builder</a>
            <a href="/PortfolioBuilder" className="hover:text-white transition">Portfolio</a>
          </div>

          {/* SOCIAL */}
          <div className="flex flex-col items-center md:items-end mt-10 md:mt-0">
            <p className="text-sm text-gray-400 mb-3">Follow Us</p>

            <div className="flex gap-5 text-2xl">

              {/* LinkedIn */}
              <a
                href="#"
                className="hover:text-blue-400 transition"
              >
                <i className="fab fa-linkedin"></i>
              </a>

              {/* Twitter */}
              <a
                href="#"
                className="hover:text-blue-300 transition"
              >
                <i className="fab fa-twitter"></i>
              </a>

              {/* Facebook */}
              <a
                href="#"
                className="hover:text-blue-500 transition"
              >
                <i className="fab fa-facebook"></i>
              </a>

              {/* Instagram */}
              <a
                href="#"
                className="hover:text-pink-400 transition"
              >
                <i className="fab fa-instagram"></i>
              </a>

              {/* GitHub */}
              <a
                href="#"
                className="hover:text-gray-100 transition"
              >
                <i className="fab fa-github"></i>
              </a>

            </div>
          </div>

        </div>

        {/* === BOTTOM ROW === */}
        <div className="border-t border-gray-700 pt-5 text-center text-[13px] font-semibold text-gray-400 tracking-wide">
          © {new Date().getFullYear()} Career Builder • Empowering Nigerians for global opportunities.
        </div>

      </div>
    </footer>
  );
}
