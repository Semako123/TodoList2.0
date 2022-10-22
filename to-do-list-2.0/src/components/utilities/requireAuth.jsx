import React from "react";
import { Navigate } from "react-router";

const RequireAuth = ({ status, children }) => {
  return status ? children : <Navigate to="auth" />;
};

export default RequireAuth;
