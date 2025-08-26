import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "", // Changed from 'phone' to match backend
    location: ""
  });
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const setField = (key, val) => {
    setForm(prev => ({ ...prev, [key]: val }));
  };

  const validateForm = () => {
    if (form.password.length < 8) {
      alert("Password must be at least 8 characters");
      return false;
    }
    if (!form.email.includes("@")) {
      alert("Please enter a valid email");
      return false;
    }
    return true;
  };

  const submit = async (e) => {
  e.preventDefault();
  setBusy(true);
  try {
    const res = await api.post("/users/register", {
      name: form.name,
      email: form.email,
      password: form.password,
      mobile: Number(form.mobile),  // Ensure this is a number
      location: form.location
    }, {
      headers: {
        'Content-Type': 'application/json'  // Explicit JSON header
      }
    });

    if (res.data.userId) {
      localStorage.setItem("userId", res.data.userId);
      navigate("/dashboard");
    }
  } catch (err) {
    const errorMsg = err.response?.data?.message || 
                    err.message || 
                    "Registration failed";
    alert(errorMsg);
    console.error("Registration error:", err.response?.data);
  } finally {
    setBusy(false);
  }
};

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4 text-royal-500">Create Account</h2>
      <form onSubmit={submit} className="space-y-3">
        <input
          value={form.name}
          onChange={(e) => setField('name', e.target.value)}
          placeholder="Full Name"
          className="w-full p-2 border rounded"
          required
        />
        <input
          value={form.email}
          onChange={(e) => setField('email', e.target.value)}
          placeholder="Email"
          type="email"
          className="w-full p-2 border rounded"
          required
        />
        <input
          value={form.password}
          onChange={(e) => setField('password', e.target.value)}
          placeholder="Password"
          type="password"
          className="w-full p-2 border rounded"
          required
          minLength="8"
        />
        <input
          value={form.mobile}
          onChange={(e) => setField('mobile', e.target.value)}
          placeholder="Mobile Number"
          type="number"
          className="w-full p-2 border rounded"
          required
        />
        <input
          value={form.location}
          onChange={(e) => setField('location', e.target.value)}
          placeholder="Location"
          className="w-full p-2 border rounded"
          required
        />
        <button
          disabled={busy}
          className={`w-full py-2 rounded ${
            busy ? "bg-gray-400" : "bg-gold-500 hover:bg-gold-600 text-white"
          }`}
        >
          {busy ? "Creating Account..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}