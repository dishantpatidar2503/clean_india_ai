import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Clock3,
  MapPin,
  Camera,
  Truck,
  ShieldCheck,
  Loader2,
  AlertCircle,
} from "lucide-react";

const API_BASE_URL = "http://127.0.0.1:8000";

// Temporary testing report.
// Later this will come from the logged-in citizen.
const REPORT_ID = "RPT-E7D18B057D";

type Report = {
  id: number;
  report_id: string;
  dustbin_id: number;
  citizen_id: number;
  team_id: number | null;
  status: string;
  photo_path: string;
  after_clean_photo_path: string | null;
  latitude: number;
  longitude: number;
  created_at: string;
  accepted_at: string | null;
  resolved_at: string | null;
};

function Tracking() {
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // -------------------------------------------------------
  // LOAD REPORT
  // -------------------------------------------------------

  const loadReport = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const response = await fetch(
        `${API_BASE_URL}/reports/${REPORT_ID}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Unable to load report."
        );
      }

      setReport(data);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to load report."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReport();
  }, []);

  // -------------------------------------------------------
  // PHOTO URL
  // -------------------------------------------------------

  const getPhotoUrl = (path: string | null) => {
    if (!path) {
      return "";
    }

    return `${API_BASE_URL}/${path.replace(
      /\\/g,
      "/"
    )}`;
  };

  // -------------------------------------------------------
  // STATUS HELPERS
  // -------------------------------------------------------

  const isCompleted = (
    step: string
  ) => {
    if (!report) {
      return false;
    }

    const statusOrder = [
      "PENDING",
      "ACCEPTED",
      "ASSIGNED",
      "IN_PROGRESS",
      "RESOLVED",
    ];

    const currentIndex =
      statusOrder.indexOf(report.status);

    const stepIndex =
      statusOrder.indexOf(step);

    return currentIndex >= stepIndex;
  };

  // -------------------------------------------------------
  // LOADING
  // -------------------------------------------------------

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7faf7]">
        <div className="flex items-center gap-3 rounded-2xl bg-white px-6 py-5 shadow-sm">
          <Loader2
            size={22}
            className="animate-spin text-green-600"
          />
          <span className="font-medium text-gray-600">
            Loading report...
          </span>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------
  // ERROR
  // -------------------------------------------------------

  if (errorMessage || !report) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7faf7] px-6">
        <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 text-red-600">
            <AlertCircle size={22} />
            <h2 className="font-bold">
              Unable to load report
            </h2>
          </div>

          <p className="mt-3 text-sm text-gray-500">
            {errorMessage || "Report not found."}
          </p>

          <button
            type="button"
            onClick={loadReport}
            className="mt-5 w-full rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------
  // UI
  // -------------------------------------------------------

  return (
    <div className="min-h-screen bg-[#f7faf7]">

      {/* Header */}
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-4xl px-6 py-5">

          <h1 className="text-2xl font-bold text-gray-800">
            Report Tracking
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Track the progress of your dustbin report
          </p>

        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-8">

        {/* REPORT INFO */}
        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

            <div>
              <p className="text-sm text-gray-500">
                Report ID
              </p>

              <h2 className="mt-1 text-lg font-bold text-gray-800">
                {report.report_id}
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                Dustbin #{report.dustbin_id}
              </p>
            </div>

            <div
              className={`rounded-xl px-4 py-2 ${
                report.status === "RESOLVED"
                  ? "bg-green-50"
                  : "bg-orange-50"
              }`}
            >
              <span
                className={`text-sm font-semibold ${
                  report.status === "RESOLVED"
                    ? "text-green-600"
                    : "text-orange-600"
                }`}
              >
                {report.status === "RESOLVED"
                  ? "Dustbin Available"
                  : "Dustbin Locked"}
              </span>
            </div>

          </div>

        </section>

        {/* LOCATION */}
        <section className="mt-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100">
              <MapPin
                size={22}
                className="text-orange-500"
              />
            </div>

            <div>
              <h2 className="font-bold text-gray-800">
                Report Location
              </h2>

              <p className="text-sm text-gray-500">
                Location captured once when the report was submitted.
              </p>
            </div>

          </div>

          <div className="mt-4 rounded-xl bg-gray-50 p-4 text-sm text-gray-600">

            <p>
              <strong>Latitude:</strong>{" "}
              {report.latitude.toFixed(6)}
            </p>

            <p className="mt-1">
              <strong>Longitude:</strong>{" "}
              {report.longitude.toFixed(6)}
            </p>

            <p className="mt-2 text-xs text-gray-400">
              No continuous location tracking is used.
            </p>

          </div>

        </section>

        {/* PROGRESS */}
        <section className="mt-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

          <h2 className="text-lg font-bold text-gray-800">
            Report Progress
          </h2>

          <div className="mt-7 space-y-0">

            {/* Submitted */}
            <TimelineItem
              icon={Camera}
              title="Report Submitted"
              description="Your dustbin photo has been submitted."
              completed={isCompleted("PENDING")}
              last={false}
            />

            {/* Accepted */}
            <TimelineItem
              icon={ShieldCheck}
              title="Nagar Nigam Review"
              description="Your report has been received by Nagar Nigam."
              completed={isCompleted("ACCEPTED")}
              last={false}
            />

            {/* Team */}
            <TimelineItem
              icon={Truck}
              title="Team Assigned"
              description="A cleaning team has been assigned."
              completed={isCompleted("ASSIGNED")}
              last={false}
            />

            {/* Cleaning */}
            <TimelineItem
              icon={Clock3}
              title="Cleaning in Progress"
              description="The assigned team is working on the dustbin."
              completed={isCompleted("IN_PROGRESS")}
              last={false}
            />

            {/* Resolved */}
            <TimelineItem
              icon={CheckCircle2}
              title="Resolved"
              description="The dustbin has been cleaned and confirmed."
              completed={isCompleted("RESOLVED")}
              last={true}
            />

          </div>

        </section>

        {/* PHOTOS */}
        <section className="mt-5 grid gap-5 md:grid-cols-2">

          {/* BEFORE PHOTO */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

            <div className="flex items-center gap-3">

              <Camera
                size={20}
                className="text-green-600"
              />

              <h2 className="font-bold text-gray-800">
                Before Photo
              </h2>

            </div>

            {report.photo_path ? (
              <div className="mt-4 overflow-hidden rounded-2xl bg-gray-100">

                <img
                  src={getPhotoUrl(
                    report.photo_path
                  )}
                  alt="Citizen dustbin report"
                  className="h-56 w-full object-cover"
                />

              </div>
            ) : (
              <div className="mt-4 flex h-56 items-center justify-center rounded-2xl bg-gray-100 text-sm text-gray-400">
                No photo available
              </div>
            )}

            <p className="mt-3 text-xs text-gray-400">
              Uploaded by citizen
            </p>

          </div>

          {/* AFTER PHOTO */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

            <div className="flex items-center gap-3">

              <CheckCircle2
                size={20}
                className="text-green-600"
              />

              <h2 className="font-bold text-gray-800">
                After Photo
              </h2>

            </div>

            {report.after_clean_photo_path ? (
              <div className="mt-4 overflow-hidden rounded-2xl bg-gray-100">

                <img
                  src={getPhotoUrl(
                    report.after_clean_photo_path
                  )}
                  alt="Clean dustbin"
                  className="h-56 w-full object-cover"
                />

              </div>
            ) : (
              <div className="mt-4 flex h-56 items-center justify-center rounded-2xl bg-gray-100 text-sm text-gray-400">
                Awaiting cleaning confirmation
              </div>
            )}

            <p className="mt-3 text-xs text-gray-400">
              Uploaded by municipal cleaning team
            </p>

          </div>

        </section>

      </main>
    </div>
  );
}


// =========================================================
// TIMELINE ITEM
// =========================================================

function TimelineItem({
  icon: Icon,
  title,
  description,
  completed,
  last,
}: {
  icon: typeof Camera;
  title: string;
  description: string;
  completed: boolean;
  last: boolean;
}) {
  return (
    <div className="relative flex gap-4">

      {!last && (
        <div
          className={`absolute left-5 top-10 h-16 w-0.5 ${
            completed
              ? "bg-green-300"
              : "bg-gray-200"
          }`}
        />
      )}

      <div
        className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
          completed
            ? "bg-green-600 text-white"
            : "bg-gray-100 text-gray-400"
        }`}
      >
        <Icon size={18} />
      </div>

      <div className="pb-8">

        <h3
          className={`font-semibold ${
            completed
              ? "text-gray-800"
              : "text-gray-400"
          }`}
        >
          {title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-gray-500">
          {description}
        </p>

        {completed && (
          <p className="mt-1 text-xs font-medium text-green-600">
            Completed
          </p>
        )}

      </div>

    </div>
  );
}

export default Tracking;