import {
  ArrowLeft,
  Trophy,
  Medal,
  Star,
  Crown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const leaderboard = [
  {
    rank: 1,
    name: "Eco Champion",
    points: 520,
    reports: 24,
  },
  {
    rank: 2,
    name: "Green Hero",
    points: 465,
    reports: 21,
  },
  {
    rank: 3,
    name: "Clean Warrior",
    points: 410,
    reports: 19,
  },
  {
    rank: 4,
    name: "Eco Friend",
    points: 350,
    reports: 16,
  },
  {
    rank: 5,
    name: "Green Citizen",
    points: 315,
    reports: 14,
  },
  {
    rank: 18,
    name: "Green Guardian",
    points: 240,
    reports: 12,
  },
];

export default function Leaderboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f7faf7]">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-4xl items-center gap-4 px-6 py-5">
          <button
            onClick={() => navigate("/")}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>

          <div>
            <h1 className="text-xl font-bold text-gray-800">
              Leaderboard
            </h1>
            <p className="text-sm text-gray-500">
              Top CleanCity contributors
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-8">
        {/* Current User */}
        <div className="rounded-3xl bg-green-600 p-6 text-white shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
              <Trophy size={28} />
            </div>

            <div>
              <p className="text-sm text-green-100">
                Your Current Rank
              </p>

              <div className="mt-1 flex items-center gap-3">
                <p className="text-3xl font-bold">#18</p>

                <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
                  +64 this month
                </span>
              </div>
            </div>

            <div className="ml-auto text-right">
              <p className="text-2xl font-bold">240</p>
              <p className="text-xs text-green-100">
                Civic Points
              </p>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50">
              <Crown size={23} className="text-orange-500" />
            </div>

            <div>
              <h2 className="font-bold text-gray-800">
                Community Leaders
              </h2>

              <p className="text-sm text-gray-500">
                Citizens making a difference
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {leaderboard.map((user) => (
              <div
                key={user.rank}
                className={`flex items-center gap-4 rounded-2xl p-4 ${
                  user.rank === 18
                    ? "border border-green-200 bg-green-50"
                    : "bg-gray-50"
                }`}
              >
                {/* Rank */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white font-bold text-gray-700 shadow-sm">
                  {user.rank <= 3 ? (
                    <Medal
                      size={21}
                      className={
                        user.rank === 1
                          ? "text-yellow-500"
                          : user.rank === 2
                            ? "text-gray-400"
                            : "text-orange-500"
                      }
                    />
                  ) : (
                    `#${user.rank}`
                  )}
                </div>

                {/* User */}
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-800">
                    {user.name}
                  </p>

                  <p className="text-xs text-gray-500">
                    {user.reports} reports submitted
                  </p>
                </div>

                {/* Points */}
                <div className="flex items-center gap-1">
                  <Star
                    size={17}
                    className="text-orange-500"
                    fill="currentColor"
                  />

                  <span className="font-bold text-gray-800">
                    {user.points}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Motivation */}
        <div className="mt-6 rounded-2xl border border-orange-100 bg-orange-50 p-5">
          <h3 className="font-bold text-orange-800">
            🌱 Keep contributing!
          </h3>

          <p className="mt-1 text-sm leading-6 text-orange-700">
            Submit verified dustbin reports and help your
            community stay cleaner.
          </p>
        </div>
      </main>
    </div>
  );
}