import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './authContext'; 

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // l'état d'authentification

  if (!isAuthenticated) {
    // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
    return <Navigate to="/login" replace />;
  }

  // Rendre les enfants (la route protégée) si l'utilisateur est authentifié
  return children;
};

export default ProtectedRoute;