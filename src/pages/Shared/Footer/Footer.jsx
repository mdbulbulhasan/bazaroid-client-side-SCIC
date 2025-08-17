import React from "react";
import { Link } from "react-router";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import BazaroidLogo from "../BazaroidLogo/BazaroidLogo";

const Footer = () => {
  return (
    <footer className="bg-black px-4 py-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        {/* Logo & Info */}
        <div className="flex flex-col items-center md:items-start space-y-2">
          <Link to="/">
            <BazaroidLogo />
          </Link>
          <p className="text-white text-center md:text-left">
            Bazaroid Ltd.
            <br />
            Your trusted online marketplace.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row md:space-x-6 items-center text-white font-medium">
          <Link to="/" className="hover:text-green-400 transition">
            Home
          </Link>
          <Link to="/allProducts" className="hover:text-green-400 transition">
            All Products
          </Link>
          <Link to="/dashboard" className="hover:text-green-400 transition">
            Dashboard
          </Link>
          <Link to="/aboutUs" className="hover:text-green-400 transition">
            About Us
          </Link>
          <Link to="/contactUs" className="hover:text-green-400 transition">
            Contact Us
          </Link>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-green-400 transition"
          >
            <FaFacebookF size={20} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-green-400 transition"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-green-400 transition"
          >
            <FaLinkedinIn size={20} />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-6 text-center">
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} Bazaroid. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
