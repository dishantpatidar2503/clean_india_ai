import { useState } from "react";
import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://127.0.0.1:8000";

// Available dustbin for testing
const DUSTBIN_ID = 2;

function ReportDustbin() {
  const navigate = useNavigate();

  const [photo, setPhoto] = useState<File | null>(null);

  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [gettingLocation, setGettingLocation] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // ============================================================
  // PHOTO
  // ============================================================

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    setErrorMessage("");

    if (!selectedFile) {
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      setErrorMessage(
        "Only JPG, PNG and WEBP camera photos are allowed."
      );
      return;
    }

    setPhoto(selectedFile);
  };

  // ============================================================
  // LOCATION
  // ============================================================

  const getCurrentLocation = () => {
    setErrorMessage("");

    if (!navigator.geolocation) {
      setErrorMessage(
        "Geolocation is not supported by this browser."
      );
      return;
    }

    setGettingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        setGettingLocation(false);
      },

      (error) => {
        console.error("Location error:", error);

        setGettingLocation(false);

        setErrorMessage(
          "Unable to get your location. Please allow location permission."
        );
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  // ============================================================
  // SUBMIT REPORT
  // ============================================================

  const handleSubmit = async () => {
    setErrorMessage("");

    // ----------------------------------------------------------
    // GET CITIZEN ID
    // ----------------------------------------------------------

    const citizenId = localStorage.getItem("userId");

    console.log("Citizen ID from localStorage:", citizenId);

    if (
      !citizenId ||
      citizenId === "undefined" ||
      citizenId === "null"
    ) {
      setErrorMessage(
        "Citizen ID is missing. Please login again."
      );
      return;
    }

    // Make sure ID is actually a number
    const citizenIdNumber = Number(citizenId);

    if (!Number.isInteger(citizenIdNumber)) {
      setErrorMessage(
        "Invalid citizen ID. Please login again."
      );
      return;
    }

    // ----------------------------------------------------------
    // PHOTO CHECK
    // ----------------------------------------------------------

    if (!photo) {
      setErrorMessage(
        "Please capture a dustbin photo using the camera."
      );
      return;
    }

    // ----------------------------------------------------------
    // LOCATION CHECK
    // ----------------------------------------------------------

    if (!location) {
      setErrorMessage(
        "Please capture your current location first."
      );
      return;
    }

    setSubmitting(true);

    try {
      // --------------------------------------------------------
      // CREATE FORM DATA
      // --------------------------------------------------------

      const formData = new FormData();

      formData.append(
        "dustbin_id",
        String(DUSTBIN_ID)
      );

      formData.append(
        "citizen_id",
        String(citizenIdNumber)
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

      // Debug
      console.log(
        "Sending dustbin_id:",
        formData.get("dustbin_id")
      );

      console.log(
        "Sending citizen_id:",
        formData.get("citizen_id")
      );

      console.log(
        "Sending latitude:",
        formData.get("latitude")
      );

      console.log(
        "Sending longitude:",
        formData.get("longitude")
      );

      console.log(
        "Sending photo:",
        formData.get("photo")
      );

      // --------------------------------------------------------
      // SEND TO BACKEND
      // --------------------------------------------------------

      const response = await fetch(
        `${API_BASE_URL}/reports/`,
        {
          method: "POST",
          body: formData,
        }
      );

      // --------------------------------------------------------
      // READ RESPONSE
      // --------------------------------------------------------

      let result: any = null;

      try {
        result = await response.json();
      } catch {
        result = null;
      }

      console.log(
        "Backend response:",
        result
      );

      // --------------------------------------------------------
      // ERROR RESPONSE
      // --------------------------------------------------------

      if (!response.ok) {
        let message = "Report submission failed.";

        if (typeof result?.detail === "string") {
          message = result.detail;
        } else if (result?.detail?.message) {
          message = result.detail.message;
        } else if (result?.message) {
          message = result.message;
        } else if (result?.detail) {
          message = JSON.stringify(result.detail);
        } else {
          message = `Report submission failed (${response.status})`;
        }

        throw new Error(message);
      }

      // --------------------------------------------------------
      // AI RESULT
      // --------------------------------------------------------

      const aiVerification =
        result?.ai_verification || {};

      console.log(
        "AI verification:",
        aiVerification
      );

      // --------------------------------------------------------
      // GO TO AI VERIFICATION PAGE
      // --------------------------------------------------------

      navigate("/ai-verification", {
        state: {
          reportId: result?.report_id,

          status:
            result?.status || "PENDING",

          dustbin_detected:
            aiVerification?.dustbin_detected ?? false,

          confidence:
            aiVerification?.confidence ?? 0,

          detections:
            aiVerification?.detections ?? [],

          municipal_name:
            result?.municipal_name,

          municipal_distance_km:
            result?.municipal_distance_km ?? 0,
        },
      });

    } catch (error) {
      console.error(
        "Report submission error:",
        error
      );

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to submit report. Please try again."
      );

    } finally {
      setSubmitting(false);
    }
  };

  // ============================================================
  // UI
  // ============================================================

  return (
    <div className="min-h-screen bg-green-50 px-4 py-8">
      <div className="mx-auto max-w-2xl">

        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 text-sm font-medium text-green-700 hover:text-green-900"
          >
            ← Back
          </button>

          <h1 className="text-3xl font-bold text-gray-900">
            Report Dustbin
          </h1>

          <p className="mt-2 text-gray-600">
            Capture a dustbin photo and submit your report.
            Our AI will verify the image automatically.
          </p>
        </div>

        {/* Main Card */}
        <div className="rounded-2xl bg-white p-6 shadow-md">

          {/* Photo Upload */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-semibold text-gray-800">
              Dustbin Photo
            </label>

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              capture="environment"
              onChange={handlePhotoChange}
              className="w-full rounded-lg border border-gray-300 p-3"
            />

            {photo && (
              <p className="mt-2 text-sm text-green-700">
                ✓ Photo selected: {photo.name}
              </p>
            )}
          </div>

          {/* Location */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-semibold text-gray-800">
              Current Location
            </label>

            <button
              type="button"
              onClick={getCurrentLocation}
              disabled={gettingLocation}
              className="rounded-lg bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {gettingLocation
                ? "Getting Location..."
                : "📍 Capture Current Location"}
            </button>

            {location && (
              <div className="mt-3 rounded-lg bg-green-50 p-3 text-sm text-green-800">
                <p>
                  <strong>Latitude:</strong>{" "}
                  {location.latitude}
                </p>

                <p>
                  <strong>Longitude:</strong>{" "}
                  {location.longitude}
                </p>
              </div>
            )}
          </div>

          {/* Error */}
          {errorMessage && (
            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              ❌ {errorMessage}
            </div>
          )}

          {/* Submit */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full rounded-xl bg-green-700 px-6 py-4 font-bold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting
              ? "🤖 AI Verifying..."
              : "Submit Dustbin Report"}
          </button>

          {/* Info */}
          <div className="mt-5 rounded-lg bg-green-50 p-4 text-sm text-gray-700">
            <p className="font-semibold text-green-800">
              🤖 AI Verification
            </p>

            <p className="mt-1">
              Your uploaded image will be checked by
              the AI model before the report is submitted.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ReportDustbin;