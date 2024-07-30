import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

export default function ProfileActivity({ posts }) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">Activité</Typography>
        <List>
          {posts.map((post, index) => (
            <ListItem key={index}>{post}</ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
