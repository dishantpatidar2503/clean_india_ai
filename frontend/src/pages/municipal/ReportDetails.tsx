import {
  ArrowLeft,
  CheckCircle,
  Clock,
  MapPin,
  ShieldCheck,
  User,
  XCircle,
  Users,
  Camera,
  Navigation,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

function ReportDetails() {
  const navigate = useNavigate();
  const { reportId } = useParams();

  const report = {
    id: reportId || "CC-93D18D23",
    dustbinId: "BIN-IND-0001",
    citizen: "Citizen #1042",
    location: "Ward 12 · Vijay Nagar",
    latitude: "22.7533",
    longitude: "75.8937",
    status: "Pending",
    priority: "High",
    submitted: "10 minutes ago",
    aiStatus: "Verified",
    aiConfidence: "94%",
  };

  return (
    <div className="min-h-screen bg-[#f7faf7]">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-4">
          <button
            onClick={() => navigate("/municipal/reports")}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>

          <div>
            <h1 className="text-xl font-bold text-gray-800">
              Report Details
            </h1>

            <p className="text-xs text-gray-500">
              Municipal Officer Review
            </p>
          </div>

          <div className="ml-auto hidden items-center gap-2 rounded-xl bg-green-50 px-4 py-2 sm:flex">
            <ShieldCheck size={17} className="text-green-600" />
            <span className="text-sm font-semibold text-green-700">
              Officer Panel
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {/* Heading */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <p className="text-sm font-medium text-green-600">
              Citizen Report
            </p>

            <h2 className="mt-1 text-3xl font-bold text-gray-800">
              {report.id}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Review the report before taking municipal action.
            </p>
          </div>

          <span className="w-fit rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-600">
            {report.priority} Priority
          </span>
        </div>

        {/* Main Grid */}
        <div className="mt-7 grid gap-6 lg:grid-cols-3">
          {/* Photo */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  Citizen Photo
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Photo submitted with this report
                </p>
              </div>

              <Camera size={22} className="text-green-600" />
            </div>

            <div className="mt-5 flex h-80 items-center justify-center rounded-2xl bg-green-50">
              <div className="text-center">
                <Camera
                  size={42}
                  className="mx-auto text-green-500"
                />

                <p className="mt-3 font-semibold text-gray-700">
                  Citizen Dustbin Photo
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Uploaded image will appear here
                </p>
              </div>
            </div>
          </div>

          {/* AI Verification */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">
                <ShieldCheck size={22} className="text-green-600" />
              </div>

              <div>
                <h3 className="font-bold text-gray-800">
                  AI Verification
                </h3>

                <p className="text-xs text-gray-500">
                  Automated report check
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-green-50 p-4">
              <div className="flex items-center gap-3">
                <CheckCircle
                  size={22}
                  className="text-green-600"
                />

                <div>
                  <p className="font-semibold text-green-800">
                    {report.aiStatus}
                  </p>

                  <p className="text-xs text-green-600">
                    Report appears valid
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between rounded-xl bg-gray-50 p-4">
              <span className="text-sm text-gray-500">
                Confidence
              </span>

              <span className="font-bold text-gray-800">
                {report.aiConfidence}
              </span>
            </div>

            <p className="mt-4 text-xs leading-5 text-gray-400">
              AI verification supports officer review and does not
              replace municipal decision-making.
            </p>
          </div>
        </div>

        {/* Report Information */}
        <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800">
            Report Information
          </h3>

          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-xs text-gray-400">
                Report ID
              </p>

              <p className="mt-1 font-semibold text-gray-800">
                {report.id}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">
                Dustbin ID
              </p>

              <p className="mt-1 font-semibold text-gray-800">
                {report.dustbinId}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">
                Submitted By
              </p>

              <div className="mt-1 flex items-center gap-2">
                <User size={15} className="text-gray-400" />

                <p className="font-semibold text-gray-800">
                  {report.citizen}
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs text-gray-400">
                Submitted
              </p>

              <div className="mt-1 flex items-center gap-2">
                <Clock size={15} className="text-gray-400" />

                <p className="font-semibold text-gray-800">
                  {report.submitted}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-800">
                Report Location
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                GPS information captured during submission
              </p>
            </div>

            <MapPin size={22} className="text-green-600" />
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <div className="rounded-xl bg-green-50 p-5">
              <div className="flex items-start gap-3">
                <MapPin
                  size={22}
                  className="mt-0.5 text-green-600"
                />

                <div>
                  <p className="font-semibold text-gray-800">
                    {report.location}
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    Latitude: {report.latitude}
                  </p>

                  <p className="text-sm text-gray-500">
                    Longitude: {report.longitude}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex h-40 items-center justify-center rounded-xl bg-gray-100">
              <div className="text-center">
                <Navigation
                  size={30}
                  className="mx-auto text-green-500"
                />

                <p className="mt-2 text-sm font-semibold text-gray-600">
                  GIS Map Preview
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Map integration will be connected later
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Current Status */}
        <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800">
            Current Status
          </h3>

          <div className="mt-5 flex items-center gap-4 rounded-xl bg-orange-50 p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100">
              <Clock size={22} className="text-orange-500" />
            </div>

            <div>
              <p className="font-bold text-orange-700">
                {report.status}
              </p>

              <p className="mt-1 text-sm text-orange-600">
                Waiting for municipal officer review.
              </p>
            </div>
          </div>
        </div>

        {/* Officer Actions */}
        <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800">
            Officer Actions
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Decide how this report should be handled.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <button className="flex items-center justify-center gap-2 rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-700">
              <CheckCircle size={18} />
              Accept Report
            </button>

            <button className="flex items-center justify-center gap-2 rounded-xl bg-red-50 py-3 font-semibold text-red-600 hover:bg-red-100">
              <XCircle size={18} />
              Reject Report
            </button>

            <button className="flex items-center justify-center gap-2 rounded-xl bg-blue-50 py-3 font-semibold text-blue-700 hover:bg-blue-100">
              <Users size={18} />
              Assign Team
            </button>
          </div>
        </div>

        {/* Workflow */}
        <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800">
            Report Workflow
          </h3>

          <div className="mt-6 grid gap-4 sm:grid-cols-5">
            {[
              ["1", "Submitted", true],
              ["2", "Under Review", true],
              ["3", "Accepted", false],
              ["4", "Cleaning", false],
              ["5", "Resolved", false],
            ].map(([number, label, active]) => (
              <div
                key={String(label)}
                className={`rounded-xl p-4 text-center ${
                  active
                    ? "bg-green-50"
                    : "bg-gray-50"
                }`}
              >
                <div
                  className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full font-bold ${
                    active
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {number}
                </div>

                <p
                  className={`mt-2 text-xs font-semibold ${
                    active
                      ? "text-green-700"
                      : "text-gray-400"
                  }`}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ReportDetails;