import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";

const DashboardLayout = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (loading || !user?.email) return;

    const fetchUserRole = async () => {
      try {
        const res = await axios.get(
          `https://bazaroid-server-side.vercel.app/users/email/${user.email}`
        );

        const userRole = res.data.role || "user";
        setRole(userRole);

        if (location.pathname === "/dashboard") {
          if (userRole === "admin") {
            navigate("/dashboard/adminDashboard", { replace: true });
          } else if (userRole === "vendor") {
            navigate("/dashboard/vendorDashboard", { replace: true });
          } else {
            navigate("/dashboard/userDashboard", { replace: true });
          }
        }
      } catch (error) {
        console.log("User not found, creating new user...", error);

        // Create new user with default role 'user'
        await axios.post("https://bazaroid-server-side.vercel.app/users", {
          email: user.email,
          name: user.displayName || "New User",
          role: "user",
          created_at: new Date(),
          last_log_in: new Date(),
        });

        setRole("user");

        if (location.pathname === "/dashboard") {
          navigate("/dashboard/userDashboard", { replace: true });
        }
      }
    };

    fetchUserRole();
  }, [user, loading, navigate, location.pathname]);

  if (loading || role === null) {
    return <Loading />;
  }

  return (
    <div className="bg-green-50 min-h-screen">
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
