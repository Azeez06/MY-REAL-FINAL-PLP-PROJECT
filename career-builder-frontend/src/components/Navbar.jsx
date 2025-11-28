import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/cb-logo.png"; 

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-[#fdf7f1] border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LEFT - LOGO + NAME */}
        <Link to="/" className="flex items-center space-x-3">
          <img src={Logo} alt="CB Logo" className="w-10 h-10 rounded-full" />

          <span className="text-xl font-bold text-blue-700 tracking-wide">
            Career<span className="text-gray-900">Builder</span>
          </span>
        </Link>

        {/* DESKTOP NAV LINKS */}
        <div className="hidden md:flex items-center space-x-6 font-medium text-gray-700">
          <Link to="/register" className="hover:text-blue-600 transition">Resumes</Link>
          <Link to="/register" className="hover:text-blue-600 transition">CV</Link>
          <Link to="/register" className="hover:text-blue-600 transition">Cover Letters</Link>
          <Link to="/register" className="hover:text-blue-600 transition">Portfolio</Link>
        </div>

        {/* DESKTOP AUTH BUTTONS */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/register"
            className="border border-blue-600 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-50 transition"
          >
            Sign In
          </Link>

          <Link
            to="/register"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Create Account
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-gray-900 text-3xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {menuOpen && (
        <div className="md:hidden bg-[#fdf7f1] shadow-lg border-t border-gray-200 p-5 space-y-4">

          <Link to="/register" className="block text-gray-700 text-lg">
            Resumes
          </Link>
          <Link to="/register" className="block text-gray-700 text-lg">
            CV
          </Link>
          <Link to="/register" className="block text-gray-700 text-lg">
            Cover Letters
          </Link>
          <Link to="/register" className="block text-gray-700 text-lg">
            Portfolio
          </Link>
        
        </div>
      )}
    </nav>
  );
};

export default Navbar;
