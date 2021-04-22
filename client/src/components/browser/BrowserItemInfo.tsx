import React from 'react';
import Moment from 'react-moment';
import { faStar as faStarS } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  setBy: string;
  date: string;
  rating: number;
}
export const BrowserItemInfo = ({ setBy, date, rating }: Props) => {
  const starRating = () => {
    const stars = 5 - rating;
  };
  return (
    <div className='browser-item-info'>
      <p>Set by: {setBy}</p>

      <p style={{ fontSize: '0.9rem' }}>
        <Moment fromNow>{date}</Moment>
      </p>
    </div>
  );
};
