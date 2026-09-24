import { BrowserRouter, Routes, Route } from "react-router-dom";

// ====================
// Citizen Pages
// ====================
import Dashboard from "./pages/Dashboard";
import ReportDustbin from "./pages/ReportDustbin";
import Leaderboard from "./pages/Leaderboard";
import Rewards from "./pages/Rewards";
import Profile from "./pages/Profile";

// ====================
// Municipal Pages
// ====================
import MunicipalDashboard from "./pages/municipal/MunicipalDashboard";
import MunicipalReports from "./pages/municipal/MunicipalReports";
import ReportDetails from "./pages/municipal/ReportDetails";
import Teams from "./pages/municipal/Teams";
import Dustbins from "./pages/municipal/DustbinList";
import MunicipalMap from "./pages/municipal/MunicipalMap";
import Analytics from "./pages/municipal/Analytics";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ==================== */}
        {/* Citizen App */}
        {/* ==================== */}

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/report"
          element={<ReportDustbin />}
        />

        <Route
          path="/leaderboard"
          element={<Leaderboard />}
        />

        <Route
          path="/rewards"
          element={<Rewards />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        {/* ==================== */}
        {/* Municipal / Nagar Nigam */}
        {/* ==================== */}

        <Route
          path="/municipal"
          element={<MunicipalDashboard />}
        />

        <Route
          path="/municipal/reports"
          element={<MunicipalReports />}
        />

        <Route
          path="/municipal/reports/:reportId"
          element={<ReportDetails />}
        />

        <Route
          path="/municipal/teams"
          element={<Teams />}
        />

        <Route
          path="/municipal/dustbins"
          element={<Dustbins />}
        />

        <Route
          path="/municipal/map"
          element={<MunicipalMap />}
        />

        <Route
          path="/municipal/analytics"
          element={<Analytics />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;