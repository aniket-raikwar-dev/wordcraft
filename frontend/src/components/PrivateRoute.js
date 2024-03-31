import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ Component }) => {
  // const isAuthenticated = true;
  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);

  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
