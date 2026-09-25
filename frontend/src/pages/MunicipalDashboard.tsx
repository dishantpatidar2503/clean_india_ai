import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  MapPin,
  Upload,
  Users,
  ShieldCheck,
  Loader2,
  Play,
} from "lucide-react";

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import L from "leaflet";


const API_BASE_URL = "http://127.0.0.1:8000";

// ---------------------------------------------------------
// FIX LEAFLET MARKER ICON
// ---------------------------------------------------------

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});


// ---------------------------------------------------------
// TYPES
// ---------------------------------------------------------

type Report = {
  id: number;
  report_id: string;
  dustbin_id: number;
  citizen_id: number;
  team_id: number | null;
  status: string;
  photo_path: string;
  after_clean_photo_path?: string | null;
  latitude: number;
  longitude: number;
  created_at: string;
  accepted_at?: string | null;
};

type Team = {
  id: number;
  team_name: string;
  contact_number: string | null;
  area: string | null;
  status: string;
};


// ---------------------------------------------------------
// MAP CENTER COMPONENT
// ---------------------------------------------------------

function MapCenter({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  const map = useMap();

  useEffect(() => {
    map.setView(
      [latitude, longitude],
      15
    );
  }, [latitude, longitude, map]);

  return null;
}


// ---------------------------------------------------------
// MUNICIPAL DASHBOARD
// ---------------------------------------------------------

function MunicipalDashboard() {

  const [reports, setReports] = useState<Report[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);

  const [selectedReport, setSelectedReport] =
    useState<Report | null>(null);

  const [selectedTeamId, setSelectedTeamId] =
    useState("");

  const [cleanPhoto, setCleanPhoto] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [actionLoading, setActionLoading] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");


  // -------------------------------------------------------
  // FETCH REPORTS + TEAMS
  // -------------------------------------------------------

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const [reportResponse, teamResponse] =
        await Promise.all([
          fetch(`${API_BASE_URL}/reports/pending`),
          fetch(`${API_BASE_URL}/teams/`),
        ]);

      if (!reportResponse.ok) {
        throw new Error("Unable to load reports.");
      }

      if (!teamResponse.ok) {
        throw new Error("Unable to load collection teams.");
      }

      const reportData =
        await reportResponse.json();

      const teamData =
        await teamResponse.json();

      setReports(reportData);
      setTeams(teamData);

      if (
        selectedReport &&
        !reportData.find(
          (item: Report) =>
            item.report_id === selectedReport.report_id
        )
      ) {
        setSelectedReport(null);
      }

    } catch (error) {

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to load dashboard."
      );

    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    loadDashboard();
  }, []);


  // -------------------------------------------------------
  // ACTIVE AVAILABLE TEAMS
  // -------------------------------------------------------

  const availableTeams = useMemo(
    () =>
      teams.filter(
        (team) => team.status === "AVAILABLE"
      ),
    [teams]
  );


  // -------------------------------------------------------
  // ACTION HELPER
  // -------------------------------------------------------

  const runAction = async (
    url: string,
    options?: RequestInit,
    successText?: string
  ) => {

    try {

      setActionLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      const response = await fetch(
        url,
        options
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail ||
            "Action could not be completed."
        );
      }

      setSuccessMessage(
        successText ||
          data.message ||
          "Action completed successfully."
      );

      await loadDashboard();

      return data;

    } catch (error) {

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Action failed."
      );

      return null;

    } finally {
      setActionLoading(false);
    }
  };


  // -------------------------------------------------------
  // ACCEPT REPORT
  // -------------------------------------------------------

  const acceptReport = async () => {

    if (!selectedReport) return;

    await runAction(
      `${API_BASE_URL}/reports/${selectedReport.report_id}/accept`,
      {
        method: "POST",
      },
      "Report accepted successfully."
    );

    await refreshSelectedReport();
  };


  // -------------------------------------------------------
  // ASSIGN TEAM
  // -------------------------------------------------------

  const assignTeam = async () => {

    if (!selectedReport) return;

    if (!selectedTeamId) {
      setErrorMessage(
        "Please select a collection team."
      );
      return;
    }

    const formData = new FormData();

    formData.append(
      "team_id",
      selectedTeamId
    );

    await runAction(
      `${API_BASE_URL}/reports/${selectedReport.report_id}/assign-team`,
      {
        method: "POST",
        body: formData,
      },
      "Collection team assigned successfully."
    );

    await refreshSelectedReport();
  };


  // -------------------------------------------------------
  // START CLEANING
  // -------------------------------------------------------

  const startCleaning = async () => {

    if (!selectedReport) return;

    await runAction(
      `${API_BASE_URL}/reports/${selectedReport.report_id}/start-cleaning`,
      {
        method: "POST",
      },
      "Cleaning process started."
    );

    await refreshSelectedReport();
  };


  // -------------------------------------------------------
  // UPLOAD CLEAN PHOTO
  // -------------------------------------------------------

  const completeReport = async () => {

    if (!selectedReport) return;

    if (!cleanPhoto) {
      setErrorMessage(
        "Please select the clean dustbin photo."
      );
      return;
    }

    const formData = new FormData();

    formData.append(
      "after_clean_photo",
      cleanPhoto
    );

    await runAction(
      `${API_BASE_URL}/reports/${selectedReport.report_id}/complete`,
      {
        method: "POST",
        body: formData,
      },
      "Cleaning completed. Dustbin is now available."
    );

    setCleanPhoto(null);

    await refreshSelectedReport();
  };


  // -------------------------------------------------------
  // REFRESH SELECTED REPORT
  // -------------------------------------------------------

  const refreshSelectedReport = async () => {

    if (!selectedReport) return;

    try {

      const response = await fetch(
        `${API_BASE_URL}/reports/${selectedReport.report_id}`
      );

      if (!response.ok) return;

      const data =
        await response.json();

      setSelectedReport(data);

    } catch {
      // Dashboard reload already handles errors.
    }
  };


  // -------------------------------------------------------
  // PHOTO URL
  // -------------------------------------------------------

  const getPhotoUrl = (
    photoPath?: string | null
  ) => {

    if (!photoPath) {
      return "";
    }

    return `${API_BASE_URL}/${photoPath.replace(
      /\\/g,
      "/"
    )}`;
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
            Loading municipal dashboard...
          </span>

        </div>

      </div>
    );
  }


  // -------------------------------------------------------
  // UI
  // -------------------------------------------------------

  return (
    <div className="min-h-screen bg-[#f7faf7]">

      {/* HEADER */}
      <header className="border-b border-gray-100 bg-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div>

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">

                <ShieldCheck
                  size={24}
                  className="text-green-600"
                />

              </div>

              <div>

                <h1 className="text-2xl font-bold text-gray-800">
                  Municipal Dashboard
                </h1>

                <p className="text-sm text-gray-500">
                  Nagar Nigam · Waste Management Control Center
                </p>

              </div>

            </div>

          </div>

          <div className="rounded-xl bg-green-50 px-4 py-2">

            <span className="text-sm font-semibold text-green-700">
              Municipal Officer
            </span>

          </div>

        </div>

      </header>


      <main className="mx-auto max-w-7xl px-6 py-6">


        {/* ALERTS */}

        {errorMessage && (

          <div className="mb-5 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">

            <AlertCircle size={20} />

            <span className="text-sm font-medium">
              {errorMessage}
            </span>

          </div>
        )}


        {successMessage && (

          <div className="mb-5 flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 p-4 text-green-700">

            <CheckCircle2 size={20} />

            <span className="text-sm font-medium">
              {successMessage}
            </span>

          </div>
        )}


        {/* STATS */}

        <div className="grid gap-4 md:grid-cols-4">

          <div className="rounded-2xl bg-white p-5 shadow-sm">

            <p className="text-sm text-gray-500">
              Active Requests
            </p>

            <p className="mt-1 text-3xl font-bold text-gray-800">
              {reports.length}
            </p>

          </div>


          <div className="rounded-2xl bg-white p-5 shadow-sm">

            <p className="text-sm text-gray-500">
              Pending
            </p>

            <p className="mt-1 text-3xl font-bold text-orange-500">

              {
                reports.filter(
                  (item) =>
                    item.status === "PENDING"
                ).length
              }

            </p>

          </div>


          <div className="rounded-2xl bg-white p-5 shadow-sm">

            <p className="text-sm text-gray-500">
              In Progress
            </p>

            <p className="mt-1 text-3xl font-bold text-blue-600">

              {
                reports.filter(
                  (item) =>
                    item.status === "IN_PROGRESS"
                ).length
              }

            </p>

          </div>


          <div className="rounded-2xl bg-white p-5 shadow-sm">

            <p className="text-sm text-gray-500">
              Available Teams
            </p>

            <p className="mt-1 text-3xl font-bold text-green-600">
              {availableTeams.length}
            </p>

          </div>

        </div>


        {/* MAIN GRID */}

        <div className="mt-6 grid gap-6 lg:grid-cols-12">


          {/* REPORT LIST */}

          <section className="rounded-2xl border border-gray-100 bg-white shadow-sm lg:col-span-4">

            <div className="border-b border-gray-100 px-5 py-4">

              <h2 className="font-bold text-gray-800">
                Citizen Requests
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Active reports from citizens
              </p>

            </div>


            <div className="max-h-[650px] overflow-y-auto">

              {reports.length === 0 ? (

                <div className="p-8 text-center">

                  <CheckCircle2
                    size={32}
                    className="mx-auto text-green-500"
                  />

                  <p className="mt-3 font-semibold text-gray-700">
                    No active requests
                  </p>

                  <p className="mt-1 text-sm text-gray-400">
                    New citizen reports will appear here.
                  </p>

                </div>

              ) : (

                reports.map((report) => (

                  <button
                    key={report.report_id}
                    type="button"
                    onClick={() => {
                      setSelectedReport(report);
                      setSuccessMessage("");
                      setErrorMessage("");
                      setSelectedTeamId(
                        report.team_id
                          ? String(report.team_id)
                          : ""
                      );
                    }}
                    className={`w-full border-b border-gray-100 p-5 text-left transition hover:bg-gray-50 ${
                      selectedReport?.report_id ===
                      report.report_id
                        ? "bg-green-50"
                        : "bg-white"
                    }`}
                  >

                    <div className="flex items-start justify-between gap-3">

                      <div>

                        <p className="text-sm font-bold text-gray-800">
                          {report.report_id}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          Dustbin #{report.dustbin_id}
                        </p>

                      </div>

                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          report.status === "PENDING"
                            ? "bg-orange-50 text-orange-600"
                            : report.status === "IN_PROGRESS"
                            ? "bg-blue-50 text-blue-600"
                            : "bg-green-50 text-green-600"
                        }`}
                      >
                        {report.status}
                      </span>

                    </div>


                    <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">

                      <MapPin
                        size={14}
                        className="text-orange-500"
                      />

                      {report.latitude.toFixed(5)},
                      {" "}
                      {report.longitude.toFixed(5)}

                    </div>

                  </button>

                ))

              )}

            </div>

          </section>


          {/* DETAILS + MAP */}

          <section className="space-y-6 lg:col-span-8">

            {!selectedReport ? (

              <div className="flex min-h-[650px] items-center justify-center rounded-2xl border border-gray-100 bg-white shadow-sm">

                <div className="text-center">

                  <MapPin
                    size={42}
                    className="mx-auto text-green-500"
                  />

                  <h2 className="mt-4 font-bold text-gray-800">
                    Select a citizen request
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">
                    Report details and location will appear here.
                  </p>

                </div>

              </div>

            ) : (

              <>

                {/* REPORT DETAILS */}

                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

                  <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

                    <div>

                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                        Citizen Report
                      </p>

                      <h2 className="mt-1 text-2xl font-bold text-gray-800">
                        {selectedReport.report_id}
                      </h2>

                    </div>

                    <div className="rounded-xl bg-orange-50 px-4 py-2">

                      <span className="text-sm font-semibold text-orange-600">
                        Dustbin #{selectedReport.dustbin_id}
                      </span>

                    </div>

                  </div>


                  {/* LOCATION */}

                  <div className="mt-5 rounded-xl bg-gray-50 p-4">

                    <div className="flex items-center gap-2">

                      <MapPin
                        size={18}
                        className="text-orange-500"
                      />

                      <span className="font-semibold text-gray-700">
                        Report Location
                      </span>

                    </div>

                    <div className="mt-2 text-sm text-gray-600">

                      Latitude:{" "}
                      <strong>
                        {selectedReport.latitude}
                      </strong>

                      <br />

                      Longitude:{" "}
                      <strong>
                        {selectedReport.longitude}
                      </strong>

                    </div>

                    <p className="mt-2 text-xs text-gray-400">
                      Location captured once during citizen submission.
                    </p>

                  </div>


                  {/* BEFORE PHOTO */}

                  <div className="mt-5">

                    <h3 className="font-bold text-gray-800">
                      Citizen's Before Photo
                    </h3>

                    <div className="mt-3 overflow-hidden rounded-2xl bg-gray-100">

                      <img
                        src={getPhotoUrl(
                          selectedReport.photo_path
                        )}
                        alt="Citizen dustbin report"
                        className="max-h-[350px] w-full object-contain"
                      />

                    </div>

                  </div>


                  {/* WORKFLOW */}

                  <div className="mt-6">

                    <h3 className="font-bold text-gray-800">
                      Municipal Workflow
                    </h3>


                    {/* ACCEPT */}

                    {selectedReport.status ===
                      "PENDING" && (

                      <button
                        type="button"
                        onClick={acceptReport}
                        disabled={actionLoading}
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3.5 font-semibold text-white hover:bg-green-700 disabled:opacity-60"
                      >

                        {actionLoading ? (
                          <Loader2
                            size={18}
                            className="animate-spin"
                          />
                        ) : (
                          <CheckCircle2 size={18} />
                        )}

                        Accept Citizen Request

                      </button>

                    )}


                    {/* ASSIGN TEAM */}

                    {(
                      selectedReport.status ===
                        "ACCEPTED" ||
                      selectedReport.status ===
                        "PENDING"
                    ) && (

                      <div className="mt-4 rounded-2xl border border-gray-100 p-4">

                        <div className="flex items-center gap-2">

                          <Users
                            size={18}
                            className="text-green-600"
                          />

                          <h4 className="font-semibold text-gray-800">
                            Assign Collection Team
                          </h4>

                        </div>


                        <select
                          value={selectedTeamId}
                          onChange={(event) =>
                            setSelectedTeamId(
                              event.target.value
                            )
                          }
                          className="mt-3 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-green-500"
                        >

                          <option value="">
                            Select available team
                          </option>

                          {availableTeams.map(
                            (team) => (

                              <option
                                key={team.id}
                                value={team.id}
                              >
                                {team.team_name}
                                {" — "}
                                {team.area}
                              </option>

                            )
                          )}

                        </select>


                        <button
                          type="button"
                          onClick={assignTeam}
                          disabled={
                            actionLoading ||
                            !selectedTeamId
                          }
                          className="mt-3 w-full rounded-xl bg-gray-800 py-3 font-semibold text-white hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Assign Team
                        </button>

                      </div>

                    )}


                    {/* START CLEANING */}

                    {selectedReport.status ===
                      "ASSIGNED" && (

                      <button
                        type="button"
                        onClick={startCleaning}
                        disabled={actionLoading}
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                      >

                        <Play size={18} />

                        Start Cleaning

                      </button>

                    )}


                    {/* FINAL CLEAN PHOTO */}

                    {selectedReport.status ===
                      "IN_PROGRESS" && (

                      <div className="mt-4 rounded-2xl border border-green-100 bg-green-50 p-5">

                        <div className="flex items-center gap-2">

                          <Upload
                            size={19}
                            className="text-green-600"
                          />

                          <h4 className="font-semibold text-green-800">
                            Upload Clean Dustbin Photo
                          </h4>

                        </div>


                        <p className="mt-1 text-xs leading-5 text-green-700">
                          Upload the photo after the team has cleaned the dustbin.
                          This action will resolve the report and unlock the dustbin.
                        </p>


                        <input
                          type="file"
                          accept="image/*"
                          onChange={(event) =>
                            setCleanPhoto(
                              event.target.files?.[0] ||
                                null
                            )
                          }
                          className="mt-4 block w-full rounded-xl border border-green-200 bg-white p-2 text-sm"
                        />


                        <button
                          type="button"
                          onClick={completeReport}
                          disabled={
                            actionLoading ||
                            !cleanPhoto
                          }
                          className="mt-3 w-full rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Complete & Unlock Dustbin
                        </button>

                      </div>

                    )}

                  </div>

                </div>


                {/* MAP */}

                <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

                  <div className="border-b border-gray-100 px-5 py-4">

                    <div className="flex items-center gap-2">

                      <MapPin
                        size={19}
                        className="text-orange-500"
                      />

                      <h2 className="font-bold text-gray-800">
                        Citizen Report Location
                      </h2>

                    </div>

                  </div>


                  <div className="h-[430px]">

                    <MapContainer
                      center={[
                        selectedReport.latitude,
                        selectedReport.longitude,
                      ]}
                      zoom={15}
                      scrollWheelZoom={true}
                      className="h-full w-full"
                    >

                      <TileLayer
                        attribution='&copy; OpenStreetMap contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />

                      <MapCenter
                        latitude={
                          selectedReport.latitude
                        }
                        longitude={
                          selectedReport.longitude
                        }
                      />

                      <Marker
                        position={[
                          selectedReport.latitude,
                          selectedReport.longitude,
                        ]}
                      >

                        <Popup>

                          <div className="text-sm">

                            <strong>
                              {selectedReport.report_id}
                            </strong>

                            <br />

                            Dustbin #
                            {selectedReport.dustbin_id}

                            <br />

                            {selectedReport.latitude.toFixed(
                              6
                            )}
                            ,
                            {" "}
                            {selectedReport.longitude.toFixed(
                              6
                            )}

                          </div>

                        </Popup>

                      </Marker>

                    </MapContainer>

                  </div>

                </div>

              </>

            )}

          </section>

        </div>

      </main>

    </div>
  );
}

export default MunicipalDashboard;