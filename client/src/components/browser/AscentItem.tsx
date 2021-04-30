import { faEllipsisH, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Moment from 'react-moment';
import { useAppSelector } from '../../app/hooks';
import grades from '../editor/grades';
import { AscentItemInfo } from './AscentItemInfo';
import { Ascent } from './browserSlice';

interface Props {
  ascent: Ascent;
  problemId: string;
}
export const AscentItem = ({ ascent, problemId }: Props) => {
  const [expand, toggleExpand] = useState(false);
  const {
    name,
    attempts,
    rating,
    grade,
    comment,
    createdAt,
    user,
    _id
  } = ascent;
  const currentUser = useAppSelector((state) => state.auth.user._id);
  const isOwner = currentUser === user;
  return (
    <div className='ascent-item'>
      <div className='ascent-item-main'>
        <div>
          <p style={{ textAlign: 'center' }}>
            {isOwner ? 'You' : name.split(' ').slice(0, 1)}
          </p>
          <p style={{ fontSize: '0.8rem', textAlign: 'center' }}>
            <Moment fromNow>{createdAt}</Moment>
          </p>
        </div>
        <div className='ascent-item-center'>
          <p>Attempts: {attempts}</p>
          <button
            onClick={() => toggleExpand(!expand)}
            className='btn'
            style={{
              color: '#05ab75',
              fontSize: '1.4rem',
              padding: '0.3rem',
              width: '45px'
            }}
          >
            <FontAwesomeIcon icon={faEllipsisH} />
          </button>
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

      {expand && (
        <AscentItemInfo
          comment={comment ? comment : ''}
          rating={rating}
          user={user}
          ascentId={_id}
          problemId={problemId}
        />
      )}
    </div>
  );
};
