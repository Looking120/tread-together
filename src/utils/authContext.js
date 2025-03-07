import React, { createContext, useContext, useState, useEffect } from 'react';

//  un contexte pour l'authentification
const AuthContext = createContext();

// Provider pour gérer l'authentification
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Vérifier l'authentification au chargement de l'application
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Fonction pour connecter l'utilisateur
  const login = (token) => {
    localStorage.setItem('token', token); // Stocker le token dans le localStorage
    setIsAuthenticated(true); // Mettre à jour l'état d'authentification
  };

  // Fonction pour déconnecter l'utilisateur
  const logout = () => {
    localStorage.removeItem('token'); // Supprimer le token du localStorage
    setIsAuthenticated(false); // Mettre à jour l'état d'authentification
    window.location.href = '/login'; // Rediriger vers la page de connexion
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte d'authentification
export const useAuth = () => useContext(AuthContext);