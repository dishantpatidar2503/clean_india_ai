import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://127.0.0.1:8000";

function OfficerLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const cleanEmail = email.trim().toLowerCase();

      // -----------------------------
      // VALIDATION
      // -----------------------------
      if (!cleanEmail || !password) {
        setError("Please enter email and password.");
        setLoading(false);
        return;
      }

      // -----------------------------
      // FORM DATA
      // -----------------------------
      const formData = new FormData();

      formData.append("email", cleanEmail);
      formData.append("password", password);

      console.log("=================================");
      console.log("MUNICIPAL OFFICER LOGIN");
      console.log("Email:", cleanEmail);
      console.log("Password length:", password.length);
      console.log("=================================");

      // -----------------------------
      // API REQUEST
      // -----------------------------
      const response = await fetch(
        `${API_BASE_URL}/users/officer-login`,
        {
          method: "POST",
          body: formData,
        }
      );

      // -----------------------------
      // READ RESPONSE
      // -----------------------------
      let data: any = null;

      try {
        data = await response.json();
      } catch {
        data = {
          detail: "Server returned an invalid response.",
        };
      }

      console.log("Backend status:", response.status);
      console.log("Backend response:", data);

      // -----------------------------
      // API ERROR
      // -----------------------------
      if (!response.ok) {
        throw new Error(
          data?.detail ||
            data?.message ||
            `Officer login failed (${response.status})`
        );
      }

      // -----------------------------
      // CHECK ACCESS TOKEN
      // -----------------------------
      if (!data?.access_token) {
        throw new Error(
          "Login successful, but access token was not received."
        );
      }

      // -----------------------------
      // CHECK USER
      // -----------------------------
      if (!data?.user?.id) {
        throw new Error(
          "Login successful, but officer information was not received."
        );
      }

      // -----------------------------
      // CHECK ROLE
      // -----------------------------
      if (
        data?.user?.role &&
        data.user.role !== "MUNICIPAL_OFFICER"
      ) {
        throw new Error(
          "This account is not registered as a municipal officer."
        );
      }

      // -----------------------------
      // SAVE LOGIN DATA
      // -----------------------------
      localStorage.setItem(
        "accessToken",
        data.access_token
      );

      localStorage.setItem(
        "userRole",
        "MUNICIPAL_OFFICER"
      );

      localStorage.setItem(
        "userId",
        String(data.user.id)
      );

      localStorage.setItem(
        "municipalId",
        String(data.user.municipal_id ?? "")
      );

      localStorage.setItem(
        "userName",
        data.user.name || ""
      );

      localStorage.setItem(
        "userEmail",
        data.user.email || cleanEmail
      );

      // -----------------------------
      // VERIFY LOCAL STORAGE
      // -----------------------------
      console.log("=================================");
      console.log("OFFICER LOGIN SUCCESSFUL");
      console.log(
        "Token saved:",
        !!localStorage.getItem("accessToken")
      );
      console.log(
        "Role:",
        localStorage.getItem("userRole")
      );
      console.log(
        "User ID:",
        localStorage.getItem("userId")
      );
      console.log(
        "Municipal ID:",
        localStorage.getItem("municipalId")
      );
      console.log(
        "User Name:",
        localStorage.getItem("userName")
      );
      console.log(
        "User Email:",
        localStorage.getItem("userEmail")
      );
      console.log("=================================");

      // -----------------------------
      // GO TO MUNICIPAL DASHBOARD
      // -----------------------------
      window.location.href = "/municipal";

    } catch (err) {
      console.error("Officer login error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7faf7] flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm border border-gray-100">

        {/* HEADER */}
        <div className="text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-3xl">
            🏛️
          </div>

          <h1 className="mt-5 text-2xl font-bold text-gray-800">
            Municipal Officer Login
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Access your Nagar Nigam dashboard
          </p>

        </div>

        {/* LOGIN FORM */}
        <form
          onSubmit={handleLogin}
          className="mt-8 space-y-5"
        >

          {/* EMAIL */}
          <div>

            <label className="text-sm font-semibold text-gray-700">
              Official Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Enter official email"
              autoComplete="email"
              required
              disabled={loading}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-400 disabled:bg-gray-50"
            />

          </div>

          {/* PASSWORD */}
          <div>

            <label className="text-sm font-semibold text-gray-700">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter password"
              autoComplete="current-password"
              required
              disabled={loading}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-400 disabled:bg-gray-50"
            />

          </div>

          {/* ERROR */}
          {error && (
            <div className="rounded-xl border border-red-100 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-orange-500 py-3.5 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Logging in..."
              : "Login as Officer"}
          </button>

        </form>

        {/* CITIZEN LOGIN */}
        <div className="mt-6 border-t border-gray-100 pt-5 text-center">

          <p className="text-sm text-gray-500">
            Are you a citizen?
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/citizen-login")
            }
            disabled={loading}
            className="mt-2 font-semibold text-green-600 hover:text-green-700 disabled:opacity-50"
          >
            Citizen Login
          </button>

        </div>

      </div>
    </div>
  );
}

export default OfficerLogin;