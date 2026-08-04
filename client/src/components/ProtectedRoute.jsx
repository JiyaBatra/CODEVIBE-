import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export const ROLES = {
  STUDENT: 1,
  MENTOR: 2,
  ADMIN: 3
};

const ProtectedRoute = ({ children, requiredRole = ROLES.STUDENT }) => {
  const location = useLocation();
  const { isAuthenticated, userRole } = { isAuthenticated: true, userRole: ROLES.STUDENT }; // Mocked auth context

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (userRole < requiredRole) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>403 Forbidden</h2>
        <p>You do not have the required permissions to view this page.</p>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;