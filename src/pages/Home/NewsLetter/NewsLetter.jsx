import React, { useState } from "react";
import { toast } from "react-toastify";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email.");
      return;
    }

    try {
  
      const storedEmails =
        JSON.parse(localStorage.getItem("newsletterSubs")) || [];


      if (storedEmails.includes(email)) {
        toast.warning("You are already subscribed.");
        return;
      }


      storedEmails.push(email);
      localStorage.setItem("newsletterSubs", JSON.stringify(storedEmails));

      toast.success("Subscribed successfully!");

      setEmail("");
      e.target.reset();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Try again later.");
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
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-sm cursor-pointer"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
