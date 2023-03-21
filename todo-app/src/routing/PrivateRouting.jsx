import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRouting({
    isUserLoggedIn,
  redirectPath = "/login",
  children,
}) {
  if (!isUserLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
}
