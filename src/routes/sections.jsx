import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes, useNavigate } from 'react-router-dom';

import DashboardLayout from '../layouts/dashboard';
import FollowPage from '../pages/follow';

// Import des pages dynamiques
const HomePage = lazy(() => import('../pages/app'));
const StorePage = lazy(() => import('../pages/store'));
const UserPage = lazy(() => import('../pages/user'));
const IndexPage = lazy(() => import('../pages/login')); // This is your LoginView component
const ProductsPage = lazy(() => import('../pages/products'));
const Page404 = lazy(() => import('../pages/page-not-found'));
const ProfilePage = lazy(() => import('../pages/profile'));

// ----------------------------------------------------------------------

export default function Router() {
  const navigate = useNavigate();

  // Define the onLogin function
  const handleLogin = () => {
    // Perform any login logic here (e.g., API calls, validation)
    // Redirect to the home page after successful login
    navigate('/');
  };

  const routes = useRoutes([
    {
      path: '/',
      element: <Navigate to="/login" replace />, // Redirige vers /login par défaut
    },
    {
      path: 'login',
      element: <IndexPage onLogin={handleLogin} />, // Pass onLogin as a prop
    },
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={<div>Chargement...</div>}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
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