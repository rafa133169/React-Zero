import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, isAuthenticated, fallbackPath = '/' }) => {
  return isAuthenticated ? (
    element
  ) : (
    <Navigate to={fallbackPath} replace />
  );
};

export default PrivateRoute;
