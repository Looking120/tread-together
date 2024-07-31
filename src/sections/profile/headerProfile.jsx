import React from 'react';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Iconify from '../../components/iconify';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link } from 'react-router-dom'; // Import Link for navigation

export default function HeaderProfile({ user, coverPhotoUrl }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid container spacing={3} sx={{ margin: '20px auto', maxWidth: 1200 }}>
      <Grid item xs={12}>
        <Box sx={{ position: 'relative' }}>
          <img 
            src={coverPhotoUrl} 
            alt="Cover" 
            style={{ 
              width: '100%', 
              height: isMobile ? 150 : 200, 
              objectFit: 'cover' 
            }} 
          />
          <Avatar 
            alt={user.name} 
            src={user.avatarUrl} 
            sx={{ 
              width: 120, 
              height: 120, 
              position: 'absolute', 
              bottom: -60, 
              left: 16, 
              border: '4px solid white',
              [theme.breakpoints.down('sm')]: {
                width: 100,
                height: 100,
                bottom: -50,
              },
            }} 
          />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="flex-end">
        <Link to="/follow" style={{ textDecoration: 'none' }}>
          <Button 
            variant="outlined" 
            startIcon={<Iconify icon="ic:round-person-add-alt-1" />}
            sx={{ [theme.breakpoints.down('sm')]: { fontSize: '0.75rem' } }}
          >
            Follow
          </Button>
        </Link>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ mt: isMobile ? 4 : 6 }}>
        <Typography variant="h4" gutterBottom>
          {user.name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {user.username}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {user.bio}
        </Typography>
        <Grid container justifyContent="flex-end" spacing={3} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                p: 2,
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                textAlign: 'right',
              }}
            >
              <Link to="/user" style={{ textDecoration: 'none' }}>
                <Typography variant="subtitle2" color="text.secondary">
                  <strong>{user.followers}</strong> Followers
                </Typography>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                p: 2,
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                textAlign: 'right',
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                <strong>{user.following}</strong> Following
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
