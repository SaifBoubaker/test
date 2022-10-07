import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function LoginUserRoutes(props) {
  const user = useSelector((state) => state.user);
  const { userAuth } = user;

  return userAuth ? <Outlet /> : <Navigate to="/posts" />;
}

export default LoginUserRoutes;
