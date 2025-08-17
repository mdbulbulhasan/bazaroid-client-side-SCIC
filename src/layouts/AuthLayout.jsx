import React from "react";
import { Link, Outlet, useLocation } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { AiFillHome } from "react-icons/ai";
import AuthAnimation from "../pages/Authentication/AuthAnimation/AuthAnimation";
import BazaroidLogo from "../pages/Shared/BazaroidLogo/BazaroidLogo";

const AuthLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-green-50">
      <div className="flex flex-col lg:flex-row flex-grow">
        {/* Animation section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 bg-green-50">
          <AuthAnimation />
        </div>

        {/* Form side */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-4 max-w-md mx-auto">
          {/* Logo + Home icon outside motion.div */}
          <div className="flex items-center gap-2 mb-4 w-full">
            <Link
              to="/"
              className="flex items-center gap-2 text-green-700 hover:text-green-800"
            >
              <AiFillHome className="text-xl" />
              <BazaroidLogo />
            </Link>
          </div>

          {/* Form with animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
