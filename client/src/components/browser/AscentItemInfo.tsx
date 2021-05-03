import React from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { StarRating } from '../layout/StarRating';
import { deleteAscent, deleteProblem } from './browserSlice';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Moment from 'react-moment';

interface Props {
  comment: string;
  rating: number;
  user: string;
  ascentId: string;
  problemId: string;
  createdAt: string;
}

export const AscentItemInfo = ({
  comment,
  rating,
  user,
  ascentId,
  problemId,
  createdAt
}: Props) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.user._id);
  const handleDelete = () => {
    const ids = { ascentId, problemId };
    if (window.confirm('Are you sure? Deletion is permanent.'))
      dispatch(deleteAscent(ids));
  };

  const isOwner = currentUser === user;
  return (
    <div className='ascent-item-info'>
      <div className='div-space'>
        <p style={{ fontSize: '0.8rem', textAlign: 'center' }}>
          <Moment fromNow>{createdAt}</Moment>
        </p>
        {isOwner && (
          <button className='btn-trash' onClick={handleDelete}>
            <FontAwesomeIcon
              icon={faTimes}
              style={{ width: '100%', height: '100%' }}
            />
          </button>
        )}
        <StarRating rating={rating} />
      </div>

      {comment.length > 0 && (
        <div className='comment'>
          <span>
            <strong>Comment:</strong> {comment}
          </span>
        </div>
      )}
    </div>
  );
};
