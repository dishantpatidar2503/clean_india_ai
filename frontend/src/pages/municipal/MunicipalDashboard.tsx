import {
  AlertCircle,
  BarChart3,
  CheckCircle,
  Clock,
  MapPin,
  Search,
  ShieldCheck,
  Trash2,
  Users,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function MunicipalDashboard() {
  const navigate = useNavigate();

  const reports = [
    {
      id: "CC-93D18D23",
      location: "Vijay Nagar, Ward 12",
      priority: "High",
      status: "Pending",
      time: "10 min ago",
    },
    {
      id: "CC-72A41B19",
      location: "Palasia, Ward 8",
      priority: "Medium",
      status: "In Progress",
      time: "32 min ago",
    },
    {
      id: "CC-51B92A10",
      location: "Rau, Ward 5",
      priority: "Low",
      status: "Resolved",
      time: "1 hr ago",
    },
    {
      id: "CC-44F71C08",
      location: "Bhawarkua, Ward 15",
      priority: "High",
      status: "Pending",
      time: "2 hrs ago",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7faf7]">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100">
                <ShieldCheck size={24} className="text-green-600" />
              </div>

              <div>
                <h1 className="text-xl font-bold text-gray-800">
                  CleanCity
                </h1>

                <p className="text-xs text-gray-500">
                  Municipal Management Portal
                </p>
              </div>
            </div>
          </div>

          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-gray-700">
              Municipal Officer
            </p>

            <p className="text-xs text-gray-500">
              Nagar Nigam
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Page Heading */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Municipal Control Center
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Monitor citizen reports, dustbins and collection operations.
          </p>
        </div>

        {/* Statistics */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {/* Total Reports */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
              <Trash2 size={22} className="text-blue-600" />
            </div>

            <p className="mt-4 text-3xl font-bold text-gray-800">
              42
            </p>

            <p className="text-sm text-gray-500">
              Total Reports
            </p>
          </div>

          {/* Pending */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50">
              <AlertCircle size={22} className="text-orange-500" />
            </div>

            <p className="mt-4 text-3xl font-bold text-gray-800">
              12
            </p>

            <p className="text-sm text-gray-500">
              Pending
            </p>
          </div>

          {/* In Progress */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-50">
              <Clock size={22} className="text-yellow-600" />
            </div>

            <p className="mt-4 text-3xl font-bold text-gray-800">
              8
            </p>

            <p className="text-sm text-gray-500">
              In Progress
            </p>
          </div>

          {/* Resolved */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">
              <CheckCircle size={22} className="text-green-600" />
            </div>

            <p className="mt-4 text-3xl font-bold text-gray-800">
              22
            </p>

            <p className="text-sm text-gray-500">
              Resolved
            </p>
          </div>

          {/* Teams */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50">
              <Users size={22} className="text-purple-600" />
            </div>

            <p className="mt-4 text-3xl font-bold text-gray-800">
              6
            </p>

            <p className="text-sm text-gray-500">
              Collection Teams
            </p>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <button
            onClick={() => navigate("/municipal/reports")}
            className="rounded-2xl border border-gray-100 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <Trash2 size={23} className="text-green-600" />

            <h3 className="mt-3 font-bold text-gray-800">
              Reports
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Review and manage citizen reports.
            </p>
          </button>

          <button
            onClick={() => navigate("/municipal/teams")}
            className="rounded-2xl border border-gray-100 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <Users size={23} className="text-blue-600" />

            <h3 className="mt-3 font-bold text-gray-800">
              Collection Teams
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Manage municipal cleaning teams.
            </p>
          </button>

          <button
            onClick={() => navigate("/municipal/dustbins")}
            className="rounded-2xl border border-gray-100 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <MapPin size={23} className="text-orange-500" />

            <h3 className="mt-3 font-bold text-gray-800">
              Dustbins
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              View registered dustbins and status.
            </p>
          </button>

          <button
            onClick={() => navigate("/municipal/analytics")}
            className="rounded-2xl border border-gray-100 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <BarChart3 size={23} className="text-purple-600" />

            <h3 className="mt-3 font-bold text-gray-800">
              Analytics
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              View waste management performance.
            </p>
          </button>
        </div>

        {/* Recent Reports */}
        <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-bold text-gray-800">
                Recent Reports
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Latest citizen-submitted dustbin reports.
              </p>
            </div>

            <button
              onClick={() => navigate("/municipal/reports")}
              className="rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
            >
              View All Reports
            </button>
          </div>

          {/* Search */}
          <div className="relative mt-5">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search report ID or location..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none focus:border-green-400 focus:bg-white"
            />
          </div>

          {/* Table */}
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-gray-100 text-left text-xs uppercase text-gray-400">
                  <th className="pb-3 font-semibold">
                    Report ID
                  </th>

                  <th className="pb-3 font-semibold">
                    Location
                  </th>

                  <th className="pb-3 font-semibold">
                    Priority
                  </th>

                  <th className="pb-3 font-semibold">
                    Status
                  </th>

                  <th className="pb-3 font-semibold">
                    Time
                  </th>

                  <th className="pb-3 font-semibold">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {reports.map((report) => (
                  <tr
                    key={report.id}
                    className="border-b border-gray-50 last:border-0"
                  >
                    <td className="py-4 text-sm font-semibold text-gray-800">
                      {report.id}
                    </td>

                    <td className="py-4 text-sm text-gray-600">
                      {report.location}
                    </td>

                    <td className="py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          report.priority === "High"
                            ? "bg-red-50 text-red-600"
                            : report.priority === "Medium"
                            ? "bg-orange-50 text-orange-600"
                            : "bg-green-50 text-green-600"
                        }`}
                      >
                        {report.priority}
                      </span>
                    </td>

                    <td className="py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          report.status === "Resolved"
                            ? "bg-green-50 text-green-600"
                            : report.status === "In Progress"
                            ? "bg-blue-50 text-blue-600"
                            : "bg-orange-50 text-orange-600"
                        }`}
                      >
                        {report.status}
                      </span>
                    </td>

                    <td className="py-4 text-sm text-gray-500">
                      {report.time}
                    </td>

                    <td className="py-4">
                      <button
                        onClick={() =>
                          navigate(
                            `/municipal/reports/${report.id}`
                          )
                        }
                        className="rounded-lg bg-green-50 px-3 py-2 text-xs font-semibold text-green-700 hover:bg-green-100"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Map Preview */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-gray-800">
                  Municipal Map
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Monitor reported dustbin locations.
                </p>
              </div>

              <MapPin size={22} className="text-green-600" />
            </div>

            <div className="mt-5 flex h-52 items-center justify-center rounded-2xl bg-green-50">
              <div className="text-center">
                <MapPin
                  size={40}
                  className="mx-auto text-green-500"
                />

                <p className="mt-3 font-semibold text-gray-700">
                  GIS Map
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  View dustbins and active reports
                </p>

                <button
                  onClick={() => navigate("/municipal/map")}
                  className="mt-4 rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
                >
                  Open Map
                </button>
              </div>
            </div>
          </div>

          {/* Operational Analytics */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-gray-800">
                  Operational Overview
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Current municipal performance.
                </p>
              </div>

              <BarChart3 size={22} className="text-purple-600" />
            </div>

            <div className="mt-6 space-y-5">
              <div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                    Today's Resolution
                  </span>

                  <span className="text-sm font-bold text-gray-800">
                    72%
                  </span>
                </div>

                <div className="mt-2 h-2 rounded-full bg-gray-100">
                  <div
                    className="h-2 rounded-full bg-green-500"
                    style={{ width: "72%" }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-blue-50 p-4">
                <div className="flex items-center gap-3">
                  <Clock size={20} className="text-blue-600" />

                  <span className="text-sm font-semibold text-gray-700">
                    Average Response
                  </span>
                </div>

                <span className="font-bold text-blue-600">
                  38 min
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-red-50 p-4">
                <div className="flex items-center gap-3">
                  <AlertCircle
                    size={20}
                    className="text-red-500"
                  />

                  <span className="text-sm font-semibold text-gray-700">
                    High Priority
                  </span>
                </div>

                <span className="font-bold text-red-500">
                  5
                </span>
              </div>
            </div>

            <button
              onClick={() => navigate("/municipal/analytics")}
              className="mt-5 w-full rounded-xl border border-purple-200 bg-purple-50 py-3 text-sm font-semibold text-purple-700 hover:bg-purple-100"
            >
              View Detailed Analytics
            </button>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 rounded-2xl border border-green-100 bg-green-50 p-5">
          <div className="flex items-start gap-3">
            <ShieldCheck
              size={22}
              className="mt-0.5 shrink-0 text-green-600"
            />

            <div>
              <h3 className="font-semibold text-green-800">
                Municipal Control Center
              </h3>

              <p className="mt-1 text-sm leading-6 text-green-700">
                This dashboard is intended for authorized municipal
                officers to review reports, coordinate collection
                teams and monitor city cleanliness operations.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MunicipalDashboard;