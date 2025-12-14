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

import ProtectedRoute from "./components/ProtectedRoute";

// New pages
import SetUsername from "./pages/SetUsername";
import PublicPortfolio from "./pages/PublicPortfolio";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>

        {/* Public Pages */}
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />

        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />

        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        {/* Protected Pages */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/ResumeBuilder"
          element={
            <ProtectedRoute>
              <Layout>
                <ResumeBuilder />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/CoverLetterBuilder"
          element={
            <ProtectedRoute>
              <Layout>
                <CoverLetterBuilder />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/SOPBuilder"
          element={
            <ProtectedRoute>
              <Layout>
                <SOPBuilder />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/JobAlerts"
          element={
            <ProtectedRoute>
              <Layout>
                <JobAlerts />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Username setup */}
        <Route
          path="/set-username"
          element={
            <ProtectedRoute>
              <Layout>
                <SetUsername />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Portfolio Editor / Builder */}
        <Route
          path="/PortfolioBuilder"
          element={
            <ProtectedRoute>
              <Layout>
                <PortfolioBuilder />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/Settings"
          element={
            <ProtectedRoute>
              <Layout>
                <Settings />
              </Layout>
            </ProtectedRoute>
          }
        />
{/* Public Portfolio View (MUST BE LAST) */}
<Route
  path="/:username"
  element={
    <Layout>
      <PublicPortfolio />
    </Layout>
  }
/>

      </Routes>
    </Router>
  );
}

export default App;
