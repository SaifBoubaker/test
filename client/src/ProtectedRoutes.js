import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes(props) {
  const user = useSelector((state) => state.user);
  const { userAuth } = user;

  return userAuth?.isAdmin === true ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoutes;
