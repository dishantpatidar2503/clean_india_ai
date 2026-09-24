import {
  ArrowLeft,
  Search,
  MapPin,
  Clock,
  AlertCircle,
  CheckCircle,
  LoaderCircle,
  Eye,
  Filter,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function MunicipalReports() {
  const navigate = useNavigate();

  const reports = [
    {
      id: "CC-93D18D23",
      dustbinId: "BIN-IND-0001",
      location: "Ward 12 · Vijay Nagar",
      status: "Pending",
      priority: "High",
      time: "10 min ago",
    },
    {
      id: "CC-72A41B19",
      dustbinId: "BIN-IND-0002",
      location: "Ward 8 · Palasia",
      status: "In Progress",
      priority: "Medium",
      time: "32 min ago",
    },
    {
      id: "CC-51B92A10",
      dustbinId: "BIN-IND-0003",
      location: "Ward 5 · Rau",
      status: "Resolved",
      priority: "Low",
      time: "1 hr ago",
    },
    {
      id: "CC-44F71C08",
      dustbinId: "BIN-IND-0004",
      location: "Ward 15 · Bhawarkua",
      status: "Pending",
      priority: "High",
      time: "2 hrs ago",
    },
    {
      id: "CC-38A61D04",
      dustbinId: "BIN-IND-0005",
      location: "Ward 7 · Palasia",
      status: "Accepted",
      priority: "Medium",
      time: "3 hrs ago",
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
              Municipal Reports
            </h1>

            <p className="text-xs text-gray-500">
              Manage citizen dustbin reports
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Heading */}
        <div>
          <p className="text-sm font-medium text-green-600">
            Municipal Control Center
          </p>

          <h2 className="mt-1 text-3xl font-bold text-gray-800">
            Citizen Reports
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Review, verify and manage incoming dustbin reports.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">
              <AlertCircle size={22} className="text-green-600" />
            </div>

            <p className="mt-4 text-3xl font-bold text-gray-800">42</p>

            <p className="text-sm text-gray-500">
              Total Reports
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50">
              <Clock size={22} className="text-red-500" />
            </div>

            <p className="mt-4 text-3xl font-bold text-gray-800">12</p>

            <p className="text-sm text-gray-500">
              Pending
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50">
              <LoaderCircle size={22} className="text-orange-500" />
            </div>

            <p className="mt-4 text-3xl font-bold text-gray-800">8</p>

            <p className="text-sm text-gray-500">
              In Progress
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">
              <CheckCircle size={22} className="text-green-600" />
            </div>

            <p className="mt-4 text-3xl font-bold text-gray-800">22</p>

            <p className="text-sm text-gray-500">
              Resolved
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-7 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 lg:w-96">
              <Search size={18} className="text-gray-400" />

              <input
                type="text"
                placeholder="Search report ID or dustbin ID..."
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <button className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50">
                <Filter size={17} />
                Filter
              </button>

              <button className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-100">
                Pending
              </button>

              <button className="rounded-xl bg-orange-50 px-4 py-3 text-sm font-semibold text-orange-600 hover:bg-orange-100">
                In Progress
              </button>

              <button className="rounded-xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700 hover:bg-green-100">
                Resolved
              </button>
            </div>
          </div>
        </div>

        {/* Reports Table */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="border-b border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-800">
              All Reports
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Review citizen-submitted reports and take action.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 text-left">
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500">
                    Report
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold text-gray-500">
                    Dustbin
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold text-gray-500">
                    Location
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold text-gray-500">
                    Priority
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold text-gray-500">
                    Status
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold text-gray-500">
                    Time
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold text-gray-500">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {reports.map((report) => (
                  <tr
                    key={report.id}
                    className="border-b border-gray-50 transition hover:bg-gray-50"
                  >
                    {/* Report */}
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-800">
                        {report.id}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        Citizen Report
                      </p>
                    </td>

                    {/* Dustbin */}
                    <td className="px-6 py-4">
                      <span className="rounded-lg bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-600">
                        {report.dustbinId}
                      </span>
                    </td>

                    {/* Location */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <MapPin
                          size={16}
                          className="text-green-600"
                        />

                        <span className="text-sm text-gray-600">
                          {report.location}
                        </span>
                      </div>
                    </td>

                    {/* Priority */}
                    <td className="px-6 py-4">
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

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          report.status === "Pending"
                            ? "bg-red-50 text-red-600"
                            : report.status === "In Progress"
                            ? "bg-orange-50 text-orange-600"
                            : report.status === "Resolved"
                            ? "bg-green-50 text-green-600"
                            : "bg-blue-50 text-blue-600"
                        }`}
                      >
                        {report.status}
                      </span>
                    </td>

                    {/* Time */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Clock size={15} className="text-gray-400" />

                        <span className="text-sm text-gray-500">
                          {report.time}
                        </span>
                      </div>
                    </td>

                    {/* Action */}
                    <td className="px-6 py-4">
                      <button
                        onClick={() =>
                          navigate(`/municipal/reports/${report.id}`)
                        }
                        className="flex items-center gap-2 rounded-xl bg-green-50 px-4 py-2 text-sm font-semibold text-green-700 hover:bg-green-100"
                      >
                        <Eye size={16} />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Information */}
        <div className="mt-6 rounded-2xl border border-green-100 bg-green-50 p-5">
          <div className="flex gap-3">
            <CheckCircle
              size={21}
              className="mt-0.5 shrink-0 text-green-600"
            />

            <div>
              <p className="font-semibold text-green-800">
                Municipal Review
              </p>

              <p className="mt-1 text-sm leading-6 text-green-700">
                Officers can review citizen photos, verify locations,
                accept or reject reports, and assign collection teams.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MunicipalReports;