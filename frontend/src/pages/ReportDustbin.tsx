import { useState, type ChangeEvent } from "react";
import {
  Camera,
  MapPin,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

const API_BASE_URL = "http://127.0.0.1:8000";

// Temporary testing values.
// Later these will come from logged-in citizen / selected dustbin.
const CITIZEN_ID = 1;
const DUSTBIN_ID = 1;

function ReportDustbin() {
  const [photo, setPhoto] = useState<File | null>(null);

  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [gettingLocation, setGettingLocation] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  const [successMessage, setSuccessMessage] =
    useState("");

  const [errorMessage, setErrorMessage] =
    useState("");

  // -------------------------------------------------------
  // ONE-TIME LOCATION
  // -------------------------------------------------------

  const getCurrentLocation = (): Promise<{
    latitude: number;
    longitude: number;
  }> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(
          new Error(
            "Geolocation is not supported by this browser."
          )
        );
        return;
      }

      setGettingLocation(true);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coordinates = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };

          setLocation(coordinates);
          setGettingLocation(false);

          resolve(coordinates);
        },
        (error) => {
          setGettingLocation(false);

          let message =
            "Unable to get your location.";

          switch (error.code) {
            case error.PERMISSION_DENIED:
              message =
                "Location permission was denied. Please allow location access.";
              break;

            case error.POSITION_UNAVAILABLE:
              message =
                "Your location is currently unavailable.";
              break;

            case error.TIMEOUT:
              message =
                "Location request timed out. Please try again.";
              break;
          }

          reject(new Error(message));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    });
  };

  // -------------------------------------------------------
  // PHOTO SELECT
  // -------------------------------------------------------
  // As soon as the citizen selects/captures the photo,
  // we immediately capture the current location ONCE.

  const handlePhotoChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile =
      event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    setPhoto(selectedFile);
    setLocation(null);
    setSuccessMessage("");
    setErrorMessage("");

    // Automatically capture location immediately
    // after photo selection/capture.
    try {
      await getCurrentLocation();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to capture your location."
      );
    }
  };

  // -------------------------------------------------------
  // MANUAL LOCATION RETRY
  // -------------------------------------------------------

  const handleLocationClick = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await getCurrentLocation();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to get location."
      );
    }
  };

  // -------------------------------------------------------
  // SUBMIT REPORT
  // -------------------------------------------------------

  const handleSubmit = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    // Photo required
    if (!photo) {
      setErrorMessage(
        "Please capture or select a dustbin photo first."
      );
      return;
    }

    // Location required
    if (!location) {
      setErrorMessage(
        "Your report location has not been captured yet. Please allow location access."
      );
      return;
    }

    setSubmitting(true);

    try {
      // ---------------------------------------------------
      // PREPARE FORMDATA
      // ---------------------------------------------------

      const formData = new FormData();

      formData.append(
        "dustbin_id",
        String(DUSTBIN_ID)
      );

      formData.append(
        "citizen_id",
        String(CITIZEN_ID)
      );

      formData.append(
        "latitude",
        String(location.latitude)
      );

      formData.append(
        "longitude",
        String(location.longitude)
      );

      formData.append(
        "photo",
        photo
      );

      // ---------------------------------------------------
      // SEND TO FASTAPI
      // ---------------------------------------------------

      const response = await fetch(
        `${API_BASE_URL}/reports/`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail ||
            "Unable to submit dustbin report."
        );
      }

      // ---------------------------------------------------
      // SAVE ACTUAL REPORT ID
      // ---------------------------------------------------

      localStorage.setItem(
        "latestReportId",
        data.report_id
      );

      // ---------------------------------------------------
      // SUCCESS
      // ---------------------------------------------------

      setSuccessMessage(
        `Report submitted successfully. Report ID: ${data.report_id}`
      );

      setLocation({
        latitude: data.latitude,
        longitude: data.longitude,
      });

    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while submitting the report."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // -------------------------------------------------------
  // UI
  // -------------------------------------------------------

  return (
    <div className="min-h-screen bg-[#f7faf7]">

      {/* Header */}
      <header className="border-b border-gray-100 bg-white">

        <div className="mx-auto flex max-w-3xl items-center gap-4 px-6 py-4">

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100"
          >
            <ArrowLeft
              size={20}
              className="text-gray-600"
            />
          </button>

          <div>

            <h1 className="text-xl font-bold text-gray-800">
              Report a Dustbin
            </h1>

            <p className="text-xs text-gray-500">
              Help keep your city clean
            </p>

          </div>

        </div>

      </header>


      {/* Content */}
      <main className="mx-auto max-w-3xl px-6 py-8">

        {/* Information */}
        <div className="rounded-2xl bg-green-50 p-5">

          <h2 className="font-semibold text-green-800">
            📸 Take a current photo
          </h2>

          <p className="mt-1 text-sm leading-6 text-green-700">
            Capture the dustbin clearly. Your location will be
            captured automatically once after the photo is selected.
          </p>

        </div>


        {/* PHOTO UPLOAD */}
        <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

          <h2 className="text-lg font-bold text-gray-800">
            Dustbin Photo
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Capture or upload a clear photo of the dustbin.
          </p>


          <label className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-green-200 bg-green-50 px-6 py-12 transition hover:bg-green-100">

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">

              <Camera
                size={30}
                className="text-green-600"
              />

            </div>


            <p className="mt-4 max-w-full truncate px-4 text-center font-semibold text-gray-700">

              {photo
                ? photo.name
                : "Take Photo"}

            </p>


            <p className="mt-1 text-sm text-gray-500">

              {photo
                ? "Photo selected successfully"
                : "Use your phone camera"}

            </p>


            <input
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handlePhotoChange}
            />

          </label>


          {photo && (

            <div className="mt-4 rounded-xl bg-green-50 p-3 text-sm text-green-700">

              ✅ Dustbin photo ready

            </div>

          )}

        </div>


        {/* LOCATION */}
        <div className="mt-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100">

              <MapPin
                size={23}
                className="text-orange-500"
              />

            </div>


            <div>

              <h2 className="font-bold text-gray-800">
                Report Location
              </h2>

              <p className="text-sm text-gray-500">
                Captured automatically once after the photo.
              </p>

            </div>

          </div>


          {/* LOCATION STATUS */}

          {gettingLocation && (

            <div className="mt-5 flex items-center gap-3 rounded-xl bg-orange-50 p-4 text-sm text-orange-700">

              <Loader2
                size={18}
                className="animate-spin"
              />

              Capturing your location...

            </div>

          )}


          {location && !gettingLocation && (

            <div className="mt-5 rounded-xl bg-green-50 p-4">

              <div className="flex items-center gap-2 text-green-700">

                <CheckCircle2 size={18} />

                <span className="font-semibold">
                  Location Captured
                </span>

              </div>


              <div className="mt-3 text-sm text-gray-600">

                <p>
                  <strong>Latitude:</strong>{" "}
                  {location.latitude.toFixed(6)}
                </p>

                <p className="mt-1">
                  <strong>Longitude:</strong>{" "}
                  {location.longitude.toFixed(6)}
                </p>

              </div>


              <p className="mt-3 text-xs text-gray-400">
                This location will be saved only with this report.
                No continuous location tracking is used.
              </p>

            </div>

          )}


          {/* RETRY LOCATION */}

          {!location && !gettingLocation && photo && (

            <button
              type="button"
              onClick={handleLocationClick}
              className="mt-5 w-full rounded-xl border border-green-200 bg-green-50 py-3 font-semibold text-green-700 transition hover:bg-green-100"
            >
              📍 Allow Location & Try Again
            </button>

          )}

        </div>


        {/* SUCCESS MESSAGE */}

        {successMessage && (

          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 p-4 text-green-800">

            <CheckCircle2
              size={22}
              className="mt-0.5 shrink-0"
            />

            <div>

              <p className="text-sm font-medium">
                {successMessage}
              </p>

              <p className="mt-1 text-xs text-green-600">
                Your report is now being processed by the municipal team.
              </p>

            </div>

          </div>

        )}


        {/* ERROR MESSAGE */}

        {errorMessage && (

          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">

            <AlertCircle
              size={22}
              className="mt-0.5 shrink-0"
            />

            <p className="text-sm font-medium">
              {errorMessage}
            </p>

          </div>

        )}


        {/* SUBMIT */}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={
            submitting ||
            gettingLocation ||
            !photo ||
            !location
          }
          className="mt-6 w-full rounded-xl bg-green-600 py-4 font-semibold text-white shadow-sm transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
        >

          {submitting
            ? "Submitting Report..."
            : gettingLocation
            ? "Capturing Location..."
            : !location && photo
            ? "Waiting for Location..."
            : "Submit Dustbin Report"}

        </button>


        <p className="mt-3 text-center text-xs text-gray-400">
          Your location is captured once after the photo and is
          not continuously tracked.
        </p>

      </main>

    </div>
  );
}

export default ReportDustbin;