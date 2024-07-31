// Profile.js
import React from 'react';
import Container from '@mui/material/Container';
import HeaderProfile from '../headerProfile';
import ProfileSuggestion from '../ProfileSuggestion';
import ProfileStatistics from '../ProfileStatistics';
import ProfileActivity from '../ProfileActivity';
import coverImg from '../images/covers/cover_1.jpg';
import profileImg from '../images/avatars/avatar_10.jpg';
import houseImg from '../../../asset/Top Modern House Design Ideas_ Key Features & Style Insights.jpeg';
import house2Img from '../../../asset/3eb52274-de8d-43f5-ae0b-b0b581cd6846.jpeg';
import ipImg from '../../../asset/iPhone 11 - ZphoneS.jpeg';
import carImg from '../../../asset/Synthwave Sunset_ BMW i8 Wallpaper.jpeg';

export default function Profile() {
  const user = {
    name: 'John Doe',
    username: '@johndoe',
    bio: 'Software Developer | Tech Enthusiast',
    avatarUrl: profileImg,
    coverPhotoUrl: coverImg,
    followers: 1234,
    following: 567,
  };

  const stats = {
    profileView: 120,
    impressionsPost: 500,
    apparitionsRecherche: 30,
    interactions: 75,
    viewsVideo: 200,

  };

  const suggestions = [
    'Suggestion 1',
    'Suggestion 2',
    'Suggestion 3',
    'Suggestion 4'
  ];

  const posts = [
    {
      userAvatar: profileImg,
      userName: 'John Doe',
      date: 'July 31, 2024',
      image: houseImg,
      commentsCount: 10,
      likesCount: 25,
    },
    {
      userAvatar: profileImg,
      userName: 'Jane Smith',
      date: 'July 30, 2024',
      image: house2Img, 
      commentsCount: 5,
      likesCount: 50,
    },
    {
      userAvatar: profileImg, 
      userName: 'Jane Smith',
      date: 'July 30, 2024',
      image: carImg, 
      commentsCount: 20,
      likesCount: 100,
    },
    {
      userAvatar: profileImg,
      userName: 'Jane Smith',
      date: 'July 30, 2024',
      image:ipImg , 
      commentsCount: 50,
      likesCount: 100,
    },
    // Ajoutez plus de posts ici si nécessaire
  ];

  return (
    <Container maxWidth="lg">
      <HeaderProfile 
        user={user} 
        coverPhotoUrl={user.coverPhotoUrl} 
      />
      <ProfileSuggestion 
        suggestions={suggestions} 
      />
      <ProfileStatistics 
        profileView={stats.profileView} 
        impressionsPost={stats.impressionsPost} 
        {...stats} 
      />
      <ProfileActivity 
        posts={posts} // Passer les posts ici
      />
    </Container>
  );
}
