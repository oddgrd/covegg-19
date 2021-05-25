import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { StarRating } from '../layout/StarRating';
import { deleteAscent } from './browserSlice';
import {
  faQuoteRight,
  faTools,
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Moment from 'react-moment';
import { AscentForm } from './AscentForm';

interface Props {
  rating: number;
  user: string;
  ascentId: string;
  problemId: string;
  createdAt: string;
  name: string;
  grade: number;
  comment: string | undefined;
}

export const AscentItemInfo = ({
  ascentId,
  user,
  rating,
  problemId,
  createdAt,
  name,
  grade,
  comment
}: Props) => {
  const dispatch = useAppDispatch();
  const [ascentForm, toggleAscentForm] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentUser = useAppSelector((state) => state.auth.user._id);
  const handleDelete = () => {
    const ids = { ascentId, problemId };
    if (window.confirm('Are you sure? Deletion is permanent.'))
      dispatch(deleteAscent(ids));
  };

  const firstName = name.split(' ').slice(0, 1);
  const isOwner = currentUser === user;

  const editProps = { comment, rating, grade, ascentId };

  useEffect(() => {
    if (ascentForm) scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [ascentForm]);
  return (
    <div className='ascent-item-info menu-animation'>
      <div className='div-space'>
        <div className='div-center'>
          <p>{firstName}</p>
          <p style={{ fontSize: '0.8rem', textAlign: 'center' }}>
            <Moment fromNow>{createdAt}</Moment>
          </p>
        </div>

        {isOwner && (
          <div className='options-small'>
            <button className='btn-small btn-delete' onClick={handleDelete}>
              <FontAwesomeIcon
                icon={faTrashAlt}
                style={{ width: '100%', height: '70%' }}
              />
            </button>
            <button
              className='btn-small btn-edit'
              onClick={() => toggleAscentForm(!ascentForm)}
            >
              <FontAwesomeIcon
                icon={faTools}
                style={{ width: '100%', height: '70%' }}
              />
            </button>
          </div>
        )}
        <StarRating rating={rating} />
      </div>

      {comment && comment.length > 0 && (
        <div className='comment'>
          <FontAwesomeIcon
            icon={faQuoteRight}
            style={{ fontSize: '1.6rem', color: '#05ab75' }}
          />{' '}
          {comment}
        </div>
      )}
      {ascentForm && (
        <>
          <div ref={scrollRef}></div>
          <AscentForm
            problemId={problemId}
            edit={editProps}
            toggleForm={toggleAscentForm}
          />
        </>
      )}
    </div>
  );
};
