import React, { useEffect, useState } from "react";
import api from "../services/api.js";
import DonationCard from "../components/DonationCard.jsx";

export default function DonationsList() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const res = await api.get("/donations");
      setList(res.data || []);
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to load donations");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function claim(donation) {
    try {
      const userId = localStorage.getItem("userId") || 1;
      await api.post(`/claims/create/${donation.donationId}/${userId}`);
      alert("Claimed! Check your claim history.");
    } catch (err) {
      alert(err?.response?.data?.message || "Claim failed");
    }
  }

  if (loading) return <div className="text-gray-600">Loading donations…</div>;
  if (!list.length) return <div className="text-gray-600">No donations right now.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {list.map((d) => (
        <DonationCard key={d.donationId || d.id} donation={d} onClaim={claim} />
      ))}
    </div>
  );
}
