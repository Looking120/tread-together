import React from 'react';
import FeedItem from './FeedItem';

export default function Feed({ feedItems }) {
  return (
    <div>
      {feedItems.map((item, index) => (
        <FeedItem key={index} item={item} />
      ))}
    </div>
  );
}