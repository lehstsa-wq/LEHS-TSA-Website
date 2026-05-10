
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireOfficer?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireOfficer = false }) => {
  const { isAuthenticated, isOfficer, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div className="min-h-screen bg-dark-bg flex items-center justify-center text-white">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireOfficer && !isOfficer) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
