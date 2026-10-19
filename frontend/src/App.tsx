import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import type { ReactNode } from "react";

// =====================================================
// CITIZEN PAGES
// =====================================================

import CitizenLogin from "./pages/CitizenLogin";
import CitizenRegister from "./pages/CitizenRegister";
import Dashboard from "./pages/Dashboard";
import ReportDustbin from "./pages/ReportDustbin";
import Tracking from "./pages/Tracking";
import Leaderboard from "./pages/Leaderboard";
import Rewards from "./pages/Rewards";
import Profile from "./pages/Profile";

// =====================================================
// OFFICER / MUNICIPAL PAGES
// =====================================================

import OfficerLogin from "./pages/OfficerLogin";

import MunicipalDashboard from "./pages/municipal/MunicipalDashboard";
import MunicipalReports from "./pages/municipal/MunicipalReports";
import ReportDetails from "./pages/municipal/ReportDetails";
import Teams from "./pages/municipal/Teams";
import DustbinList from "./pages/municipal/DustbinList";
import MunicipalMap from "./pages/municipal/MunicipalMap";
import Analytics from "./pages/municipal/Analytics";

// =====================================================
// CITIZEN PROTECTED ROUTE
// =====================================================

function CitizenRoute({ children }: { children: ReactNode }) {
  const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem("userRole");

  if (!token || role !== "CITIZEN") {
    return <Navigate to="/citizen-login" replace />;
  }

  return <>{children}</>;
}

// =====================================================
// MUNICIPAL / OFFICER PROTECTED ROUTE
// =====================================================

function MunicipalRoute({ children }: { children: ReactNode }) {
  const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem("userRole");

  if (!token || role !== "MUNICIPAL_OFFICER") {
    return <Navigate to="/officer-login" replace />;
  }

  return <>{children}</>;
}

// =====================================================
// APP
// =====================================================

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =================================================
            DEFAULT
        ================================================= */}

        <Route
          path="/"
          element={<Navigate to="/citizen-login" replace />}
        />

        {/* =================================================
            CITIZEN AUTH
        ================================================= */}

        <Route
          path="/citizen-login"
          element={<CitizenLogin />}
        />

        <Route
          path="/citizen-register"
          element={<CitizenRegister />}
        />

        {/* =================================================
            CITIZEN PAGES
        ================================================= */}

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

        {/* =================================================
            OFFICER LOGIN
        ================================================= */}

        {/* Main officer login URL */}
        <Route
          path="/officer-login"
          element={<OfficerLogin />}
        />

        {/* Backup/old municipal login URL */}
        <Route
          path="/municipal-login"
          element={<OfficerLogin />}
        />

        {/* =================================================
            MUNICIPAL DASHBOARD
        ================================================= */}

        <Route
          path="/municipal-dashboard"
          element={
            <MunicipalRoute>
              <MunicipalDashboard />
            </MunicipalRoute>
          }
        />

        {/* =================================================
            MUNICIPAL REPORTS
        ================================================= */}

        <Route
          path="/municipal/reports"
          element={
            <MunicipalRoute>
              <MunicipalReports />
            </MunicipalRoute>
          }
        />

        {/* =================================================
            REPORT DETAILS
        ================================================= */}

        <Route
          path="/municipal/reports/:reportId"
          element={
            <MunicipalRoute>
              <ReportDetails />
            </MunicipalRoute>
          }
        />

        {/* =================================================
            COLLECTION TEAMS
        ================================================= */}

        <Route
          path="/municipal/teams"
          element={
            <MunicipalRoute>
              <Teams />
            </MunicipalRoute>
          }
        />

        {/* =================================================
            DUSTBIN LIST
        ================================================= */}

        <Route
          path="/municipal/dustbins"
          element={
            <MunicipalRoute>
              <DustbinList />
            </MunicipalRoute>
          }
        />

        {/* =================================================
            MUNICIPAL MAP
        ================================================= */}

        <Route
          path="/municipal/map"
          element={
            <MunicipalRoute>
              <MunicipalMap />
            </MunicipalRoute>
          }
        />

        {/* =================================================
            ANALYTICS
        ================================================= */}

        <Route
          path="/municipal/analytics"
          element={
            <MunicipalRoute>
              <Analytics />
            </MunicipalRoute>
          }
        />

        {/* =================================================
            UNKNOWN URL
        ================================================= */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;