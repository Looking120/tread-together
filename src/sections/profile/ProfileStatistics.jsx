import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import VisibilitySvg from './images/Icon/view_icon.svg';
import SearchSvg from './images/Icon/search_icon.svg';
import ThumbUpSvg from './images/Icon/favorite_icon.svg';
import PlaySvg from './images/Icon/tube_icon.svg';
import PersonSvg from './images/Icon/profile_icon.svg'; // Assurez-vous que le chemin est correct
import { styled } from '@mui/system';

const ActivityBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  '& div': {
    width: 10,
    height: 10,
    margin: '1px',
    backgroundColor: theme.palette.primary.main,
  },
}));

const StatisticBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  width: 'calc(100% / 5)', // Distribue les éléments sur une ligne
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: theme.spacing(1),
}));

export default function ProfileStatistics({ vuesProfil, impressionsPost, apparitionsRecherche, interactions, vuesVideo }) {
  const stats = [
    {
      label: 'Vues du profil',
      value: vuesProfil,
      icon: <img src={PersonSvg} alt="Profile icon" style={{ width: 24, height: 24 }} />,
      description: 'Continuez à poster pour plus de visibilité.',
    },
    {
      label: 'Impressions de post',
      value: impressionsPost,
      icon:<img src={VisibilitySvg} alt="Visibility icon" style={{ width: 30, height: 30 }} />,
      description: 'Augmentez l\'engagement pour plus d\'impressions.',
    },
    {
      label: 'Apparitions dans les recherches',
      value: apparitionsRecherche,
      icon:  <img src={SearchSvg} alt="Search icon" style={{ width: 30, height: 30 }} />,
      activity: true,
    },
    {
      label: 'Interactions',
      value: interactions,
      icon:  <img src={ThumbUpSvg} alt="ThumbUp icon" style={{ width: 30, height: 30 }} />,
      description: 'Les interactions augmentent votre portée.',
    },
    {
      label: 'Vues de vidéos',
      value: vuesVideo,
      icon: <img src={PlaySvg} alt="Play icon" style={{ width: 30, height: 30 }} /> ,
      description: 'Les vidéos sont un excellent moyen de capter l\'attention.',
    },
  ];

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Statistiques</Typography>
        <Box display="flex" flexWrap="wrap">
          {stats.map((stat, index) => (
            <StatisticBox key={index}>
              <Box display="flex" alignItems="center" mb={1}>
                {stat.icon}
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {stat.label}: {stat.value}
                </Typography>
              </Box>
              {stat.description && (
                <Typography variant="caption" display="block">
                  {stat.description}
                </Typography>
              )}
              {stat.activity && (
                <ActivityBox>
                  {[...Array(30)].map((_, idx) => (
                    <div key={idx} />
                  ))}
                </ActivityBox>
              )}
            </StatisticBox>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
