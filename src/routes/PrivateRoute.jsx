import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  console.log("PrivateRoute location:", location);

  if (loading) {
    return <Loading />;
  }

  if (user && user.email) {
    return children;
  }

  // Pass 'from' state for redirect after login
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
