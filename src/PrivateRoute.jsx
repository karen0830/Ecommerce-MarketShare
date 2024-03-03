import React, { useContext } from "react";
import { Route, Navigate, useParams, Outlet } from "react-router-dom";
import AuthProvider from "./contexts/AuthProvider";

export const PrivateRouter = () => {
  const { loading, user, isAuthenticated } = useContext(AuthProvider)
  console.log("userrr ", user);
  if (loading) return <h1>Loading...</h1>;
  if (!loading && !isAuthenticated) return (<Navigate to="/loginUser" />)

  return <Outlet />
}