import React from 'react';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Iconify from '../../components/iconify';
import Box from '@mui/material/Box';

export default function HeaderProfile({ user, coverPhotoUrl }) {
  return (
    <Grid container spacing={3} style={{ margin: '20px 0' }}>
      <Grid item xs={12}>
        <div style={{ position: 'relative' }}>
          <img src={coverPhotoUrl} alt="Cover" style={{ width: '100%', height: 200, objectFit: 'cover' }} />
          <Avatar 
            alt={user.name} 
            src={user.avatarUrl} 
            sx={{ 
              width: 120, 
              height: 120, 
              position: 'absolute', 
              bottom: -60, 
              left: 16, 
              border: '4px solid white' 
            }} 
          />
        </div>
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="flex-end">
          <Button variant="outlined" startIcon={<Iconify icon="ic:round-person-add-alt-1" />}>
            Follow
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} style={{ marginTop: '60px' }}>
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
        <Grid item xs={12} sm={1.7}>
          <Box
            sx={{
              p: 2,
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
              borderRadius: '8px',
              textAlign: 'right',
            }}
          >
            <Typography variant="subtitle2" color="text.secondary">
              <strong>{user.followers}</strong> Followers
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={1.7}>
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
