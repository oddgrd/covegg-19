import React from 'react';
import { faStar as faStarS } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
type Float = 'left' | 'right' | 'none' | 'inline-start' | 'inline-end';

interface Props {
  rating: number;
  float: Float;
}

export const StarRating = ({ rating, float }: Props) => {
  const stars = new Array(rating).fill(<FontAwesomeIcon icon={faStarS} />);
  const floatStyle = { float: `${float}` as Float };
  while (stars.length < 5) {
    stars.push(<FontAwesomeIcon icon={faStar} />);
  }
  return (
    <span
      style={{ ...floatStyle, fontSize: '1rem', padding: '0 0.2rem 0.2rem 0' }}
    >
      {stars.map((star, idx) => (
        <span key={idx}>{star}</span>
      ))}
    </span>
  );
};
