import React from "react";
import { NavLink, Outlet } from "react-router";
import { FaHome, FaShoppingBag, FaEye, FaChartLine } from "react-icons/fa";

const UserDashboard = () => {
  const navLinkClass = ({ isActive }) =>
    isActive
      ? "flex items-center gap-3 px-4 py-2 rounded bg-green-100 text-green-700 font-semibold transition"
      : "flex items-center gap-3 px-4 py-2 rounded hover:bg-green-100 transition";

  const sideNavLinks = (
    <>
      <NavLink to="/" className={navLinkClass} end>
        <FaHome className="text-green-600" /> Home
      </NavLink>
      <NavLink to="/dashboard/userDashboard" className={navLinkClass} end>
        <FaShoppingBag className="text-green-600" /> My Orders
      </NavLink>
      <NavLink
        to="/dashboard/userDashboard/MyWatchList"
        className={navLinkClass}
      >
        <FaEye className="text-green-600" /> Manage Watchlist
      </NavLink>
      <NavLink
        to="/dashboard/userDashboard/viewPriceTrends"
        className={navLinkClass}
      >
        <FaChartLine className="text-green-600" /> View Price Trends
      </NavLink>
    </>
  );

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <div className="drawer lg:drawer-open flex-1">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content flex flex-col">
          {/* Navbar for small screen */}
          <div className="navbar bg-base-300 border-b shadow-sm w-full lg:hidden">
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
            <div className="flex-1 px-2 text-gray-700 font-semibold">
              User Dashboard
            </div>
          </div>

          {/* Page content here */}
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
          <aside className="bg-white text-gray-800 min-h-full w-80 p-6 border-r shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-green-700">
              User Dashboard
            </h2>
            <nav className="space-y-3">{sideNavLinks}</nav>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
