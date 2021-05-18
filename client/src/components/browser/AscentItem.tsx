import React, { useState } from 'react';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
    _id,
    avatar
  } = ascent;
  const ascentItemInfoProps = {
    rating,
    user,
    ascentId: _id,
    problemId,
    createdAt,
    name,
    grade,
    comment
  };
  const firstName = name.split(' ').slice(0, 1);

  return (
    <div className='ascent-item'>
      <div className='ascent-item-main'>
        <div className='div-center'>
          <img
            src={avatar}
            alt={`${firstName}`}
            className='avatar'
            title={name}
          />
        </div>
        <div className='div-center'>
          <p>Attempts: </p>
          <strong>{attempts}</strong>
        </div>
        <div className='div-center'>
          <p
            style={{
              color: `${grades[grade].color}`
            }}
            className='grade-small'
          >
            <strong>{grades[grade].grade}</strong>
          </p>
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
      </div>

      {expand && <AscentItemInfo ascentItemInfoProps={ascentItemInfoProps} />}
    </div>
  );
};
