import React from 'react';
import { faStar as faStarS } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  rating: number;
}

export const StarRating = ({ rating }: Props) => {
  const stars = new Array(rating).fill(<FontAwesomeIcon icon={faStarS} />);

  while (stars.length < 5) {
    stars.push(<FontAwesomeIcon icon={faStar} />);
  }
  return (
    <span style={{ fontSize: '1rem', padding: '0 0.2rem 0.2rem 0' }}>
      {stars.map((star, idx) => (
        <span key={idx}>{star}</span>
      ))}
    </span>
  );
};
