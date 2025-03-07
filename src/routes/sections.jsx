import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from '../layouts/dashboard';
import FollowPage from '../pages/follow';
import ProtectedRoute from '../utils/ProtectedRoute'; 

// Import des pages dynamiques
const AppPage = lazy(() => import('../pages/app')); // Page AppPage
const StorePage = lazy(() => import('../pages/store'));
const UserPage = lazy(() => import('../pages/user'));
const LoginPage = lazy(() => import('../pages/login')); // Page de connexion
const ProductsPage = lazy(() => import('../pages/products'));
const Page404 = lazy(() => import('../pages/page-not-found'));
const ProfilePage = lazy(() => import('../pages/profile'));
const SignUpPage = lazy(() => import('../pages/signUp')); // Page d'inscription

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <Navigate to="/login" replace />, // Redirige vers /login par défaut
    },
    {
      path: 'login',
      element: <LoginPage />, // Page de connexion
    },
    {
      path: 'signup', // Route pour la page d'inscription
      element: (
        <Suspense fallback={<div>Chargement...</div>}>
          <SignUpPage />
        </Suspense>
      ),
    },
    {
      path: 'app', // Route pour la page AppPage
      element: (
        <ProtectedRoute> {/* Protéger la route AppPage */}
          <DashboardLayout>
            <Suspense fallback={<div>Chargement...</div>}>
              <AppPage />
            </Suspense>
          </DashboardLayout>
        </ProtectedRoute>
      ),
    },
    {
      element: (
        <ProtectedRoute> {/* Protéger toutes les routes enfants */}
          <DashboardLayout>
            <Suspense fallback={<div>Chargement...</div>}>
              <Outlet />
            </Suspense>
          </DashboardLayout>
        </ProtectedRoute>
      ),
      children: [
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'store', element: <StorePage /> },
        { path: 'profile', element: <ProfilePage /> },
        { path: 'follow', element: <FollowPage /> },
      ],
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />, // Redirige vers la page 404 pour les routes inconnues
    },
  ]);

  return routes;
}