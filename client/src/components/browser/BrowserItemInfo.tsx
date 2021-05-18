import React from 'react';
import Moment from 'react-moment';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { StarRating } from '../layout/StarRating';
import { Ascent, deleteProblem } from './browserSlice';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  setBy: string;
  date: string;
  ascents: Ascent[];
  id: string;
  user: string;
}

export const BrowserItemInfo = ({ setBy, date, id, user, ascents }: Props) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.user._id);

  const handleDelete = () => {
    if (window.confirm('Are you sure? Deletion is permanent.'))
      dispatch(deleteProblem(id));
  };

  const consensusRating = () => {
    const suggestedRatings = ascents.map((ascent: Ascent) => ascent.rating);
    const averageRating = suggestedRatings.reduce(
      (val: number, acc: number) => acc + val
    );
    return Math.round(averageRating / suggestedRatings.length);
  };

  const isOwner = currentUser === user;
  return (
    <div className='browser-item-info menu-animation-down'>
      <div>
        <strong>Set by:</strong> {isOwner ? 'You' : setBy}
      </div>

      <div className='div-space'>
        <Moment fromNow>{date}</Moment>
        {isOwner && (
          <button onClick={handleDelete} className='btn-small btn-delete'>
            <FontAwesomeIcon
              icon={faTrashAlt}
              style={{ width: '100%', height: '70%' }}
            />
          </button>
        )}
        {ascents.length === 0 ? (
          'Unrated'
        ) : (
          <StarRating rating={consensusRating()} />
        )}
      </div>
    </div>
  );
};
