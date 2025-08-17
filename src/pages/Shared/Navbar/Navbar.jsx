import React from "react";
import { Link, NavLink, useNavigate } from "react-router";
import BazaroidLogo from "../BazaroidLogo/BazaroidLogo";
import TopSalesTicker from "../TopSalesTicker/TopSalesTicker";
import useAuth from "../../../hooks/useAuth";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  // Handle Log Out
  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully!", {
          position: "top-right",
          autoClose: 2000,
          theme: "colored",
          transition: Bounce,
        });

        // Wait for toast to show before navigating
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Logout failed. Please try again.", {
          position: "top-right",
          autoClose: 2000,
          theme: "colored",
          transition: Bounce,
        });
      });
  };

  const navItems = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-green-600 font-bold border-b-2 border-green-600 pb-1"
              : "text-green-800 hover:text-green-600 font-medium"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/allProducts"
          className={({ isActive }) =>
            isActive
              ? "text-green-600 font-bold border-b-2 border-green-600 pb-1"
              : "text-green-800 hover:text-green-600 font-medium"
          }
        >
          All Products
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "text-green-600 font-bold border-b-2 border-green-600 pb-1"
              : "text-green-800 hover:text-green-600 font-medium"
          }
        >
          DashBoard
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/aboutUs"
          className={({ isActive }) =>
            isActive
              ? "text-green-600 font-bold border-b-2 border-green-600 pb-1"
              : "text-green-800 hover:text-green-600 font-medium"
          }
        >
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contactUs"
          className={({ isActive }) =>
            isActive
              ? "text-green-600 font-bold border-b-2 border-green-600 pb-1"
              : "text-green-800 hover:text-green-600 font-medium"
          }
        >
          Contact Us
        </NavLink>
      </li>
    </>
  );

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />

      <TopSalesTicker />

      <div className="navbar bg-green-50 shadow-2xl px-4 py-2">
        {/* Navbar Start */}
        <div className="navbar-start">
          {/* Mobile Dropdown */}
          <div className="dropdown lg:hidden">
            <button
              tabIndex={0}
              role="button"
              className="btn btn-ghost text-green-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-green-50 rounded-box w-52 space-y-2"
            >
              {navItems}
            </ul>
          </div>

          {/* ✅ Logo */}
          <Link to="/" className="ml-2">
            <BazaroidLogo />
          </Link>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end flex items-center space-x-3">
          {user && (
            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-green-600">
              <img
                src={user.photoURL}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </div>
          )}

          {user ? (
            <button onClick={handleLogOut} className="btn btn-primary btn-sm">
              Logout
            </button>
          ) : (
            <>
              <Link to="/register" className="btn btn-primary btn-sm">
                Register
              </Link>
              <Link to="/login" className="btn btn-primary btn-sm">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
