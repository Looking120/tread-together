import React from 'react';
import './App.css';

import { useScrollToTop } from './hooks/use-scroll-to-top';

import Router from './routes/sections';
import ThemeProvider from './theme';
import { AuthProvider } from './utils/authContext'; 

export default function App() {
  useScrollToTop(); // Utilisation du hook useScrollToTop pour le défilement vers le haut

  return (
    <ThemeProvider>
      <AuthProvider>
         <Router />
      </AuthProvider>
         
    </ThemeProvider>
  );
}

