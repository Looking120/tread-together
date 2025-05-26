import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';

import Logo from '../../components/logo';
import Iconify from '../../components/iconify';
import { bgGradient } from '../../theme/css';
import { signUp } from '../../utils/authUtils';
import { useAuth } from '../../utils/authContext'; 

export default function SignUpPage({ onSignUp }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const genders = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' }
  ];

  const handleClick = async () => {
    setLoading(true);
    setError('');

    // Validation des champs
    if (!firstName || !lastName || !birthDate || !userName || !email || !password || !confirmPassword || !phoneNumber || !address || !gender) {
      setError('Tous les champs obligatoires doivent être remplis.');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      setLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Veuillez entrer une adresse email valide.');
      setLoading(false);
      return;
    }

    try {
      // Appel de l'API d'inscription
      const response = await signUp(
        firstName,
        lastName,
        birthDate,
        userName,
        email,
        password,
        confirmPassword,
        middleName,
        gender,
        phoneNumber,
        address
      );

      // Connecter l'utilisateur après l'inscription
      login(response.token);

      // Stockez le token JWT dans le localStorage si nécessaire
      if (response.token) {
        localStorage.setItem('token', response.token);
      }

      // Rediriger vers la page AppPage après l'inscription
      navigate('/login');

    } catch (err) {
      setError(err.message || 'Échec de l\'inscription. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        {/* Première ligne : Prénom, Middle Name et Nom */}
        <Stack direction="row" spacing={2}>
          <TextField
            name="firstName"
            label="First Name *"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
          />
          <TextField
            name="middleName"
            label="Middle Name"
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
            fullWidth
          />
          <TextField
            name="lastName"
            label="Last Name *"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
          />
        </Stack>

        {/* Deuxième ligne : Date de naissance, Genre et Nom d'utilisateur */}
        <Stack direction="row" spacing={2}>
          <TextField
            name="birthDate"
            label="Birth Date *"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
          <TextField
            select
            name="gender"
            label="Gender *"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            fullWidth
          >
            {genders.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            name="userName"
            label="Username *"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            fullWidth
          />
        </Stack>

        {/* Troisième ligne : Email et Phone Number */}
        <Stack direction="row" spacing={2}>
          <TextField
            name="email"
            label="Email address *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            name="phoneNumber"
            label="Phone Number *"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            fullWidth
          />
        </Stack>

        {/* Quatrième ligne : Address */}
        <TextField
          name="address"
          label="Address *"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          fullWidth
        />

        {/* Cinquième ligne : Mot de passe et Confirmation du mot de passe */}
        <Stack direction="row" spacing={2}>
          <TextField
            name="password"
            label="Password *"
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
            fullWidth
          />
          <TextField
            name="confirmPassword"
            label="Confirm Password *"
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                    <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </Stack>
      </Stack>

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      <Box sx={{ mt: 3 }}>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="inherit"
          onClick={handleClick}
          loading={loading}
        >
          Sign Up
        </LoadingButton>
      </Box>
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
          maxWidth: 800, // Augmenté pour accommoder plus de champs
        }}
      >
        <Logo sx={{ mb: 2 }} />

        <Typography variant="h4">Sign Up</Typography>

        <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
          Already have an account?
          <Link
            to="/login"
            style={{ textDecoration: 'none' }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                ml: 0.5,
                display: 'inline-flex',
                alignItems: 'center',
                color: theme.palette.primary.main,
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Login
            </Typography>
          </Link>
        </Typography>

        {renderForm}
      </Card>
    </Box>
  );
}