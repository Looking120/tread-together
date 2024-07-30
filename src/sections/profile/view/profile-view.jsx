import React from 'react';
import Container from '@mui/material/Container';
import HeaderProfile from '../headerProfile';
import ProfileSuggestion from '../ProfileSuggestion';
import ProfileStatistics from '../ProfileStatistics';
import ProfileActivity from '../ProfileActivity';
import ProfileFormation from '../ProfileFormation';
import ProfileExperience from '../ProfileExperience';
import coverImg from '../images/covers/cover_1.jpg';
import profileImg from '../images/avatars/avatar_10.jpg';

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
    vuesProfil: 120,
    impressionsPost: 500,
    apparitionsRecherche: 30,
    interactions: 75,
    vuesVideo: 200,
  };

  const suggestions = ['Suggestion 1', 'Suggestion 2', 'Suggestion 3'];
  const profileView = 3;
  const impressionsPostCount = 0;
  const posts = ['Post 1', 'Post 2', 'Post 3'];
  const experiences = [
    { poste: 'Développeur', organisation: 'Company', periode: '2023 - aujourd\'hui' }
  ];
  const formations = [
    { ecole: 'State Technical University Of Homieĺ', periode: '2020 - 2024' }
  ];

  return (
    <Container maxWidth="lg">
      <HeaderProfile user={user} coverPhotoUrl={user.coverPhotoUrl} />
      <ProfileSuggestion suggestions={suggestions} />
      <ProfileStatistics profileView={profileView} impressionsPost={impressionsPostCount} {...stats} />
      <ProfileActivity posts={posts} />
      <ProfileExperience experiences={experiences} />
      <ProfileFormation formations={formations} />
    </Container>
  );
}
