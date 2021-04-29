import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import grades from '../editor/grades';
import { faEllipsisV, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BrowserItemInfo } from './BrowserItemInfo';
import { Ascent } from './browserSlice';

interface Props {
  problem: {
    setBy: string;
    _id: string;
    title: string;
    grade: number;
    date: string;
    rating: number;
    user: string;
    ascents: Ascent[];
  };
}

export const BrowserItem = ({ problem }: Props) => {
  const [expand, toggleExpand] = useState(false);
  const { title, _id, grade, setBy, date, rating, user, ascents } = problem;
  const consensusGrade = () => {
    if (ascents.length === 0) return grade;
    const suggestedGrades = ascents.map((ascent) => ascent.grade).concat(grade);
    const averageGrade = suggestedGrades.reduce((val, acc) => acc + val);
    return Math.round(averageGrade / suggestedGrades.length);
  };
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
          <Link className='browser-item-title' to={`/problems/${_id}`}>
            {<strong>{title}</strong>}
          </Link>
        </div>
        <div className='browser-item-grade unselectable'>
          <p
            style={{
              color: `${grades[consensusGrade()].color}`
            }}
          >
            {grades[consensusGrade()].grade}
          </p>
        </div>
      </div>
      {expand && (
        <BrowserItemInfo
          setBy={setBy}
          date={date}
          rating={rating}
          id={_id}
          user={user}
        />
      )}
    </div>
  );
};
