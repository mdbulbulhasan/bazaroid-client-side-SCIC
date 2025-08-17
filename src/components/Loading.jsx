import React from "react";
import { FaCarrot, FaLeaf, FaAppleAlt, FaPepperHot } from "react-icons/fa";
import { motion } from "framer-motion";

const Loading = () => {
  const veggies = [
    { icon: <FaCarrot />, color: "text-orange-600" },
    { icon: <FaLeaf />, color: "text-green-600" },
    { icon: <FaAppleAlt />, color: "text-red-600" },
    { icon: <FaPepperHot />, color: "text-yellow-600" },
  ];

  return (
    <div
      className="flex items-center justify-center min-h-screen
    bg-green-50"
    >
      <div className="flex space-x-6 mb-4">
        {veggies.map((veg, index) => (
          <motion.div
            key={index}
            className={`text-4xl ${veg.color}`}
            animate={{ x: [0, -10, 0] }}
            transition={{
              repeat: Infinity,
              duration: 1,
              delay: index * 0.2,
              ease: "easeInOut",
            }}
          >
            {veg.icon}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Loading;
