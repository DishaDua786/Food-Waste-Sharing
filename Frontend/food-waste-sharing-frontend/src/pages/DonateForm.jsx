import React, { useState } from "react";
import api from "../services/api.js";
import { useNavigate } from "react-router-dom";
import { CheckCircleIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DonateForm() {
  const [form, setForm] = useState({
    foodName: "",
    quantity: 1,
    expiryTime: "",
    location: "",
    description: "",
    imageUrl: "",
  });
  const [busy, setBusy] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  function setField(key, val) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setField("imageUrl", URL.createObjectURL(file));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    try {
      const userId = localStorage.getItem("userId") || 1;
      await api.post(`/donations/create/${userId}`, form);
      
      toast.success(
        <div className="flex items-center gap-2">
          <CheckCircleIcon className="h-6 w-6 text-green-500" />
          <span>Thank you for your donation! It's now available for others.</span>
        </div>,
        {
          autoClose: 3000,
          onClose: () => navigate("/donationsList")
        }
      );
      
      // Reset form after successful submission
      setForm({
        foodName: "",
        quantity: 1,
        expiryTime: "",
        location: "",
        description: "",
        imageUrl: "",
      });
      setImagePreview(null);
      
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to post donation");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-royal-600 mb-6">Share Your Food</h2>
      <p className="text-gray-600 mb-6">
        Help reduce food waste by sharing your excess food with those who need it.
      </p>

      <form onSubmit={submit} className="space-y-4">
        {/* Food Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Food Name*</label>
            <input
              required
              value={form.foodName}
              onChange={(e) => setField("foodName", e.target.value)}
              placeholder="e.g., Fresh Apples, Cooked Rice"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-500 focus:border-royal-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity*</label>
            <input
              required
              type="number"
              min="1"
              value={form.quantity}
              onChange={(e) => setField("quantity", Number(e.target.value))}
              placeholder="Number of portions"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-500 focus:border-royal-500"
            />
          </div>
        </div>

        {/* Expiry & Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date/Time*</label>
            <input
              required
              type="datetime-local"
              value={form.expiryTime}
              onChange={(e) => setField("expiryTime", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-500 focus:border-royal-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location*</label>
            <input
              required
              value={form.location}
              onChange={(e) => setField("location", e.target.value)}
              placeholder="Where to pick up?"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-500 focus:border-royal-500"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setField("description", e.target.value)}
            placeholder="Any special instructions? Allergens?"
            rows="3"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-500 focus:border-royal-500"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Food Image</label>
          {imagePreview ? (
            <div className="mt-2">
              <img 
                src={imagePreview} 
                alt="Food preview" 
                className="h-32 w-32 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => {
                  setImagePreview(null);
                  setField("imageUrl", "");
                }}
                className="mt-2 text-sm text-red-600 hover:text-red-800"
              >
                Remove image
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <PhotoIcon className="w-8 h-8 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500">Click to upload photo</p>
                </div>
                <input 
                  id="dropzone-file" 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            disabled={busy}
            className={`w-full py-3 px-4 bg-gradient-to-r from-royal-500 to-royal-600 hover:from-royal-600 hover:to-royal-700 text-white font-medium rounded-lg shadow-md transition-all duration-200 ${busy ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {busy ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Posting Donation...
              </span>
            ) : (
              "Post Donation"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}