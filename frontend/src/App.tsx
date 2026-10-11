import type { ReactNode } from "react";
import {
  BrowserRouter,
  Navigate,
  Link,
  Route,
  Routes,
} from "react-router-dom";

// ==================== AUTH ====================
import CitizenLogin from "./pages/CitizenLogin";
import CitizenRegister from "./pages/CitizenRegister";

import OfficerLogin from "./pages/OfficerLogin";
import OfficerRegister from "./pages/OfficerRegister";

// ==================== CITIZEN ====================
import Dashboard from "./pages/Dashboard";
import ReportDustbin from "./pages/ReportDustbin";
import Tracking from "./pages/Tracking";
import Leaderboard from "./pages/Leaderboard";
import Rewards from "./pages/Rewards";
import Profile from "./pages/Profile";

// ==================== MUNICIPAL ====================
import MunicipalDashboard from "./pages/municipal/MunicipalDashboard";
import MunicipalReports from "./pages/municipal/MunicipalReports";
import ReportDetails from "./pages/municipal/ReportDetails";
import Teams from "./pages/municipal/Teams";
import Dustbins from "./pages/municipal/DustbinList";
import MunicipalMap from "./pages/municipal/MunicipalMap";
import Analytics from "./pages/municipal/Analytics";

// ==================== HOME ====================
function Home() {
  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center">

        <h1 className="text-4xl font-bold text-green-700">
          CleanCity AI
        </h1>

        <p className="text-gray-600 mt-2 mb-8">
          Smart Waste Management Platform
        </p>

        <div className="space-y-4">

          <Link
            to="/citizen-login"
            className="block w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
          >
            Citizen Login
          </Link>

          <Link
            to="/citizen-register"
            className="block w-full border border-green-600 text-green-700 py-3 rounded-lg font-semibold hover:bg-green-50"
          >
            Create Citizen Account
          </Link>

          <Link
            to="/officer-login"
            className="block w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600"
          >
            Officer Login
          </Link>

          <Link
            to="/officer-register"
            className="block w-full border border-orange-500 text-orange-600 py-3 rounded-lg font-semibold hover:bg-orange-50"
          >
            Create Officer Account
          </Link>

        </div>

      </div>
    </div>
  );
}

// ==================== CITIZEN ROUTE ====================
function CitizenRoute({
  children,
}: {
  children: ReactNode;
}) {
  const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem("userRole");

  if (!token || role !== "CITIZEN") {
    return <Navigate to="/citizen-login" replace />;
  }

  return <>{children}</>;
}

// ==================== MUNICIPAL ROUTE ====================
function MunicipalRoute({
  children,
}: {
  children: ReactNode;
}) {
  const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem("userRole");

  if (!token || role !== "MUNICIPAL_OFFICER") {
    return <Navigate to="/officer-login" replace />;
  }

  return <>{children}</>;
}

// ==================== APP ====================
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= HOME ================= */}
        <Route path="/" element={<Home />} />

        {/* ================= AUTH ================= */}

        <Route
          path="/citizen-login"
          element={<CitizenLogin />}
        />

        <Route
          path="/citizen-register"
          element={<CitizenRegister />}
        />

        <Route
          path="/officer-login"
          element={<OfficerLogin />}
        />

        <Route
          path="/officer-register"
          element={<OfficerRegister />}
        />

        {/* ================= CITIZEN ================= */}

        <Route
          path="/citizen-dashboard"
          element={
            <CitizenRoute>
              <Dashboard />
            </CitizenRoute>
          }
        />

        <Route
          path="/report-dustbin"
          element={
            <CitizenRoute>
              <ReportDustbin />
            </CitizenRoute>
          }
        />

        <Route
          path="/tracking"
          element={
            <CitizenRoute>
              <Tracking />
            </CitizenRoute>
          }
        />

        <Route
          path="/leaderboard"
          element={
            <CitizenRoute>
              <Leaderboard />
            </CitizenRoute>
          }
        />

        <Route
          path="/rewards"
          element={
            <CitizenRoute>
              <Rewards />
            </CitizenRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <CitizenRoute>
              <Profile />
            </CitizenRoute>
          }
        />

        {/* ================= MUNICIPAL ================= */}

        <Route
          path="/municipal"
          element={
            <MunicipalRoute>
              <MunicipalDashboard />
            </MunicipalRoute>
          }
        />

        <Route
          path="/municipal/reports"
          element={
            <MunicipalRoute>
              <MunicipalReports />
            </MunicipalRoute>
          }
        />

        <Route
          path="/municipal/reports/:reportId"
          element={
            <MunicipalRoute>
              <ReportDetails />
            </MunicipalRoute>
          }
        />

        <Route
          path="/municipal/teams"
          element={
            <MunicipalRoute>
              <Teams />
            </MunicipalRoute>
          }
        />

        <Route
          path="/municipal/dustbins"
          element={
            <MunicipalRoute>
              <Dustbins />
            </MunicipalRoute>
          }
        />

        <Route
          path="/municipal/map"
          element={
            <MunicipalRoute>
              <MunicipalMap />
            </MunicipalRoute>
          }
        />

        <Route
          path="/municipal/analytics"
          element={
            <MunicipalRoute>
              <Analytics />
            </MunicipalRoute>
          }
        />

        {/* ================= FALLBACK ================= */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;