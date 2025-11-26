import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ResumeBuilder from "./pages/ResumeBuilder";
import CoverLetterBuilder from "./pages/CoverLetterBuilder";
import SOPBuilder from "./pages/SOPBuilder";
import JobAlerts from "./pages/JobAlerts";
import PortfolioBuilder from "./pages/PortfolioBuilder";
import Settings from "./pages/Settings";

// ✅ Import ProtectedRoute
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>

        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Pages */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ResumeBuilder"
          element={
            <ProtectedRoute>
              <ResumeBuilder />
            </ProtectedRoute>
          }
        />

        <Route
          path="/CoverLetterBuilder"
          element={
            <ProtectedRoute>
              <CoverLetterBuilder />
            </ProtectedRoute>
          }
        />

        <Route
          path="/SOPBuilder"
          element={
            <ProtectedRoute>
              <SOPBuilder />
            </ProtectedRoute>
          }
        />

        <Route
          path="/JobAlerts"
          element={
            <ProtectedRoute>
              <JobAlerts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/PortfolioBuilder"
          element={
            <ProtectedRoute>
              <PortfolioBuilder />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
