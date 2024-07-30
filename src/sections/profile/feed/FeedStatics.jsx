import React from 'react';
import ProfileStatistics from '../ProfileStatistics';

function FeedStatics() {
  const stats = {
    vuesProfil: 120,
    impressionsPost: 500,
    apparitionsRecherche: 30,
    interactions: 75,
    vuesVideo: 200,
  };

  return (
    <div>
      <ProfileStatistics {...stats} />
    </div>
  );
}

export default  FeedStatics;
