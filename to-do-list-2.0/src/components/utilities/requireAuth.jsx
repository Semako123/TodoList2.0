import React from "react";
import { Navigate } from "react-router";
import { useSelector} from "react-redux";

const RequireAuth = ({ children }) => {
  const user = useSelector((state) => (state.auth.user))
  return user ? children : <Navigate to="auth" />;
};

export default RequireAuth;
