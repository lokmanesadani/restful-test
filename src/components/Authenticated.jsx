import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const Authenticated = ({ children }) => {
  let user = useSelector((state) => state.user.value);
  return user.isAuthenticated ? <Navigate to={"/home"} /> : children;
};

export default Authenticated;
