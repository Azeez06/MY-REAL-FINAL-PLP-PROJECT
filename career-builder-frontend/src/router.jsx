export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-20">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">

        {/* Left Section */}
        <p className="text-sm">
          © {new Date().getFullYear()} Career Builder. All rights reserved.
        </p>

        {/* Center Links */}
        <div className="flex gap-6 text-sm mt-3 md:mt-0">
          <a href="/resume" className="hover:text-white">Resume Builder</a>
          <a href="/cover-letter" className="hover:text-white">Cover Letter</a>
          <a href="/sop" className="hover:text-white">SOP Builder</a>
          <a href="/portfolio" className="hover:text-white">Portfolio</a>
        </div>

        {/* Right Section */}
        <p className="text-sm">
          Built with STEM for Nigerians
        </p>

      </div>
    </footer>
  );
}
