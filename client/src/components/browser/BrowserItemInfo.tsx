import React from 'react';
import Moment from 'react-moment';
import { StarRating } from '../layout/StarRating';

interface Props {
  setBy: string;
  date: string;
  rating: number;
}
export const BrowserItemInfo = ({ setBy, date, rating }: Props) => {
  return (
    <div className='browser-item-info'>
      <p>
        <strong>Set by:</strong> {setBy}
      </p>

      <p style={{ fontSize: '0.9rem' }}>
        <Moment fromNow>{date}</Moment>
        <StarRating rating={rating} float={'right'} />
      </p>
    </div>
  );
};
