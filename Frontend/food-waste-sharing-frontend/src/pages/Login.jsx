import React, { useState } from "react";
import api from "../services/api.js";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await api.post("/users/login", { email, password });
      // adjust if your backend returns different fields
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.name || "");
      localStorage.setItem("userId", res.data.userId || "");
      navigate("/dashboard");
    } catch (err) {
      alert(err?.response?.data?.message || "Login failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4 text-royal-500">Login</h2>
      <form onSubmit={submit} className="space-y-4">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 border rounded"
          type="email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 border rounded"
          required
        />
        <button disabled={busy} className="w-full bg-royal-500 text-white py-2 rounded">
          {busy ? "Logging in..." : "Login"}
        </button>
        <div className="text-sm text-center">
          No account?{" "}
          <Link to="/register" className="text-royal-500 underline">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}
