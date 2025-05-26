import React, { useState } from 'react';
import { 
  Box, 
  Card, 
  Stack, 
  TextField, 
  Typography, 
  Button, 
  MenuItem,
  useTheme,
  alpha
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Link, useNavigate } from 'react-router-dom';
import { addEmployee } from '../../utils/employeeApi';
import { bgGradient } from '../../theme/css';

export default function AddEmployeeView() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    birthDate: '',
    gender: 'Male',
    userName: '',
    email: '',
    phoneNumber: '',
    address: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const genders = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validation
      const requiredFields = ['firstName', 'lastName', 'birthDate', 'userName', 'email', 'phoneNumber', 'address'];
      const missingFields = requiredFields.filter(field => !formData[field]);
      
      if (missingFields.length > 0) {
        throw new Error('Tous les champs obligatoires doivent être remplis.');
      }

      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        throw new Error('Veuillez entrer une adresse email valide.');
      }

      // Formatage des données pour l'API
      const apiData = {
        ...formData,
        birthDate: new Date(formData.birthDate).toISOString(),
        middleName: formData.middleName || null
      };

      // Appel API
      await addEmployee(apiData);
      navigate('/app/user', { state: { success: 'Employé ajouté avec succès!' } });
      
    } catch (err) {
      console.error('Erreur lors de l\'ajout:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2
      }}
    >
      <Card
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: 5,
          width: '100%',
          maxWidth: 800,
        }}
      >
        <Typography variant="h4" gutterBottom>Ajouter un nouvel employé</Typography>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Stack spacing={3}>
          {/* Ligne 1: Prénom, Middle Name, Nom */}
          <Stack direction="row" spacing={2}>
            <TextField
              name="firstName"
              label="Prénom *"
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="middleName"
              label="Middle Name"
              value={formData.middleName}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="lastName"
              label="Nom *"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
            />
          </Stack>

          {/* Ligne 2: Date de naissance, Genre, Username */}
          <Stack direction="row" spacing={2}>
            <TextField
              name="birthDate"
              label="Date de naissance *"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.birthDate}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              select
              name="gender"
              label="Genre *"
              value={formData.gender}
              onChange={handleChange}
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
              label="Nom d'utilisateur *"
              value={formData.userName}
              onChange={handleChange}
              fullWidth
            />
          </Stack>

          {/* Ligne 3: Email et Téléphone */}
          <Stack direction="row" spacing={2}>
            <TextField
              name="email"
              label="Email *"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="phoneNumber"
              label="Téléphone *"
              value={formData.phoneNumber}
              onChange={handleChange}
              fullWidth
            />
          </Stack>

          {/* Adresse */}
          <TextField
            name="address"
            label="Adresse *"
            multiline
            rows={2}
            value={formData.address}
            onChange={handleChange}
            fullWidth
          />
        </Stack>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/app/user')}
            disabled={loading}
          >
            Annuler
          </Button>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={loading}
          >
            Ajouter l'employé
          </LoadingButton>
        </Box>
      </Card>
    </Box>
  );
}