import {
  Gift,
  Star,
  Trophy,
  CheckCircle,
  ArrowLeft,
  Lock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const rewards = [
  {
    title: "Green Guardian Badge",
    points: 100,
    description: "Earn your first civic milestone badge.",
    icon: Trophy,
    unlocked: true,
  },
  {
    title: "Eco Champion",
    points: 250,
    description: "Recognizes consistent community participation.",
    icon: Star,
    unlocked: false,
  },
  {
    title: "Community Hero",
    points: 500,
    description: "For citizens making a strong civic contribution.",
    icon: Gift,
    unlocked: false,
  },
];

function Rewards() {
  const navigate = useNavigate();

  const currentPoints = 240;
  const nextReward = 250;
  const progress = (currentPoints / nextReward) * 100;

  return (
    <div className="min-h-screen bg-[#f7faf7]">
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
              Rewards
            </h1>
            <p className="text-xs text-gray-500">
              Your civic contribution rewards
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">

        {/* Points */}
        <div className="rounded-3xl bg-green-600 p-6 text-white shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-100">
                Your Civic Points
              </p>

              <h2 className="mt-1 text-4xl font-bold">
                {currentPoints}
              </h2>

              <p className="mt-2 text-sm text-green-100">
                Level 4 · Green Guardian
              </p>
            </div>

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
              <Gift size={32} />
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between text-xs text-green-100">
              <span>Next reward</span>
              <span>
                {currentPoints}/{nextReward}
              </span>
            </div>

            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-white"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="mt-2 text-xs text-green-100">
              Only {nextReward - currentPoints} points to unlock!
            </p>
          </div>
        </div>

        {/* Heading */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-800">
            Available Rewards
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Keep contributing to unlock more rewards.
          </p>
        </div>

        {/* Rewards */}
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {rewards.map((reward) => {
            const Icon = reward.icon;

            return (
              <div
                key={reward.title}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50">
                    <Icon size={24} className="text-green-600" />
                  </div>

                  {reward.unlocked ? (
                    <span className="flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                      <CheckCircle size={13} />
                      Unlocked
                    </span>
                  ) : (
                    <Lock size={18} className="text-gray-400" />
                  )}
                </div>

                <h3 className="mt-5 font-bold text-gray-800">
                  {reward.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {reward.description}
                </p>

                <div className="mt-5 flex items-center justify-between">
                  <div className="flex items-center gap-1 font-semibold text-orange-500">
                    <Star size={16} />
                    {reward.points} pts
                  </div>

                  {reward.unlocked ? (
                    <button className="rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700">
                      Claim
                    </button>
                  ) : (
                    <span className="text-xs text-gray-400">
                      Locked
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* How it works */}
        <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="font-bold text-gray-800">
            How Civic Points Work
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-green-50 p-4">
              <p className="text-2xl">📸</p>
              <p className="mt-2 font-semibold text-gray-800">
                Report
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Submit a verified dustbin report.
              </p>
            </div>

            <div className="rounded-xl bg-orange-50 p-4">
              <p className="text-2xl">🤝</p>
              <p className="mt-2 font-semibold text-gray-800">
                Contribute
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Help your municipal team identify issues.
              </p>
            </div>

            <div className="rounded-xl bg-blue-50 p-4">
              <p className="text-2xl">🏆</p>
              <p className="mt-2 font-semibold text-gray-800">
                Earn
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Collect points and unlock rewards.
              </p>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}

export default Rewards;