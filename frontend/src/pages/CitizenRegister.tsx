
import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/api";

export default function CitizenRegister() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!password) {
      setError("Please enter password.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("email", email.trim().toLowerCase());
      formData.append("password", password);

      const requestUrl = `${API_BASE_URL}/users/`;

      console.log("Registration API URL:", requestUrl);

      const response = await fetch(requestUrl, {
        method: "POST",
        body: formData,
      });

      const contentType =
        response.headers.get("content-type") || "";

      if (!contentType.includes("application/json")) {
        const responseText = await response.text();

        console.error("Unexpected server response:", {
          status: response.status,
          url: response.url,
          body: responseText.slice(0, 300),
        });

        setError(
          `Server returned ${response.status}. Please check the API URL.`
        );
        return;
      }

      const data = await response.json();

      console.log("Registration status:", response.status);

      if (!response.ok) {
        if (typeof data.detail === "string") {
          setError(data.detail);
        } else if (data.detail) {
          setError(JSON.stringify(data.detail));
        } else {
          setError(
            `Registration failed. Server returned ${response.status}.`
          );
        }
        return;
      }

      alert("Citizen account created successfully!");

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      navigate("/citizen-login");
    } catch (err) {
      console.error("Registration error:", err);

      setError(
        "Cannot connect to the server. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-green-700 text-center">
          Citizen Registration
        </h1>

        <p className="text-gray-500 text-center mt-2 mb-6">
          Create your CleanCity account
        </p>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            required
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
            required
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
          />

          {error && (
            <div
              role="alert"
              className="bg-red-50 border border-red-200 rounded-lg p-3"
            >
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50"
          >
            {loading
              ? "Creating Account..."
              : "Create Citizen Account"}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link
            to="/citizen-login"
            className="text-green-700 font-medium hover:underline"
          >
            Already have an account? Citizen Login
          </Link>
        </div>
      </div>
    </div>
  );
}
