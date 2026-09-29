import type { ReactNode } from "react";
import {
  BrowserRouter,
  Navigate,
  Link,
  Route,
  Routes,
} from "react-router-dom";

// Auth
import CitizenLogin from "./pages/CitizenLogin";
import OfficerLogin from "./pages/OfficerLogin";

// Citizen
import Dashboard from "./pages/Dashboard";
import ReportDustbin from "./pages/ReportDustbin";
import Tracking from "./pages/Tracking";
import Leaderboard from "./pages/Leaderboard";
import Rewards from "./pages/Rewards";
import Profile from "./pages/Profile";

// Municipal
import MunicipalDashboard from "./pages/municipal/MunicipalDashboard";
import MunicipalReports from "./pages/municipal/MunicipalReports";
import ReportDetails from "./pages/municipal/ReportDetails";
import Teams from "./pages/municipal/Teams";
import Dustbins from "./pages/municipal/DustbinList";
import MunicipalMap from "./pages/municipal/MunicipalMap";
import Analytics from "./pages/municipal/Analytics";


// =========================================================
// HOME
// =========================================================

function Home() {
  return (
    <div className="min-h-screen bg-[#f7faf7] flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm border border-gray-100">

        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-3xl">
            ♻️
          </div>

          <h1 className="mt-5 text-3xl font-bold text-gray-800">
            CleanCity
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Smart Waste Management System
          </p>
        </div>

        <div className="mt-8 space-y-4">

          <Link
            to="/citizen-login"
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-green-600 px-5 py-4 font-semibold text-white hover:bg-green-700"
          >
            👤 Citizen Login
          </Link>

          <Link
            to="/officer-login"
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 px-5 py-4 font-semibold text-white hover:bg-orange-600"
          >
            🏛️ Municipal Officer Login
          </Link>

        </div>
      </div>
    </div>
  );
}


// =========================================================
// CITIZEN PROTECTED ROUTE
// =========================================================

function CitizenRoute({
  children,
}: {
  children: ReactNode;
}) {
  const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem("userRole");

  if (!token || role !== "CITIZEN") {
    return (
      <Navigate
        to="/citizen-login"
        replace
      />
    );
  }

  return <>{children}</>;
}


// =========================================================
// MUNICIPAL PROTECTED ROUTE
// =========================================================

function MunicipalRoute({
  children,
}: {
  children: ReactNode;
}) {
  const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem("userRole");

  if (!token || role !== "MUNICIPAL_OFFICER") {
    return (
      <Navigate
        to="/officer-login"
        replace
      />
    );
  }

  return <>{children}</>;
}


// =========================================================
// APP
// =========================================================

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* LOGIN */}
        <Route
          path="/citizen-login"
          element={<CitizenLogin />}
        />

        <Route
          path="/officer-login"
          element={<OfficerLogin />}
        />


        {/* =================================================
            CITIZEN
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
          path="/report"
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
            MUNICIPAL
        ================================================= */}

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


        {/* UNKNOWN */}
        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;