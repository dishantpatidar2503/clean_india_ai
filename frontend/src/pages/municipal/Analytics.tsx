import {
  ArrowLeft,
  BarChart3,
  CheckCircle,
  Clock,
  FileText,
  TrendingUp,
  Users,
  AlertTriangle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Analytics() {
  const navigate = useNavigate();

  const weeklyReports = [
    { day: "Mon", reports: 8 },
    { day: "Tue", reports: 12 },
    { day: "Wed", reports: 7 },
    { day: "Thu", reports: 15 },
    { day: "Fri", reports: 11 },
    { day: "Sat", reports: 9 },
    { day: "Sun", reports: 6 },
  ];

  const wardData = [
    { ward: "Ward 12", reports: 12 },
    { ward: "Ward 8", reports: 9 },
    { ward: "Ward 15", reports: 8 },
    { ward: "Ward 5", reports: 7 },
    { ward: "Ward 7", reports: 6 },
  ];

  const priorityData = [
    { name: "High", count: 12, bg: "bg-red-500" },
    { name: "Medium", count: 18, bg: "bg-orange-500" },
    { name: "Low", count: 12, bg: "bg-green-500" },
  ];

  const teams = [
    {
      name: "Team A",
      completed: 18,
      active: 1,
      rate: "90%",
    },
    {
      name: "Team B",
      completed: 15,
      active: 2,
      rate: "86%",
    },
    {
      name: "Team C",
      completed: 13,
      active: 1,
      rate: "82%",
    },
    {
      name: "Team D",
      completed: 11,
      active: 2,
      rate: "78%",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7faf7]">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-4">
          <button
            onClick={() => navigate("/municipal")}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>

          <div>
            <h1 className="text-xl font-bold text-gray-800">
              Municipal Analytics
            </h1>
            <p className="text-xs text-gray-500">
              Waste management performance overview
            </p>
          </div>

          <div className="ml-auto flex h-10 w-10 items-center justify-center rounded-xl bg-green-50">
            <BarChart3 size={20} className="text-green-600" />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Page Title */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Performance Analytics
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Monitor reports, response time and collection team performance.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total Reports */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                <FileText size={22} className="text-blue-600" />
              </div>

              <TrendingUp size={18} className="text-green-500" />
            </div>

            <p className="mt-4 text-3xl font-bold text-gray-800">42</p>
            <p className="mt-1 text-sm text-gray-500">Total Reports</p>

            <p className="mt-3 text-xs font-semibold text-green-600">
              +18% this week
            </p>
          </div>

          {/* Resolved */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">
              <CheckCircle size={22} className="text-green-600" />
            </div>

            <p className="mt-4 text-3xl font-bold text-gray-800">22</p>
            <p className="mt-1 text-sm text-gray-500">Resolved Reports</p>

            <p className="mt-3 text-xs font-semibold text-green-600">
              72% resolution rate
            </p>
          </div>

          {/* Response Time */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50">
              <Clock size={22} className="text-orange-500" />
            </div>

            <p className="mt-4 text-3xl font-bold text-gray-800">38m</p>
            <p className="mt-1 text-sm text-gray-500">Average Response</p>

            <p className="mt-3 text-xs font-semibold text-green-600">
              12% faster
            </p>
          </div>

          {/* Teams */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50">
              <Users size={22} className="text-purple-600" />
            </div>

            <p className="mt-4 text-3xl font-bold text-gray-800">6</p>
            <p className="mt-1 text-sm text-gray-500">Collection Teams</p>

            <p className="mt-3 text-xs font-semibold text-green-600">
              4 available now
            </p>
          </div>
        </div>

        {/* Weekly Reports */}
        <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-gray-800">
                Weekly Report Activity
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Citizen reports received during the week
              </p>
            </div>

            <BarChart3 size={22} className="text-green-600" />
          </div>

          <div className="mt-8 flex h-64 items-end justify-between gap-3">
            {weeklyReports.map((item) => {
              const height = `${(item.reports / 15) * 100}%`;

              return (
                <div
                  key={item.day}
                  className="flex h-full flex-1 flex-col items-center justify-end"
                >
                  <span className="mb-2 text-xs font-semibold text-gray-600">
                    {item.reports}
                  </span>

                  <div
                    className="w-full max-w-12 rounded-t-lg bg-green-500 transition hover:bg-green-600"
                    style={{ height }}
                  />

                  <span className="mt-3 text-xs text-gray-500">
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ward + Priority */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Ward Reports */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50">
                <FileText size={20} className="text-orange-500" />
              </div>

              <div>
                <h3 className="font-bold text-gray-800">
                  Reports by Ward
                </h3>

                <p className="text-xs text-gray-500">
                  Areas receiving most reports
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-5">
              {wardData.map((item) => (
                <div key={item.ward}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      {item.ward}
                    </span>

                    <span className="text-sm font-bold text-gray-800">
                      {item.reports}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-orange-400"
                      style={{
                        width: `${(item.reports / 12) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Priority Distribution */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50">
                <AlertTriangle size={20} className="text-red-500" />
              </div>

              <div>
                <h3 className="font-bold text-gray-800">
                  Priority Distribution
                </h3>

                <p className="text-xs text-gray-500">
                  Reports categorized by urgency
                </p>
              </div>
            </div>

            <div className="mt-7 space-y-5">
              {priorityData.map((item) => (
                <div key={item.name}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      {item.name} Priority
                    </span>

                    <span className="text-sm font-bold text-gray-800">
                      {item.count}
                    </span>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className={`h-full rounded-full ${item.bg}`}
                      style={{
                        width: `${(item.count / 42) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Performance */}
        <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50">
              <Users size={20} className="text-green-600" />
            </div>

            <div>
              <h3 className="font-bold text-gray-800">
                Collection Team Performance
              </h3>

              <p className="text-xs text-gray-500">
                Current team activity
              </p>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-gray-100 text-left text-xs uppercase text-gray-400">
                  <th className="pb-3 font-semibold">Team</th>
                  <th className="pb-3 font-semibold">Completed</th>
                  <th className="pb-3 font-semibold">Active</th>
                  <th className="pb-3 font-semibold">Success Rate</th>
                </tr>
              </thead>

              <tbody>
                {teams.map((team) => (
                  <tr
                    key={team.name}
                    className="border-b border-gray-50 last:border-0"
                  >
                    <td className="py-4 font-semibold text-gray-800">
                      {team.name}
                    </td>

                    <td className="py-4 text-sm text-gray-600">
                      {team.completed}
                    </td>

                    <td className="py-4 text-sm text-orange-500">
                      {team.active}
                    </td>

                    <td className="py-4">
                      <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                        {team.rate}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Operational Insight */}
        <div className="mt-6 rounded-2xl border border-green-100 bg-green-50 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white">
              <TrendingUp size={22} className="text-green-600" />
            </div>

            <div>
              <h3 className="font-bold text-green-800">
                Operational Insight
              </h3>

              <p className="mt-2 text-sm leading-6 text-green-700">
                Reports are being resolved through the municipal collection
                workflow. Ward-level activity and team performance can help
                officers prioritize resources and improve response time.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Analytics;