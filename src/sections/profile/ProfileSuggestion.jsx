import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SearchSvg from './images/Icon/search_icon.svg';
import ViewSvg from './images/Icon/view_icon.svg';
import TubeSvg from './images/Icon/tube_icon.svg';
import HeartSvg from './images/Icon/profile_icon.svg';
import LocationSvg from './images/Icon/tube_icon.svg';

const SuggestionBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: theme.spacing(1),
}));

const SlideImage = styled('img')({
  width: 30,
  height: 30,
  marginBottom: 10,
});

export default function ProfileSuggestion({ suggestions }) {
  // Exemple de suggestions génériques pour simuler un magasin en ligne
  const dynamicSuggestions = [
    { icon: <SlideImage src={SearchSvg} alt="Search icon" />, label: 'Discover New Places', description: 'Explore hidden treasures around the world.', },
    { icon: <SlideImage src={ViewSvg} alt="View icon" />, label: 'Travel Experiences', description: 'Share your travel adventures with others.' },
    { icon: <SlideImage src={TubeSvg} alt="Tube icon" />, label: 'Explore Unique Stays', description: 'Find unique accommodations for your next trip.' },
    { icon: <SlideImage src={HeartSvg} alt="Heart icon" />, label: 'Favorites', description: 'Save your favorite places and revisit them anytime.' },
    { icon: <SlideImage src={LocationSvg} alt="Location icon" />, label: 'Local Gems', description: 'Discover local gems and support local businesses.' },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Suggestions</Typography>
        <Slider {...sliderSettings}>
          {dynamicSuggestions.map((suggestion, index) => (
            <SuggestionBox key={index}>
              {suggestion.icon}
              <Typography variant="body2">{suggestion.label}</Typography>
              <Typography variant="caption">{suggestion.description}</Typography>
            </SuggestionBox>
          ))}
        </Slider>
      </CardContent>
    </Card>
  );
}
