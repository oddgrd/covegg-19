import React from 'react';
import Moment from 'react-moment';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { StarRating } from '../layout/StarRating';
import { Ascent, deleteProblem } from './browserSlice';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faSquare } from '@fortawesome/free-regular-svg-icons';

interface Props {
  setBy: string;
  date: string;
  rating: number;
  ascents: Ascent[];
  id: string;
  user: string;
}

export const BrowserItemInfo = ({
  setBy,
  date,
  rating,
  id,
  user,
  ascents
}: Props) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.user._id);

  const handleDelete = () => {
    if (window.confirm('Are you sure? Deletion is permanent.'))
      dispatch(deleteProblem(id));
  };

  const consensusRating = () => {
    if (ascents.length === 0) return rating;
    const suggestedRatings = ascents.map((ascent: Ascent) => ascent.rating);
    const averageRating = suggestedRatings.reduce(
      (val: number, acc: number) => acc + val
    );
    return Math.round(averageRating / suggestedRatings.length);
  };
  const ticked = () => {
    if (ascents.length === 0) return <FontAwesomeIcon icon={faSquare} />;
    const ticks = ascents.filter((ascent) => ascent.user === currentUser);
    if (ticks.length === 0) return <FontAwesomeIcon icon={faSquare} />;
    return (
      <FontAwesomeIcon icon={faCheckSquare} style={{ color: '#28a745' }} />
    );
  };

  const isOwner = currentUser === user;
  return (
    <div className='browser-item-info'>
      <div className='div-space'>
        <div>
          <strong>Set by:</strong> {isOwner ? 'You' : setBy}
        </div>
        <div style={{ paddingRight: '0.3rem' }}>{ticked()}</div>
      </div>

      <div className='div-space'>
        <Moment fromNow>{date}</Moment>
        {isOwner && (
          <button onClick={handleDelete} className='btn-trash'>
            <FontAwesomeIcon
              icon={faTimes}
              style={{ width: '100%', height: '100%' }}
            />
          </button>
        )}
        <StarRating rating={consensusRating()} />
      </div>
    </div>
  );
};
