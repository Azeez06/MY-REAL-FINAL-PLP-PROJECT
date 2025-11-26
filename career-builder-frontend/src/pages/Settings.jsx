import { useState } from "react";
import Footer from "../components/Footer";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState("English");
  const [jobAlerts, setJobAlerts] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-16 px-6">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400">
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your account, preferences, and notifications
          </p>
        </div>

        {/* Profile Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Profile Settings
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200"
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200"
            />
            <textarea
              placeholder="Short Bio"
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition">
              Save Changes
            </button>
          </div>
        </div>

        {/* App Preferences */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            App Preferences
          </h2>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">
                Dark Mode
              </span>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`w-12 h-6 rounded-full ${
                  darkMode ? "bg-blue-600" : "bg-gray-400"
                } relative`}
              >
                <span
                  className={`block w-5 h-5 bg-white rounded-full absolute top-0.5 transition ${
                    darkMode ? "right-0.5" : "left-0.5"
                  }`}
                ></span>
              </button>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">
                Language
              </span>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200"
              >
                <option>English</option>
                <option>French</option>
                <option>Spanish</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Notifications
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">
                Receive Job Alerts
              </span>
              <button
                onClick={() => setJobAlerts(!jobAlerts)}
                className={`w-12 h-6 rounded-full ${
                  jobAlerts ? "bg-blue-600" : "bg-gray-400"
                } relative`}
              >
                <span
                  className={`block w-5 h-5 bg-white rounded-full absolute top-0.5 transition ${
                    jobAlerts ? "right-0.5" : "left-0.5"
                  }`}
                ></span>
              </button>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">
                Email Notifications
              </span>
              <button
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={`w-12 h-6 rounded-full ${
                  emailNotifications ? "bg-blue-600" : "bg-gray-400"
                } relative`}
              >
                <span
                  className={`block w-5 h-5 bg-white rounded-full absolute top-0.5 transition ${
                    emailNotifications ? "right-0.5" : "left-0.5"
                  }`}
                ></span>
              </button>
            </div>
          </div>
        </div>

        {/* Account & Security */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Account & Security
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">
                Two-Factor Authentication
              </span>
              <button
                onClick={() => setTwoFactorAuth(!twoFactorAuth)}
                className={`w-12 h-6 rounded-full ${
                  twoFactorAuth ? "bg-blue-600" : "bg-gray-400"
                } relative`}
              >
                <span
                  className={`block w-5 h-5 bg-white rounded-full absolute top-0.5 transition ${
                    twoFactorAuth ? "right-0.5" : "left-0.5"
                  }`}
                ></span>
              </button>
            </div>

            <button className="text-blue-600 hover:underline">
              Change Password
            </button>
            <button className="text-red-600 hover:underline">
              Delete Account
            </button>
          </div>
        </div>

        {/* App Info */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Career Builder App — Version 1.0.0
          </p>
          <button className="text-blue-600 hover:underline mt-2">
            Contact Support
          </button>
        </div>
      </div>
       <Footer />
    </div>
  );
}
