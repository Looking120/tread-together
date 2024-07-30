import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function ProfileExperience({ experiences }) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">Expérience</Typography>
        {experiences.map((experience, index) => (
          <div key={index}>
            <Typography variant="body1">{experience.poste}</Typography>
            <Typography variant="body2">{experience.organisation}</Typography>
            <Typography variant="body2">{experience.periode}</Typography>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
