import React, { useState } from "react";
import axios from "axios";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email) {
      setStatus("Please enter a valid email.");
      return;
    }

    try {
      // 🔥 Replace with your backend subscription API
      await axios.post("/api/newsletter/subscribe", { email });
      setStatus("✅ Subscribed successfully!");
      setEmail("");
    } catch (error) {
      console.error(error);
      setStatus("❌ Something went wrong. Try again later.");
    }
  };

  return (
    <section className="bg-green-50 py-12 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Stay Updated with <span className="text-green-700">Bazaroid</span>
        </h2>
        <p className="text-gray-600 mb-6">
          Subscribe to get the latest{" "}
          <span className="font-medium">price updates, exclusive deals,</span>{" "}
          and market trends delivered straight to your inbox.
        </p>

        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-2/3 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-sm"
          >
            Subscribe
          </button>
        </form>

        {status && (
          <p
            className={`mt-4 text-sm ${
              status.startsWith("✅") ? "text-green-600" : "text-red-500"
            }`}
          >
            {status}
          </p>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
