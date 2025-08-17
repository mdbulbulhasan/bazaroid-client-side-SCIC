import React from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Lottie from "lottie-react";
import contactAnimation from "../../../public/contactUs.json";

const ContactUs = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-green-50 flex flex-col items-center px-4 py-12"
    >
      {/* Lottie Animation */}
      <div className="max-w-md w-full mb-8">
        <Lottie animationData={contactAnimation} loop={true} />
      </div>

      <h1 className="text-4xl font-bold text-green-700 mb-4">Contact Us</h1>
      <p className="text-gray-600 text-lg mb-10 text-center">
        We would love to hear from you. Feel free to reach out anytime!
      </p>

      <div className="grid md:grid-cols-2 gap-12 max-w-5xl w-full">
        {/* Contact Form */}
        <form className="bg-white rounded-2xl shadow-md p-8 space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
              placeholder="Your email"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Message</label>
            <textarea
              rows="4"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
              placeholder="Your message"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white rounded-lg px-6 py-3 font-semibold hover:bg-green-700 transition"
          >
            Send Message
          </button>
        </form>

        {/* Contact Information */}
        <div className="space-y-6 text-gray-700">
          <div className="flex items-center space-x-4">
            <FaPhoneAlt className="text-green-600 text-2xl" />
            <span>+880 1234 567890</span>
          </div>
          <div className="flex items-center space-x-4">
            <FaEnvelope className="text-green-600 text-2xl" />
            <span>info@bazaroid.com</span>
          </div>
          <div className="flex items-center space-x-4">
            <FaMapMarkerAlt className="text-green-600 text-2xl" />
            <span>Dhaka, Bangladesh</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactUs;
