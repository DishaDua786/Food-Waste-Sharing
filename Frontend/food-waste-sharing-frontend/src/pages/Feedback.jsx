import React, { useState } from "react";
import api from "../services/api.js";

export default function Feedback() {
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    try {
      const userId = localStorage.getItem("userId") || 1;
      await api.post(`/feedback/create/${userId}`, { text });
      setText("");
      alert("Thanks for your feedback!");
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to submit feedback");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold text-royal-500 mb-4">Share Feedback</h2>
      <form onSubmit={submit} className="space-y-3">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Your feedback helps us improve"
          className="w-full p-3 border rounded"
          rows={5}
        />
        <button disabled={busy} className="px-4 py-2 bg-gold-500 text-white rounded">
          {busy ? "Sending…" : "Send"}
        </button>
      </form>
    </div>
  );
}
