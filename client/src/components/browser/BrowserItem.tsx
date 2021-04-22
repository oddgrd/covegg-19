import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import grades from '../editor/grades';
import { Problem } from './browserSlice';

interface Props {
  problem: {
    setBy: string;
    _id: string;
    title: string;
    grade: number;
    date: string;
  };
}

export const BrowserItem = ({ problem }: Props) => {
  const firstName = problem.setBy.split(' ').slice(0, 1);
  return (
    <>
      <tr>
        <td>
          <Link to={`/problem/${problem._id}`}>{problem.title}</Link>
        </td>
        <td>{firstName}</td>
        <td style={{ color: `${grades[problem.grade].color}` }}>
          {grades[problem.grade].grade}
        </td>
        <td>
          <Moment fromNow>{problem.date}</Moment>
        </td>
      </tr>
    </>
  );
};
