import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="mt-8">
      <section className="bg-gradient-to-br from-ivory-50 to-white p-8 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h1 className="font-serif text-4xl md:text-5xl text-royal-500">Nourish. Share. Care.</h1>
            <p className="mt-4 text-gray-600 max-w-xl">
              Connect with neighbours and reduce food waste. Post what you have — someone will be grateful.
            </p>

            <div className="mt-6 flex gap-3">
              <Link to="/register" className="px-5 py-2 bg-gold-500 text-white rounded shadow">
                Sign Up
              </Link>
              <Link to="/DonationsList" className="px-5 py-2 border rounded text-royal-500">
                Explore Donations
              </Link>
            </div>
          </div>

          <motion.div
            className="w-full md:w-1/2 bg-white p-4 rounded-lg shadow-inner"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=60"
              alt="sharing"
              className="rounded"
            />
          </motion.div>
        </div>
      </section>

      <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded shadow">
          <h3 className="font-semibold text-royal-500">How it works</h3>
          <p className="mt-2 text-sm text-gray-600">Post food. People claim. Volunteers help if needed.</p>
        </div>
        <div className="p-6 bg-white rounded shadow">
          <h3 className="font-semibold text-royal-500">Why it matters</h3>
          <p className="mt-2 text-sm text-gray-600">Reduce waste, feed people, build community.</p>
        </div>
        <div className="p-6 bg-white rounded shadow">
          <h3 className="font-semibold text-royal-500">Safety & quality</h3>
          <p className="mt-2 text-sm text-gray-600">Time-stamped posts and clear expiry info.</p>
        </div>
      </section>
    </div>
  );
}
