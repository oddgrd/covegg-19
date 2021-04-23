import React, { useCallback, useEffect, useRef, useState } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import grades from '../editor/grades';
import { faEllipsisV, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BrowserItemInfo } from './BrowserItemInfo';

interface Props {
  problem: {
    setBy: string;
    _id: string;
    title: string;
    grade: number;
    date: string;
    rating: number;
  };
}

export const BrowserItem = ({ problem }: Props) => {
  const [expand, toggleExpand] = useState(false);

  return (
    <div className='browser-item'>
      <div className='browser-item-main'>
        <button
          onClick={() => toggleExpand(!expand)}
          className='btn'
          style={{
            color: '#05ab75',
            fontSize: '1.4rem',
            padding: '1rem',
            maxWidth: '49.8px'
          }}
        >
          <FontAwesomeIcon icon={expand ? faEllipsisH : faEllipsisV} />
        </button>
        <div className='browser-item-title-div'>
          <Link className='browser-item-title' to={`/problem/${problem._id}`}>
            {<strong>{problem.title}</strong>}
          </Link>
        </div>
        <div className='browser-item-grade unselectable'>
          <p
            style={{
              color: `${grades[problem.grade].color}`
            }}
          >
            {grades[problem.grade].grade}
          </p>
        </div>
      </div>
      {expand && (
        <BrowserItemInfo
          setBy={problem.setBy}
          date={problem.date}
          rating={problem.rating}
        />
      )}
    </div>
  );
};
