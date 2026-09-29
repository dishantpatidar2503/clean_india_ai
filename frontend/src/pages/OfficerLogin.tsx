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

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("email", email);
      formData.append("password", password);

      const response = await fetch(
        `${API_BASE_URL}/users/officer-login`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Officer login failed"
        );
      }

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
        String(data.user.municipal_id)
      );

      navigate("/municipal");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7faf7] flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm border border-gray-100">

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

        <form
          onSubmit={handleLogin}
          className="mt-8 space-y-5"
        >
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
              required
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-400"
            />
          </div>

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
              required
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-orange-400"
            />
          </div>

          {error && (
            <div className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-orange-500 py-3.5 font-semibold text-white hover:bg-orange-600 disabled:opacity-60"
          >
            {loading
              ? "Logging in..."
              : "Login as Officer"}
          </button>
        </form>

        <div className="mt-6 border-t border-gray-100 pt-5 text-center">
          <p className="text-sm text-gray-500">
            Are you a citizen?
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/citizen-login")
            }
            className="mt-2 font-semibold text-green-600"
          >
            Citizen Login
          </button>
        </div>

      </div>
    </div>
  );
}

export default OfficerLogin;