import React from "react";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import { FaHandsHelping, FaRocket, FaRegSmile } from "react-icons/fa";
import aboutAnimation from "../../../public/aboutUs.json";

const AboutUs = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12"
    >
      {/* Lottie Animation */}
      <div className="max-w-md w-full mb-8">
        <Lottie animationData={aboutAnimation} loop={true} />
      </div>

      {/* Our Services Section */}
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl font-bold text-green-700 mb-6">About Us</h1>
        <p className="text-gray-600 text-lg mb-10">
          We are committed to providing the best solutions to grow your business
          efficiently and sustainably.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <FaHandsHelping className="text-green-600 text-5xl mx-auto mb-4" />
            <h2 className="text-xl text-green-600 font-semibold mb-2">
              Supportive Team
            </h2>
            <p className="text-gray-500">
              Our dedicated team is always ready to support your goals with
              expertise and empathy.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <FaRocket className="text-green-600 text-5xl mx-auto mb-4" />
            <h2 className="text-xl text-green-600 font-semibold mb-2">
              Fast Delivery
            </h2>
            <p className="text-gray-500">
              We ensure timely delivery for every service to keep your workflow
              uninterrupted.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <FaRegSmile className="text-green-600 text-5xl mx-auto mb-4" />
            <h2 className="text-xl text-green-600 font-semibold mb-2">
              Customer Satisfaction
            </h2>
            <p className="text-gray-500">
              Your satisfaction is our priority – we focus on delivering value
              beyond expectations.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutUs;
