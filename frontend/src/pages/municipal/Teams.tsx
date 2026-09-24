import {
  ArrowLeft,
  Users,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  UserCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const teams = [
  {
    id: 1,
    name: "Team A",
    members: 4,
    area: "Vijay Nagar",
    status: "Available",
    completed: 18,
    active: 0,
    phone: "+91 98765 43210",
  },
  {
    id: 2,
    name: "Team B",
    members: 5,
    area: "Palasia",
    status: "Busy",
    completed: 14,
    active: 2,
    phone: "+91 98765 43211",
  },
  {
    id: 3,
    name: "Team C",
    members: 4,
    area: "Rau",
    status: "Available",
    completed: 21,
    active: 0,
    phone: "+91 98765 43212",
  },
  {
    id: 4,
    name: "Team D",
    members: 6,
    area: "Bhawarkua",
    status: "Busy",
    completed: 16,
    active: 1,
    phone: "+91 98765 43213",
  },
  {
    id: 5,
    name: "Team E",
    members: 4,
    area: "Indore Central",
    status: "Available",
    completed: 19,
    active: 0,
    phone: "+91 98765 43214",
  },
  {
    id: 6,
    name: "Team F",
    members: 5,
    area: "MR-10",
    status: "Available",
    completed: 12,
    active: 0,
    phone: "+91 98765 43215",
  },
];

function Teams() {
  const navigate = useNavigate();

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
              Collection Teams
            </h1>
            <p className="text-sm text-gray-500">
              Manage municipal waste collection teams
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Summary */}
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                <Users size={22} className="text-blue-600" />
              </div>

              <div>
                <p className="text-sm text-gray-500">Total Teams</p>
                <p className="text-2xl font-bold text-gray-800">6</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">
                <CheckCircle size={22} className="text-green-600" />
              </div>

              <div>
                <p className="text-sm text-gray-500">Available</p>
                <p className="text-2xl font-bold text-gray-800">4</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50">
                <Clock size={22} className="text-orange-500" />
              </div>

              <div>
                <p className="text-sm text-gray-500">Busy</p>
                <p className="text-2xl font-bold text-gray-800">2</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50">
                <UserCheck size={22} className="text-purple-600" />
              </div>

              <div>
                <p className="text-sm text-gray-500">Total Members</p>
                <p className="text-2xl font-bold text-gray-800">28</p>
              </div>
            </div>
          </div>
        </div>

        {/* Teams */}
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {teams.map((team) => (
            <div
              key={team.id}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              {/* Team Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50">
                    <Users size={24} className="text-green-600" />
                  </div>

                  <div>
                    <h2 className="font-bold text-gray-800">
                      {team.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {team.members} members
                    </p>
                  </div>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    team.status === "Available"
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {team.status}
                </span>
              </div>

              {/* Area */}
              <div className="mt-5 flex items-center gap-2 text-sm text-gray-600">
                <MapPin size={17} className="text-orange-500" />
                <span>Assigned Area: {team.area}</span>
              </div>

              {/* Phone */}
              <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                <Phone size={17} className="text-green-600" />
                <span>{team.phone}</span>
              </div>

              {/* Stats */}
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-gray-50 p-3">
                  <p className="text-xs text-gray-500">Completed</p>
                  <p className="mt-1 text-lg font-bold text-gray-800">
                    {team.completed}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-3">
                  <p className="text-xs text-gray-500">Active Tasks</p>
                  <p className="mt-1 text-lg font-bold text-gray-800">
                    {team.active}
                  </p>
                </div>
              </div>

              {/* Action */}
              <button
                disabled={team.status === "Busy"}
                className={`mt-5 w-full rounded-xl py-3 text-sm font-semibold ${
                  team.status === "Available"
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {team.status === "Available"
                  ? "Assign New Task"
                  : "Currently Working"}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Teams;