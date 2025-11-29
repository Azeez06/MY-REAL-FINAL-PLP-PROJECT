export default function Footer() {
  return (
    <footer className="w-full bg-[#f6f6f1] border-t-4 border-blue-600 shadow-lg">

      <div className="px-6 md:px-10 py-8 md:py-12 w-full">

        {/* === TOP ROW === */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-8 md:mb-12 w-full">

          {/* BRAND */}
          <div className="text-center md:text-left mb-6 md:mb-0 max-w-sm">
            <h2 className="text-xl md:text-2xl font-extrabold tracking-wide text-blue-900">
              CAREER BUILDER
            </h2>

            <p className="text-gray-700 text-sm mt-2 leading-relaxed max-w-xs mx-auto md:mx-0">
              Nigeria’s most trusted toolkit for resumes, cover letters,
              SOPs, and professional career growth.
            </p>
          </div>

          {/* NAVIGATION – Hidden on Mobile */}
          <div
            className="
              hidden md:grid 
              grid-cols-1 gap-4 
              text-sm font-medium 
              text-left text-gray-800
            "
          >
            <a href="/Dashboard" className="hover:text-blue-700 transition">Resume Builder</a>
            <a href="/CoverLetterBuilder" className="hover:text-blue-700 transition">Cover Letter</a>
            <a href="/SOPBuilder" className="hover:text-blue-700 transition">SOP Builder</a>
            <a href="/PortfolioBuilder" className="hover:text-blue-700 transition">Portfolio</a>
          </div>

          {/* SOCIAL */}
          <div className="flex flex-col items-center md:items-end mt-6 md:mt-0">
            <p className="text-sm text-gray-700 mb-2 md:mb-3">Follow Us</p>

            <div className="flex gap-4 md:gap-5 text-xl md:text-2xl text-blue-700">
              <a href="#" className="hover:text-blue-900 transition"><i className="fab fa-linkedin"></i></a>
              <a href="#" className="hover:text-blue-900 transition"><i className="fab fa-twitter"></i></a>
              <a href="#" className="hover:text-blue-900 transition"><i className="fab fa-facebook"></i></a>
              <a href="#" className="hover:text-pink-500 transition"><i className="fab fa-instagram"></i></a>
              <a href="#" className="hover:text-gray-900 transition"><i className="fab fa-github"></i></a>
            </div>
          </div>

        </div>

        {/* === BOTTOM ROW === */}
        <div className="border-t border-gray-400 pt-4 md:pt-5 text-center text-xs md:text-[13px] font-semibold text-gray-700 tracking-wide">
          © {new Date().getFullYear()} Career Builder • Empowering Nigerians for global opportunities.
        </div>

      </div>
    </footer>
  );
}
