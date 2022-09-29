import React from "react";
import { useSelector } from "react-redux";
import AdminNavbar from "./Admin/AdminNavbar";
import PrivateNavbar from "./Private/PrivateNavbar";
import PublicNavbar from "./Public/PublicNavbar";

function Navbar(props) {
  const { userAuth } = useSelector((state) => state.user);
  console.log(userAuth?.isAdmin);

  return (
    <>
      {userAuth?.isAdmin ? (
        <AdminNavbar />
      ) : userAuth ? (
        <PrivateNavbar />
      ) : (
        <PublicNavbar />
      )}
    </>
  );
}

export default Navbar;
