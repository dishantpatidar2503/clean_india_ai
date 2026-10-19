import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_BASE_URL = "http://127.0.0.1:8000";

export default function OfficerLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      alert("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("email", email.trim().toLowerCase());
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
        alert(data.detail || "Officer login failed.");
        return;
      }

      // Check backend response
      if (!data.access_token || !data.user) {
        alert("Invalid officer login response.");
        return;
      }

      // Clear old citizen session
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("userRole");
      localStorage.removeItem("municipalId");

      // Save officer session
      localStorage.setItem("accessToken", data.access_token);
      localStorage.setItem("userId", String(data.user.id));
      localStorage.setItem(
        "municipalId",
        String(data.user.municipal_id)
      );
      localStorage.setItem(
        "userRole",
        data.user.role
      );
      localStorage.setItem(
        "userName",
        data.user.name
      );
      localStorage.setItem(
        "userEmail",
        data.user.email
      );

      // Go to municipal dashboard
      navigate("/municipal-dashboard", {
        replace: true,
      });

    } catch (error) {
      console.error("Officer login error:", error);

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
            Municipal Officer Login
          </h1>

          <p className="text-gray-500 mt-2">
            Access CleanCity municipal dashboard
          </p>
        </div>

        {/* Login Form */}
        <div className="space-y-4">

          {/* Email */}
          <input
            type="email"
            placeholder="Official Email"
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
            {loading ? "Logging in..." : "Officer Login"}
          </button>

        </div>

        {/* Register */}
        <div className="text-center mt-6">
          <span className="text-gray-500">
            New municipal officer?{" "}
          </span>

          <Link
            to="/officer-register"
            className="text-green-600 font-semibold hover:underline"
          >
            Create Officer Account
          </Link>
        </div>

        {/* Citizen Login */}
        <div className="text-center mt-4">
          <span className="text-gray-500">
            Citizen?{" "}
          </span>

          <Link
            to="/citizen-login"
            className="text-green-600 font-semibold hover:underline"
          >
            Citizen Login
          </Link>
        </div>

      </div>

    </div>
  );
}