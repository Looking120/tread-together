import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import Badge from '@mui/material/Badge';
import { red, blue, grey } from '@mui/material/colors';

export default function ProfileActivity({ posts }) {
  return (
    <Card sx={{ mb: 2, bgcolor: grey[100] }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, color: blue[800] }}>Activité</Typography>
        <Grid container spacing={2}>
          {posts.map((post, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ bgcolor: 'white', borderRadius: 2, boxShadow: 3, position: 'relative' }}>
                <CardHeader
                  avatar={<Avatar src={post.userAvatar} />}
                  title={post.userName}
                  subheader={post.date}
                  action={
                    <IconButton>
                      <ShareIcon sx={{ color: blue[600] }} />
                    </IconButton>
                  }
                />
                {post.image && (
                  <CardMedia
                    component="img"
                    image={post.image}
                    alt="Post image"
                    sx={{
                      maxHeight: 200,
                      objectFit: 'cover',
                      borderRadius: 1,
                      position: 'relative',
                    }}
                  />
                )}
                <CardContent sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  position: 'absolute',
                  bottom: 1,
                  left: 10,
                  right: 10,
                  p: 1,
                  bgcolor: 'rgba(255, 255, 255, 0.7)', 
                  borderRadius: 1,
                }}>
                  <Badge
                    badgeContent={post.likesCount || 0}
                    color="error"
                    sx={{ mr: 1 }} // Marge droite pour l'icône
                  >
                    <IconButton
                      aria-label="add to favorites"
                      sx={{ color: red[600] }}
                    >
                      <FavoriteIcon />
                    </IconButton>
                  </Badge>
                  <Badge
                    badgeContent={post.commentsCount || 0}
                    color="secondary"
                    sx={{ mr: 1 }} // Marge droite pour l'icône
                  >
                    <IconButton
                      aria-label="comment"
                      sx={{ color: grey[600] }}
                    >
                      <ModeCommentIcon />
                    </IconButton>
                  </Badge>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
