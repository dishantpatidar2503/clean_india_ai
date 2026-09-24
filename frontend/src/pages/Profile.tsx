import {
  ArrowLeft,
  User,
  Star,
  FileText,
  CheckCircle,
  Trophy,
  Calendar,
  Settings,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f7faf7]">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-5xl items-center gap-4 px-6 py-4">
          <button
            onClick={() => navigate("/")}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>

          <div>
            <h1 className="text-xl font-bold text-gray-800">
              My Profile
            </h1>
            <p className="text-xs text-gray-500">
              Your CleanCity contribution
            </p>
          </div>

          <button className="ml-auto flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200">
            <Settings size={19} className="text-gray-600" />
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">

        {/* Profile Card */}
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex flex-col items-center text-center sm:flex-row sm:text-left">
            
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
              <User size={42} className="text-green-600" />
            </div>

            <div className="mt-4 sm:ml-6 sm:mt-0">
              <h2 className="text-2xl font-bold text-gray-800">
                Green Guardian
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                CleanCity Citizen
              </p>

              <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                  Level 4
                </span>

                <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">
                  240 Civic Points
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">
              <FileText size={22} className="text-green-600" />
            </div>

            <p className="mt-4 text-2xl font-bold text-gray-800">
              12
            </p>

            <p className="text-sm text-gray-500">
              Reports Submitted
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
              <CheckCircle size={22} className="text-blue-600" />
            </div>

            <p className="mt-4 text-2xl font-bold text-gray-800">
              8
            </p>

            <p className="text-sm text-gray-500">
              Reports Resolved
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50">
              <Star size={22} className="text-orange-500" />
            </div>

            <p className="mt-4 text-2xl font-bold text-gray-800">
              240
            </p>

            <p className="text-sm text-gray-500">
              Civic Points
            </p>
          </div>

        </div>

        {/* Level Progress */}
        <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-gray-800">
                Level Progress
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Green Guardian · Level 4
              </p>
            </div>

            <Trophy size={25} className="text-orange-500" />
          </div>

          <div className="mt-5 flex justify-between text-xs text-gray-500">
            <span>240 points</span>
            <span>Next level: 300</span>
          </div>

          <div className="mt-2 h-3 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-green-500"
              style={{ width: "80%" }}
            />
          </div>

          <p className="mt-2 text-xs text-gray-400">
            60 more points to reach Level 5
          </p>
        </div>

        {/* Contribution History */}
        <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <Calendar size={21} className="text-green-600" />

            <div>
              <h2 className="font-bold text-gray-800">
                Contribution History
              </h2>

              <p className="text-sm text-gray-500">
                Your recent CleanCity activity
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-3">

            <div className="flex items-center justify-between rounded-xl bg-green-50 p-4">
              <div>
                <p className="font-semibold text-gray-800">
                  Dustbin report resolved
                </p>

                <p className="text-xs text-gray-500">
                  Report #CC-93D18D23
                </p>
              </div>

              <span className="font-semibold text-green-600">
                +20 pts
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-orange-50 p-4">
              <div>
                <p className="font-semibold text-gray-800">
                  Community contribution
                </p>

                <p className="text-xs text-gray-500">
                  September 2026
                </p>
              </div>

              <span className="font-semibold text-orange-500">
                +10 pts
              </span>
            </div>

          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2">

          <button
            onClick={() => navigate("/leaderboard")}
            className="rounded-xl border border-green-200 bg-green-50 py-3 font-semibold text-green-700 hover:bg-green-100"
          >
            🏆 View Leaderboard
          </button>

          <button
            onClick={() => navigate("/rewards")}
            className="rounded-xl border border-orange-200 bg-orange-50 py-3 font-semibold text-orange-600 hover:bg-orange-100"
          >
            🎁 View Rewards
          </button>

        </div>

      </main>
    </div>
  );
}

export default Profile;