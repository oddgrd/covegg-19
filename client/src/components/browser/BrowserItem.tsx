import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import grades from '../editor/grades';
import {
  faEllipsisV,
  faEllipsisH,
  faCheckSquare
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BrowserItemInfo } from './BrowserItemInfo';
import { Ascent } from './browserSlice';
import { useAppSelector } from '../../app/hooks';
import { faSquare as faSquareReg } from '@fortawesome/free-regular-svg-icons';

interface Props {
  problem: {
    setBy: string;
    _id: string;
    title: string;
    grade: number;
    date: string;
    user: string;
    ascents: Ascent[];
  };
}

export const BrowserItem = ({ problem }: Props) => {
  const [expand, toggleExpand] = useState(false);
  const { title, _id, grade, setBy, date, user, ascents } = problem;
  const currentUser = useAppSelector((state) => state.auth.user._id);

  const consensusGrade = () => {
    if (ascents.length === 0) return grade;
    const suggestedGrades = ascents.map((ascent: Ascent) => ascent.grade);
    const averageGrade = suggestedGrades.reduce(
      (val: number, acc: number) => acc + val
    );
    return Math.round(averageGrade / suggestedGrades.length);
  };
  const ticked = () => {
    if (ascents.length === 0)
      return (
        <FontAwesomeIcon
          icon={faSquareReg}
          style={{ color: '#05ab75', fontSize: '1.2rem', opacity: '0.7' }}
        />
      );
    const ticks = ascents.filter((ascent) => ascent.user === currentUser);
    if (ticks.length === 0)
      return (
        <FontAwesomeIcon
          icon={faSquareReg}
          style={{ color: '#05ab75', fontSize: '1.2rem', opacity: '0.7' }}
        />
      );
    return (
      <FontAwesomeIcon
        icon={faCheckSquare}
        style={{ color: '#05ab75', fontSize: '1.2rem' }}
      />
    );
  };

  return (
    <div className='browser-item'>
      <div className='browser-item-main'>
        <div
          className='browser-item-grade unselectable'
          style={{
            color: `${grades[consensusGrade()].color}`
          }}
        >
          {ascents.length === 0
            ? grades[consensusGrade()].grade + '?'
            : grades[consensusGrade()].grade}
        </div>
        <div className='div-center'>
          <Link className='browser-item-title' to={`/browse/${_id}`}>
            <strong>{title}</strong>
          </Link>
        </div>
        <div className='div-center' style={{ width: '34px' }}>
          {ticked()}
        </div>
        <div>
          <button
            onClick={() => toggleExpand(!expand)}
            className='btn'
            style={{
              color: '#05ab75',
              fontSize: '1.4rem',
              padding: '1rem',
              width: '40px'
            }}
          >
            <FontAwesomeIcon icon={expand ? faEllipsisH : faEllipsisV} />
          </button>
        </div>
      </div>
      {expand && (
        <BrowserItemInfo
          setBy={setBy}
          date={date}
          id={_id}
          user={user}
          ascents={ascents}
        />
      )}
    </div>
  );
};
