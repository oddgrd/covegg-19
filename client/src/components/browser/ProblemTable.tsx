import React from 'react';
import Moment from 'react-moment';
import grades from '../editor/grades';
import { StarRating } from '../layout/StarRating';
import { Ascent } from './browserSlice';
interface Props {
  setBy: string;
  rules: string;
  board: string;
  date: string;
  rating: number;
  grade: number;
  ascents: Ascent[];
}
export const ProblemTable = ({
  setBy,
  rules,
  board,
  date,
  rating,
  ascents,
  grade
}: Props) => {
  return (
    <table className='problem-table'>
      <tbody>
        <tr>
          <th>Set by:</th>
          <td>{setBy}</td>
        </tr>
        {ascents.length > 0 && (
          <tr>
            <th>First Ascent:</th>
            <td>{ascents[0].name}</td>
          </tr>
        )}
        <tr>
          <th>Suggested grade:</th>
          <td style={{ color: `${grades[grade].color}` }}>
            {grades[grade].grade}
          </td>
        </tr>
        <tr>
          <th>Rating:</th>
          <td>
            <StarRating rating={rating} />
          </td>
        </tr>
        <tr>
          <th>Rules:</th>
          <td>{rules}</td>
        </tr>
        <tr>
          <th>Board:</th>
          <td>{board}</td>
        </tr>
        <tr>
          <th>Date:</th>
          <td>
            <Moment format='DD-MM-YYYY HH:mm'>{date}</Moment>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
