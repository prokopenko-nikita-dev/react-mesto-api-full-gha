import React from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, loggedIn, isLoading }) => {
  return (
    !isLoading &&
    (loggedIn ? children : <Navigate to="/sign-in" replace/>)
)}

export default ProtectedRoute;