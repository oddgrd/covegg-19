import React from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { StarRating } from '../layout/StarRating';
import { deleteAscent, deleteProblem } from './browserSlice';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  comment: string;
  rating: number;
  user: string;
  ascentId: string;
  problemId: string;
}

export const AscentItemInfo = ({
  comment,
  rating,
  user,
  ascentId,
  problemId
}: Props) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.user._id);
  const handleDelete = () => {
    const ids = { ascentId, problemId };
    dispatch(deleteAscent(ids));
  };

  const isOwner = currentUser === user;
  return (
    <div className='ascent-item-info'>
      <div className='div-space'>
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
        <span>
          <strong>Comment:</strong> {comment}
        </span>
      )}
    </div>
  );
};
