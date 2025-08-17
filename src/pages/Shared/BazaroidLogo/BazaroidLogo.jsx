import React from "react";
import { motion } from "framer-motion";
import logo from "../../../assets/logo.png";

const BazaroidLogo = () => {
  return (
    <motion.button
      className="cursor-pointer"
      whileHover={{ scale: 1.1, rotate: 2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex space-x-2 justify-center items-center">
        <span className="text-green-800 font-bold text-sm sm:text-base">
          Baza
        </span>

        <motion.img
          src={logo}
          alt="Bazaroid Logo"
          className="w-6 sm:w-10" // 👈 Responsive width: w-6 for mobile, w-10 for sm and up
          whileHover={{ rotate: 20 }}
          transition={{ type: "spring", stiffness: 200 }}
        />

        <span className="text-green-800 font-bold text-sm sm:text-base">
          Roid
        </span>
      </div>
    </motion.button>
  );
};

export default BazaroidLogo;
