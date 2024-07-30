import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function ProfileFormation({ formations }) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">Formation</Typography>
        {formations.map((formation, index) => (
          <div key={index}>
            <Typography variant="body1">{formation.ecole}</Typography>
            <Typography variant="body2">{formation.periode}</Typography>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
