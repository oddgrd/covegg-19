import React from 'react';
import Moment from 'react-moment';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { StarRating } from '../layout/StarRating';
import { deleteProblem } from './browserSlice';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  setBy: string;
  date: string;
  rating: number;
  id: string;
  user: string;
}

export const BrowserItemInfo = ({ setBy, date, rating, id, user }: Props) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.user._id);
  const handleDelete = () => {
    dispatch(deleteProblem(id));
  };

  const isOwner = currentUser === user;
  return (
    <div className='browser-item-info'>
      <span>
        <strong>Set by:</strong> {isOwner ? 'You' : setBy}
      </span>

      <div className='div-space'>
        <Moment fromNow>{date}</Moment>
        {currentUser === user && (
          <button onClick={handleDelete} className='btn-trash'>
            <FontAwesomeIcon
              icon={faTimes}
              style={{ width: '100%', height: '100%' }}
            />
          </button>
        )}
        <StarRating rating={rating} float={'right'} />
      </div>
    </div>
  );
};
