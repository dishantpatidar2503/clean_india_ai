import {
  ArrowLeft,
  Trash2,
  MapPin,
  CheckCircle,
  Lock,
  Clock,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const dustbins = [
  {
    id: "BIN-IND-0001",
    location: "Vijay Nagar, Ward 12",
    latitude: 22.7533,
    longitude: 75.8937,
    status: "Locked",
    reports: 8,
    lastCleaned: "Today, 10:30 AM",
    activeReport: "CC-93D18D23",
  },
  {
    id: "BIN-IND-0002",
    location: "Palasia, Ward 8",
    latitude: 22.7256,
    longitude: 75.886,
    status: "Available",
    reports: 5,
    lastCleaned: "Today, 09:15 AM",
    activeReport: "-",
  },
  {
    id: "BIN-IND-0003",
    location: "Rau, Ward 5",
    latitude: 22.626,
    longitude: 75.804,
    status: "Available",
    reports: 11,
    lastCleaned: "Yesterday, 05:40 PM",
    activeReport: "-",
  },
  {
    id: "BIN-IND-0004",
    location: "Bhawarkua, Ward 15",
    latitude: 22.687,
    longitude: 75.8577,
    status: "Locked",
    reports: 7,
    lastCleaned: "Today, 08:20 AM",
    activeReport: "CC-44F71C08",
  },
  {
    id: "BIN-IND-0005",
    location: "Palasia, Ward 7",
    latitude: 22.7196,
    longitude: 75.8809,
    status: "Available",
    reports: 4,
    lastCleaned: "2 days ago",
    activeReport: "-",
  },
  {
    id: "BIN-IND-0006",
    location: "MR-10, Ward 18",
    latitude: 22.753,
    longitude: 75.864,
    status: "Available",
    reports: 6,
    lastCleaned: "Yesterday, 04:10 PM",
    activeReport: "-",
  },
];

export default function Dustbins() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filteredDustbins = dustbins.filter(
    (bin) =>
      bin.id.toLowerCase().includes(search.toLowerCase()) ||
      bin.location.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#f7faf7]">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-5">
          <button
            onClick={() => navigate("/municipal")}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>

          <div>
            <h1 className="text-xl font-bold text-gray-800">
              Registered Dustbins
            </h1>

            <p className="text-sm text-gray-500">
              Monitor and manage municipal dustbins
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          {/* Total */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">
                <Trash2 size={22} className="text-green-600" />
              </div>

              <div>
                <p className="text-sm text-gray-500">Total Dustbins</p>
                <p className="text-2xl font-bold text-gray-800">6</p>
              </div>
            </div>
          </div>

          {/* Available */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                <CheckCircle size={22} className="text-blue-600" />
              </div>

              <div>
                <p className="text-sm text-gray-500">Available</p>
                <p className="text-2xl font-bold text-gray-800">4</p>
              </div>
            </div>
          </div>

          {/* Active Reports */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50">
                <Lock size={22} className="text-orange-500" />
              </div>

              <div>
                <p className="text-sm text-gray-500">Active Reports</p>
                <p className="text-2xl font-bold text-gray-800">2</p>
              </div>
            </div>
          </div>

          {/* Reports Received */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50">
                <Clock size={22} className="text-purple-600" />
              </div>

              <div>
                <p className="text-sm text-gray-500">Reports Received</p>
                <p className="text-2xl font-bold text-gray-800">41</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="relative">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search by dustbin ID or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100"
            />
          </div>
        </div>

        {/* Dustbin Cards */}
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredDustbins.map((bin) => (
            <div
              key={bin.id}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              {/* Top */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50">
                    <Trash2 size={24} className="text-green-600" />
                  </div>

                  <div>
                    <h2 className="font-bold text-gray-800">{bin.id}</h2>

                    <p className="text-xs text-gray-500">
                      Municipal Dustbin
                    </p>
                  </div>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    bin.status === "Available"
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {bin.status}
                </span>
              </div>

              {/* Location */}
              <div className="mt-5 flex gap-3">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-orange-500"
                />

                <div>
                  <p className="text-sm font-medium text-gray-700">
                    {bin.location}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    {bin.latitude}, {bin.longitude}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-gray-50 p-3">
                  <p className="text-xs text-gray-500">Total Reports</p>

                  <p className="mt-1 text-lg font-bold text-gray-800">
                    {bin.reports}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-3">
                  <p className="text-xs text-gray-500">Last Cleaned</p>

                  <p className="mt-1 text-sm font-semibold text-gray-700">
                    {bin.lastCleaned}
                  </p>
                </div>
              </div>

              {/* Active Report */}
              <div className="mt-4 rounded-xl border border-gray-100 p-3">
                <p className="text-xs text-gray-500">Active Report</p>

                <p
                  className={`mt-1 text-sm font-semibold ${
                    bin.activeReport === "-"
                      ? "text-gray-400"
                      : "text-orange-600"
                  }`}
                >
                  {bin.activeReport}
                </p>
              </div>

              {/* Map Button */}
              <button
                onClick={() =>
                  window.open(
                    `https://www.google.com/maps?q=${bin.latitude},${bin.longitude}`,
                    "_blank",
                  )
                }
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-green-200 bg-green-50 py-3 text-sm font-semibold text-green-700 hover:bg-green-100"
              >
                <MapPin size={17} />
                View Location
              </button>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredDustbins.length === 0 && (
          <div className="mt-6 rounded-2xl bg-white p-10 text-center shadow-sm">
            <Trash2 size={40} className="mx-auto text-gray-300" />

            <p className="mt-3 font-semibold text-gray-600">
              No dustbins found
            </p>

            <p className="mt-1 text-sm text-gray-400">
              Try another ID or location.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}