import { useNavigate } from "react-router-dom";
import {
  Trophy,
  FileText,
  Star,
  Trash2,
  MapPin,
  CheckCircle,
  Clock,
  ArrowRight,
  Leaf,
  Gift,
  User,
} from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f7faf7]">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100">
              <Leaf size={24} className="text-green-600" />
            </div>

            <div>
              <h1 className="text-xl font-bold text-gray-800">
                CleanCity
              </h1>
              <p className="text-xs text-gray-500">
                Smart Waste Management
              </p>
            </div>
          </div>

          {/* Profile */}
          <button
            onClick={() => navigate("/profile")}
            className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-gray-50"
          >
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-gray-700">
                Green Guardian
              </p>
              <p className="text-xs text-gray-400">
                Level 4
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
              <User size={20} className="text-green-600" />
            </div>
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">

        {/* Welcome */}
        <div>
          <p className="text-sm text-green-600 font-medium">
            Welcome back 👋
          </p>

          <h2 className="mt-1 text-3xl font-bold text-gray-800">
            Make your city cleaner.
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
            Report overflowing dustbins and help your municipal team
            keep the city clean.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-7 grid gap-4 md:grid-cols-3">

          {/* Clean City Score */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">
                <Leaf size={22} className="text-green-600" />
              </div>

              <span className="text-xs font-semibold text-green-600">
                Good
              </span>
            </div>

            <p className="mt-5 text-sm text-gray-500">
              Clean City Score
            </p>

            <div className="mt-1 flex items-end gap-1">
              <span className="text-3xl font-bold text-gray-800">
                87
              </span>

              <span className="mb-1 text-sm text-gray-400">
                /100
              </span>
            </div>

            <div className="mt-3 h-2 rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-green-500"
                style={{ width: "87%" }}
              />
            </div>
          </div>

          {/* Reports */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50">
              <FileText size={22} className="text-orange-500" />
            </div>

            <p className="mt-5 text-sm text-gray-500">
              My Reports
            </p>

            <div className="mt-1 flex items-end gap-2">
              <span className="text-3xl font-bold text-gray-800">
                12
              </span>

              <span className="mb-1 text-sm text-green-600">
                8 resolved
              </span>
            </div>
          </div>

          {/* Points */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-50">
              <Star size={22} className="text-yellow-500" />
            </div>

            <p className="mt-5 text-sm text-gray-500">
              Civic Points
            </p>

            <div className="mt-1 flex items-end gap-2">
              <span className="text-3xl font-bold text-gray-800">
                240
              </span>

              <span className="mb-1 text-sm text-gray-400">
                Level 4
              </span>
            </div>
          </div>
        </div>

        {/* Main Actions */}
        <div className="mt-7 grid gap-5 lg:grid-cols-3">

          {/* Report CTA */}
          <div className="rounded-2xl bg-green-600 p-6 text-white lg:col-span-2">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-green-100">
                  Help your community
                </p>

                <h3 className="mt-1 text-2xl font-bold">
                  See an overflowing dustbin?
                </h3>

                <p className="mt-2 max-w-lg text-sm leading-6 text-green-100">
                  Take a current photo and submit a report.
                  The municipal team can then review and respond.
                </p>
              </div>

              <div className="hidden h-14 w-14 items-center justify-center rounded-2xl bg-white/20 sm:flex">
                <Trash2 size={28} />
              </div>
            </div>

            <button
              onClick={() => navigate("/report")}
              className="mt-6 flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-green-700 transition hover:bg-green-50"
            >
              Report a Dustbin
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Leaderboard */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50">
                <Trophy size={22} className="text-orange-500" />
              </div>

              <span className="text-xs font-semibold text-gray-400">
                This month
              </span>
            </div>

            <p className="mt-5 text-sm text-gray-500">
              Leaderboard Rank
            </p>

            <p className="mt-1 text-3xl font-bold text-gray-800">
              #18
            </p>

            <p className="mt-1 text-sm text-green-600">
              +64 points this month
            </p>

            <button
              onClick={() => navigate("/leaderboard")}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-50 py-3 text-sm font-semibold text-orange-600 hover:bg-orange-100"
            >
              View Leaderboard
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-7 grid gap-4 sm:grid-cols-2">

          {/* Rewards */}
          <button
            onClick={() => navigate("/rewards")}
            className="group flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50">
                <Gift size={23} className="text-orange-500" />
              </div>

              <div>
                <h3 className="font-bold text-gray-800">
                  Rewards
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  You have 240 civic points
                </p>
              </div>
            </div>

            <ArrowRight
              size={19}
              className="text-gray-400 transition group-hover:translate-x-1"
            />
          </button>

          {/* Profile */}
          <button
            onClick={() => navigate("/profile")}
            className="group flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50">
                <User size={23} className="text-green-600" />
              </div>

              <div>
                <h3 className="font-bold text-gray-800">
                  My Profile
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  View your contribution history
                </p>
              </div>
            </div>

            <ArrowRight
              size={19}
              className="text-gray-400 transition group-hover:translate-x-1"
            />
          </button>
        </div>

        {/* Nearby Activity */}
        <div className="mt-7 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-gray-800">
                Nearby Activity
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Recent civic activity around your area
              </p>
            </div>

            <MapPin size={22} className="text-green-600" />
          </div>

          <div className="mt-5 flex h-40 items-center justify-center rounded-xl bg-green-50">
            <div className="text-center">
              <MapPin
                size={30}
                className="mx-auto text-green-500"
              />

              <p className="mt-2 text-sm font-medium text-gray-600">
                Map will appear here
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Nearby reports and dustbins
              </p>
            </div>
          </div>
        </div>

        {/* Recent Reports */}
        <div className="mt-7 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-gray-800">
                Recent Reports
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Your latest dustbin reports
              </p>
            </div>

            <FileText size={21} className="text-gray-400" />
          </div>

          <div className="mt-5 space-y-3">

            {/* Report 1 */}
            <div className="flex items-center justify-between rounded-xl bg-green-50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
                  <CheckCircle size={20} className="text-green-600" />
                </div>

                <div>
                  <p className="font-semibold text-gray-800">
                    Dustbin report
                  </p>

                  <p className="text-xs text-gray-500">
                    Resolved · Report #CC-93D18D23
                  </p>
                </div>
              </div>

              <span className="text-xs font-semibold text-green-600">
                Resolved
              </span>
            </div>

            {/* Report 2 */}
            <div className="flex items-center justify-between rounded-xl bg-orange-50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
                  <Clock size={20} className="text-orange-500" />
                </div>

                <div>
                  <p className="font-semibold text-gray-800">
                    Dustbin report
                  </p>

                  <p className="text-xs text-gray-500">
                    Under review · Report #CC-72A41B19
                  </p>
                </div>
              </div>

              <span className="text-xs font-semibold text-orange-500">
                Pending
              </span>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}

export default Dashboard;