import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* LOGO */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-blue-700">Career<span className="text-gray-900">Builder</span></span>
        </Link>

        {/* CENTER NAV LINKS */}
        <div className="hidden md:flex items-center space-x-6 font-medium text-gray-600">
          <Link to="/ResumeBuilder" className="hover:text-blue-600 transition">Resumes</Link>
          <Link to="/register" className="hover:text-blue-600 transition">CV</Link>
          <Link to="/register" className="hover:text-blue-600 transition">Cover Letters</Link>
          <Link to="/register" className="hover:text-blue-600 transition">Jobs</Link>
        </div>

        {/* AUTH BUTTONS */}
        <div className="flex items-center space-x-4">
          <Link
            to="/register"
            className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition"
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
      </div>
    </nav>
  );
};

export default Navbar;
