import React from 'react';
import Moment from 'react-moment';
import grades from '../editor/grades';
import { Ascent } from './browserSlice';

interface Props {
  ascent: Ascent;
}
export const AscentItem = ({ ascent }: Props) => {
  const { name, attempts, rating, grade, comment, createdAt } = ascent;
  return (
    <div className='ascent-item'>
      <div>{name}</div>
      <div className='ascent-item-info'>
        <p>{attempts}</p>

        <p style={{ fontSize: '0.9rem' }}>
          <Moment fromNow>{createdAt}</Moment>
        </p>
      </div>
      <div className='ascent-item-grade'>
        <p
          style={{
            color: `${grades[grade].color}`
          }}
        >
          {grades[grade].grade}
        </p>
      </div>
    </div>
  );
};
