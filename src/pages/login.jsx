import { Helmet } from 'react-helmet-async';

import { LoginView } from '../sections/login';

// ----------------------------------------------------------------------

export default function LoginPage({ onLogin }) {
  return (
    <>
      <Helmet>
        <title> Login</title>
      </Helmet>

      <LoginView onLogin={onLogin} />;
    </>
  );
}
