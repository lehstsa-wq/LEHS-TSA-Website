import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AccountStatusScreen, PasswordChoicePrompt } from './AccountPrompts';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireOfficer?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireOfficer = false }) => {
  const { user, isAuthenticated, isOfficer, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div className="min-h-screen bg-dark-bg flex items-center justify-center text-ink">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Signed in but not approved (pending, suspended or archived).
  if (!isAuthenticated) {
    return <AccountStatusScreen />;
  }

  if (requireOfficer && !isOfficer) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <>
      {children}
      {/* Joined with an access code and hasn't chosen yet. New sign-ups set
          their own password and are recorded as 'own'. */}
      {!user.passwordChoice && <PasswordChoicePrompt />}
    </>
  );
};
