/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import  { useAuth } from "../contexts/AuthProvider";
import { getTokenSocialNetwork } from "../api/auth";

export const PrivateRoute = () => {
  const { loading, user, isAuthenticated } = useAuth();

  if (loading) return <h1>Loading...</h1>;
  if (!loading && !isAuthenticated) return <Navigate to="/login" />;

  return <Outlet />;
}

export const PublicRoute = ({ children }) => {
  const { loading, user, isAuthenticated } = useAuth();

  if (loading) return <h1>Loading...</h1>;

  // Verifica si hay un usuario y su id no es undefined antes de redirigir
  if (user && user.id !== undefined) {
    return <Navigate to={`/:${user.id}`} />;
  }

  return  <Outlet />;
};


export default PrivateRoute;
