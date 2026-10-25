import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import { API_BASE_URL } from "../config/api";

export default function OfficerRegister() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [municipalId, setMunicipalId] = useState("1");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter officer name.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter email.");
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
      formData.append("email", email.trim());
      formData.append("password", password);
      formData.append("municipal_id", municipalId);

      const response = await fetch(
        `${API_BASE_URL}/users/create-officer`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || "Officer registration failed.");
        return;
      }

      alert("Officer account created successfully!");
      navigate("/officer-login");

    } catch (error) {
      console.error(error);
      setError("Cannot connect to backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-green-700 text-center">
          Officer Registration
        </h1>

        <p className="text-gray-500 text-center mt-2 mb-6">
          Create Municipal Officer Account
        </p>

        <form onSubmit={handleRegister} className="space-y-4">

          <input
            type="text"
            placeholder="Officer Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            type="email"
            placeholder="Officer Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            type="number"
            placeholder="Municipal ID"
            value={municipalId}
            onChange={(e) => setMunicipalId(e.target.value)}
            className="w-full border rounded-lg px-4 py-3"
          />

          {error && (
            <p className="text-red-600 text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
          >
            {loading ? "Creating..." : "Create Officer Account"}
          </button>

        </form>

        <div className="text-center mt-6">
          <Link
            to="/officer-login"
            className="text-green-700 font-medium"
          >
            Already have an account? Officer Login
          </Link>
        </div>

      </div>
    </div>
  );
}
