import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { StarRating } from '../layout/StarRating';
import { deleteProblem } from './browserSlice';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DateTime } from 'luxon';

interface Props {
  setBy: string;
  date: string;
  id: string;
  user: string;
  consensusRating?: number;
}

export const BrowserItemInfo = ({
  setBy,
  date,
  id,
  user,
  consensusRating
}: Props) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.user._id);

  const handleDelete = () => {
    if (window.confirm('Are you sure? Deletion is permanent.'))
      dispatch(deleteProblem(id));
  };

  const isOwner = currentUser === user;
  const dateObject = new Date(date);
  return (
    <div className='browser-item-info menu-animation-down'>
      <div>
        <strong>Set by:</strong> {isOwner ? 'You' : setBy}
      </div>

      <div className='div-space'>
        <p>{DateTime.fromJSDate(dateObject).toRelative()}</p>
        {isOwner && (
          <button onClick={handleDelete} className='btn-small btn-delete'>
            <FontAwesomeIcon
              icon={faTrashAlt}
              style={{ width: '100%', height: '70%' }}
            />
          </button>
        )}
        {consensusRating ? <StarRating rating={consensusRating} /> : 'Unrated'}
      </div>
    </div>
  );
};
