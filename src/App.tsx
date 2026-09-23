import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import ReportDustbin from "./pages/ReportDustbin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/report" element={<ReportDustbin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;