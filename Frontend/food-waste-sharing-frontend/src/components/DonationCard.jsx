import React from "react";

export default function DonationCard({ donation, onClaim }) {
  return (
    <div className="bg-white rounded shadow p-4 flex gap-4">
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-royal-500">{donation.foodName}</h3>
        <p className="text-sm text-gray-600">{donation.description}</p>
        <div className="mt-2 text-xs text-gray-500">
          Qty: {donation.quantity} • {donation.expiryTime ? new Date(donation.expiryTime).toLocaleString() : "N/A"}
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <button
          onClick={() => onClaim?.(donation)}
          className="px-3 py-1 bg-gold-500 text-white rounded"
        >
          Claim
        </button>
      </div>
    </div>
  );
}
