import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from '../../routes/hooks';
import Logo from '../../components/logo';
import Iconify from '../../components/iconify';
import { bgGradient } from '../../theme/css'; // Assurez-vous d'importer bgGradient

export default function LoginView({ onLogin }) {
  const theme = useTheme();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    // Simuler une authentification réussie
    setTimeout(() => {
      onLogin(); // Appel de la fonction onLogin fournie en tant que prop
      router.push('/'); // Redirection après connexion
    }, 1000);
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
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

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
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

        <Typography variant="h4">Sign in to Minimal</Typography>

        <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
          Don’t have an account?
          <Link variant="subtitle2" sx={{ ml: 0.5 }}>
            Get started
          </Link>
        </Typography>

        {renderForm}

        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            OR
          </Typography>
        </Divider>

        <Stack direction="row" spacing={2}>
          <Button
            fullWidth
            size="large"
            color="inherit"
            variant="outlined"
            sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
          >
            <Iconify icon="eva:google-fill" color="#DF3E30" />
          </Button>

          <Button
            fullWidth
            size="large"
            color="inherit"
            variant="outlined"
            sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
          >
            <Iconify icon="eva:facebook-fill" color="#1877F2" />
          </Button>

          <Button
            fullWidth
            size="large"
            color="inherit"
            variant="outlined"
            sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
          >
            <Iconify icon="eva:twitter-fill" color="#1C9CEA" />
          </Button>
        </Stack>
      </Card>
    </Box>
  );
}
