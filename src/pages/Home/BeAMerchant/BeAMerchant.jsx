import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import merchantImg from "../../../assets/merchant.jpg";

const BeAMerchant = () => {
  const navigate = useNavigate();

  const handleBecomeMerchant = () => {
    navigate("/merchantRequestForm");
  };

  return (
    <section className="bg-green-50 py-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center px-4 gap-10">
        {/* Left Side Image */}
        <motion.img
          src={merchantImg}
          alt="Become a Merchant"
          className="w-full md:w-1/2 rounded-lg shadow-lg"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        />

        {/* Right Side Content */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
            Become a Verified Merchant
          </h2>
          <p className="text-gray-700 mb-6">
            Join <span className="font-semibold">Bazaroid</span> as a verified
            merchant and grow your business with us. List your products, reach
            thousands of customers, and manage your sales seamlessly on our
            trusted platform.
          </p>
          <ul className="list-disc pl-5 text-gray-700 mb-6 space-y-2">
            <li>🔒 Verified and secure merchant account</li>
            <li>🛒 Sell to thousands of daily users</li>
            <li>📊 Real-time sales analytics dashboard</li>
            <li>💬 Direct communication with buyers</li>
            <li>⚡ Easy product upload and management</li>
          </ul>
          <button
            onClick={handleBecomeMerchant}
            className="bg-green-700 text-white px-6 py-3 rounded-md shadow hover:bg-green-800 transition cursor-pointer"
          >
            Become a Merchant Today
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default BeAMerchant;
