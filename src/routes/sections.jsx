import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from '../layouts/dashboard';
import FollowPage from '../pages/follow';
import ProtectedRoute from '../utils/ProtectedRoute'; 
import { useAuth } from '../utils/authContext';

// Chargement synchrone des composants fréquemment utilisés
const UserPage = lazy(() => import('../pages/user'));
const ProfilePage = lazy(() => import('../pages/profile'));
const AddEmployeePage = lazy(() => import('../pages/AddEmp'));

// Autres pages
const AppPage = lazy(() => import('../pages/app'));
const StorePage = lazy(() => import('../pages/store'));
const LoginPage = lazy(() => import('../pages/login'));
const ProductsPage = lazy(() => import('../pages/products'));
const Page404 = lazy(() => import('../pages/page-not-found'));
const SignUpPage = lazy(() => import('../pages/signUp'));

const AppRoutes = () => {
  return useRoutes([
    {
      path: '/',
      element: <Navigate to="/login" replace />,
    },
    {
      path: 'login',
      element: (
        <Suspense fallback={<div>Chargement...</div>}>
          <LoginPage />
        </Suspense>
      ),
    },
    {
      path: 'signup',
      element: (
        <Suspense fallback={<div>Chargement...</div>}>
          <SignUpPage />
        </Suspense>
      ),
    },
    {
      path: 'app',
      element: (
        <ProtectedRoute>
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
        <ProtectedRoute>
          <DashboardLayout>
            <Suspense fallback={<div>Chargement du tableau de bord...</div>}>
              <Outlet />
            </Suspense>
          </DashboardLayout>
        </ProtectedRoute>
      ),
      children: [
        { 
          path: 'user', 
          element: (
            <Suspense fallback={<div>Chargement du profil utilisateur...</div>}>
              <UserPage />
            </Suspense>
          ) 
        },
        { 
          path: 'user/add', 
          element: (
            <Suspense fallback={<div>Chargement du formulaire...</div>}>
              <AddEmployeePage />
            </Suspense>
          ) 
        },
        { 
          path: 'profile', 
          element: (
            <Suspense fallback={<div>Chargement du profil...</div>}>
              <ProfilePage />
            </Suspense>
          ) 
        },
        { path: 'products', element: <ProductsPage /> },
        { path: 'store', element: <StorePage /> },
        { path: 'follow', element: <FollowPage /> },
      ],
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
};

export default function Router() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <div>Chargement de l'application...</div>;
  }

  return <AppRoutes />;
}