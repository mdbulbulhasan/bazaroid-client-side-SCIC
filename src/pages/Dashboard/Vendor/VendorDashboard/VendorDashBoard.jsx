import React from "react";
import { NavLink, Outlet } from "react-router";
import {
  FaHome,
  FaBoxOpen,
  FaPlusCircle,
  FaBullhorn,
  FaClipboardList,
} from "react-icons/fa";

const VendorDashboard = () => {
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded transition ${
      isActive ? "bg-green-200 font-semibold" : "hover:bg-green-100"
    }`;

  // Sidebar nav links as a JSX fragment
  const sideNavLinks = (
    <>
      <NavLink to="/" className={navLinkClass}>
        <FaHome className="text-green-600" /> Home
      </NavLink>
      <NavLink to="/dashboard/vendorDashboard" end className={navLinkClass}>
        <FaBoxOpen className="text-green-600" /> My Products
      </NavLink>
      <NavLink
        to="/dashboard/vendorDashboard/addProduct"
        className={navLinkClass}
      >
        <FaPlusCircle className="text-green-600" /> Add Product
      </NavLink>
      <NavLink
        to="/dashboard/vendorDashboard/addAdvertisements"
        className={navLinkClass}
      >
        <FaBullhorn className="text-green-600" /> Add Advertisements
      </NavLink>
      <NavLink
        to="/dashboard/vendorDashboard/myAdvertisements"
        className={navLinkClass}
      >
        <FaClipboardList className="text-green-600" /> My Advertisements
      </NavLink>
    </>
  );

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <div className="drawer lg:drawer-open flex-1">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content flex flex-col">
          {/* Navbar for small screens */}
          <div className="navbar bg-green-600 border-b shadow-sm w-full lg:hidden">
            <div className="flex-none">
              <label
                htmlFor="my-drawer-2"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="flex-1 px-2 text-gray-900 font-semibold">
              Vendor Dashboard
            </div>
          </div>

          {/* Page Content */}
          <div className="flex-1 p-6 bg-gray-50">
            <Outlet />
          </div>
        </div>

        {/* Sidebar */}
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <aside className="bg-white text-gray-800 min-h-full w-80 p-4 border-r shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-green-700">
              Vendor Dashboard
            </h2>
            <nav className="space-y-2">{sideNavLinks}</nav>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
