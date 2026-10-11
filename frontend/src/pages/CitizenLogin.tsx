import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, ArrowLeft, LogIn } from "lucide-react";

const API_BASE_URL = "http://127.0.0.1:8000";

export default function CitizenLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("email", email);
      formData.append("password", password);

      const response = await fetch(
        `${API_BASE_URL}/users/citizen-login`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Login failed.");
      }

      // Save login information
      if (data.access_token) {
        localStorage.setItem("accessToken", data.access_token);
      }

      if (data.user_id) {
        localStorage.setItem("userId", String(data.user_id));
      }

      localStorage.setItem("userRole", "CITIZEN");

      // Go to citizen dashboard
      navigate("/citizen-dashboard");

    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7faf7] flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        {/* Back to Home */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 mb-5 hover:text-green-700"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">

          {/* Header */}
          <div className="text-center mb-7">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100">
              <User
                size={30}
                className="text-green-600"
              />
            </div>

            <h1 className="mt-5 text-2xl font-bold text-gray-800">
              Citizen Login
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Login to report and track waste issues
            </p>

          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Email
              </label>

              <div className="relative">

                <Mail
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />

              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Password
              </label>

              <div className="relative">

                <Lock
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />

              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3.5 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <LogIn size={19} />

              {loading
                ? "Logging in..."
                : "Login as Citizen"}
            </button>

          </form>

          {/* New Citizen */}
          <div className="mt-7 border-t border-gray-100 pt-6 text-center">

            <p className="text-sm text-gray-500">
              Don't have an account?
            </p>

            <Link
              to="/citizen-register"
              className="mt-2 inline-flex items-center gap-2 font-semibold text-green-600 hover:text-green-700 hover:underline"
            >
              <User size={17} />
              Create New Citizen Account
            </Link>

          </div>

        </div>

        {/* Officer Login */}
        <div className="mt-5 text-center">

          <p className="text-sm text-gray-500">
            Are you a municipal officer?
          </p>

          <Link
            to="/officer-login"
            className="mt-1 inline-block text-sm font-semibold text-orange-600 hover:text-orange-700 hover:underline"
          >
            Municipal Officer Login
          </Link>

        </div>

      </div>
    </div>
  );
}