import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Iconify from '../../../components/iconify';

export default function FeedItem({ item }) {
  return (
    <Card sx={{ mb: 1}}>
      <CardHeader
        avatar={<Avatar src={item.user.avatarUrl} />}
        title={item.user.name}
        subheader={item.user.username}
        action={
          <IconButton>
            <Iconify icon="ic:baseline-more-vert" />
          </IconButton>
        }
      />
      {item.imageUrl && (
        <CardMedia
          component="img"
          image={item.imageUrl}
          alt={item.title}
          sx={{ height: 150,width: 150, objectFit: 'cover' }}
        />
      )}
      <CardContent>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {item.content}
        </Typography>
        {item.likes > 0 && (
          <Typography variant="body2" color="text.secondary">
            {item.likes} Likes
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
