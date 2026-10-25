import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { API_BASE_URL } from "../config/api";

export default function CitizenLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password.");
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
        alert(data.detail || "Login failed.");
        return;
      }

      // Save login information
      localStorage.setItem("accessToken", data.access_token);
      localStorage.setItem("userId", String(data.user_id));
      localStorage.setItem("userRole", data.user.role);
      // Go to citizen dashboard
      navigate("/citizen-dashboard");

    } catch (error) {
      console.error("Login error:", error);

      alert(
        "Unable to connect to backend. Please start FastAPI server."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8">

        {/* Heading */}
        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-green-700">
            Citizen Login
          </h1>

          <p className="text-gray-500 mt-2">
            Welcome back to CleanCity
          </p>

        </div>

        {/* Login Form */}
        <div className="space-y-4">

          {/* Email */}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-green-500"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-green-500"
          />

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </div>

        {/* Register */}
        <div className="text-center mt-6">

          <span className="text-gray-500">
            New citizen?{" "}
          </span>

          <Link
            to="/citizen-register"
            className="text-green-600 font-semibold hover:underline"
          >
            Create New Account
          </Link>

        </div>

        {/* Officer Login */}
        <div className="text-center mt-4">

          <span className="text-gray-500">
            Municipal Officer?{" "}
          </span>

          <Link
            to="/officer-login"
            className="text-green-600 font-semibold hover:underline"
          >
            Officer Login
          </Link>

        </div>

      </div>

    </div>
  );
}
