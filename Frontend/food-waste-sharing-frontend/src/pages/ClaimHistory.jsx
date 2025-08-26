import React, { useEffect, useState } from "react";
import api from "../services/api.js";

export default function ClaimHistory() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const userId = localStorage.getItem("userId") || 1;
      const res = await api.get(`/claims/user/${userId}`);
      setClaims(res.data || []);
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to load claim history");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  if (loading) return <div className="text-gray-600">Loading claims…</div>;

  return (
    <div className="bg-white rounded shadow p-6">
      <h2 className="text-xl font-semibold text-royal-500 mb-4">Your Claims</h2>
      {!claims.length ? (
        <div className="text-gray-600">No claims yet.</div>
      ) : (
        <ul className="space-y-3">
          {claims.map((c) => (
            <li key={c.claimId || c.id} className="border rounded p-3">
              <div className="font-semibold">{c.foodName || c.donation?.foodName || "Donation"}</div>
              <div className="text-sm text-gray-600">Status: {c.status || "PENDING"}</div>
              <div className="text-xs text-gray-500">
                Claimed at: {c.claimedAt ? new Date(c.claimedAt).toLocaleString() : "—"}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
