import React, { useState, useEffect } from 'react';
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
import { Typography } from '@mui/material';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // 1. Récupérer les données de base depuis le localStorage
        const userData = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');
        
        if (!userData || !token) {
          throw new Error('No user data found');
        }

        // 2. Optionnel: Récupérer les données fraîches depuis l'API
        const response = await fetch('https://localhost:7294/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        let completeUserData = userData;
        
        if (response.ok) {
          const freshData = await response.json();
          completeUserData = { ...userData, ...freshData };
          localStorage.setItem('user', JSON.stringify(completeUserData));
        }

        // 3. Formater les données pour l'affichage
        setUser({
          id: completeUserData.id,
          firstName: completeUserData.firstName,
          lastName: completeUserData.lastName,
          name: `${completeUserData.firstName} ${completeUserData.lastName}`,
          username: `@${completeUserData.userName}`,
          email: completeUserData.email,
          bio: completeUserData.bio || 'No bio available',
          avatarUrl: completeUserData.photoURL || profileImg,
          coverPhotoUrl: completeUserData.coverPhotoUrl || coverImg,
          followers: completeUserData.followers || 0,
          following: completeUserData.following || 0,
          birthDate: completeUserData.birthDate,
          role: completeUserData.role,
          createdAt: completeUserData.createdAt,
          // Ajoutez d'autres champs si nécessaire
        });

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

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
      image: ipImg, 
      commentsCount: 50,
      likesCount: 100,
    },
  ];

  if (loading) return <Container maxWidth="lg">Loading...</Container>;
  if (error) return <Container maxWidth="lg">Error: {error}</Container>;
  if (!user) return <Container maxWidth="lg">No user data available</Container>;

  return (
    <Container maxWidth="lg">
      {/* Afficher toutes les informations utilisateur dans la console pour debug */}
      {console.log('User data:', user)}
      
      <HeaderProfile 
        user={user} 
        coverPhotoUrl={user.coverPhotoUrl} 
      />
      
      {/* Section pour afficher les informations détaillées */}
      <div style={{ margin: '20px 0', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <Typography variant="h6" gutterBottom>Détails du compte</Typography>
        <Typography><strong>ID:</strong> {user.id}</Typography>
        <Typography><strong>Nom complet:</strong> {user.name}</Typography>
        <Typography><strong>Email:</strong> {user.email}</Typography>
        <Typography><strong>Nom d'utilisateur:</strong> {user.username}</Typography>
        {user.birthDate && <Typography><strong>Date de naissance:</strong> {new Date(user.birthDate).toLocaleDateString()}</Typography>}
        <Typography><strong>Role:</strong> {user.role}</Typography>
        {user.createdAt && <Typography><strong>Membre depuis:</strong> {new Date(user.createdAt).toLocaleDateString()}</Typography>}
      </div>

      <ProfileSuggestion suggestions={suggestions} />
      <ProfileStatistics 
        profileView={stats.profileView} 
        impressionsPost={stats.impressionsPost} 
        {...stats} 
      />
      <ProfileActivity posts={posts} />
    </Container>
  );
}