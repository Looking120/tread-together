import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Importer useNavigate
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import Logo from '../../components/logo';
import Iconify from '../../components/iconify';
import { bgGradient } from '../../theme/css';
import { signIn } from '../../utils/authUtils';
import { useAuth } from '../../utils/authContext';

export default function LoginPage({ onLogin }) {
  const theme = useTheme();
  const navigate = useNavigate(); // Utiliser useNavigate pour la redirection
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleClick = async () => {
    setLoading(true);
    setError('');

    try {
      // Appel de l'API de connexion
      const tokenDto = await signIn(email, password);

      // Stockez le token JWT dans le localStorage
      localStorage.setItem('token', tokenDto.token);

      // Connecter l'utilisateur
      login(tokenDto.token);

      // Rediriger vers la page AppPage après la connexion
      navigate('/app'); // Assurez-vous que cette route correspond à celle de AppPage
    } catch (err) {
      setError(err.message || 'Échec de la connexion. Vérifiez vos identifiants.');
    } finally {
      setLoading(false);
    }
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
          <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
            Forgot password?
          </Typography>
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
        loading={loading}
      >
        Login
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
      }}
    >
      <Card
        sx={{
          p: 5,
          width: '100%',
          maxWidth: 420,
        }}
      >
        <Logo sx={{ mb: 2 }} />

        <Typography variant="h4">Sign In</Typography>

        <Typography variant="body2" sx={{ mt: 2, mb: 5 , display: 'flex', alignItems: 'center'}}>
          Don’t have an account?
          <Link
            to="/signup"
            style={{ textDecoration: 'none' }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                ml: 0.5,
                color: theme.palette.primary.main,
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Get started
            </Typography>
          </Link>
        </Typography>

        {renderForm}
      </Card>
    </Box>
  );
}