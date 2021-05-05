import React, { useState } from 'react';
import Moment from 'react-moment';
import grades from '../editor/grades';
import { StarRating } from '../layout/StarRating';
import { Ascent } from './browserSlice';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
interface Props {
  setBy: string;
  rules: string;
  board: string;
  date: string;
  rating: number;
  grade: number;
  user: string;
  ascents: Ascent[];
}
export const ProblemTable = ({
  setBy,
  rules,
  board,
  date,
  rating,
  ascents,
  grade,
  user
}: Props) => {
  const [expand, toggleExpand] = useState(false);
  const consensusRating = () => {
    if (ascents.length === 0) return rating;
    const suggestedRatings = ascents.map((ascent: Ascent) => ascent.rating);
    const averageRating = suggestedRatings.reduce(
      (val: number, acc: number) => acc + val
    );
    return Math.round(averageRating / suggestedRatings.length);
  };
  const setterFa = ascents.length > 0 && ascents[0].user === user;
  return (
    <>
      <table className='problem-table box'>
        <tbody>
          {setterFa ? (
            <>
              <tr>
                <th>Set and FA by:</th>
                <td>{setBy}</td>
              </tr>
            </>
          ) : (
            <>
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
            </>
          )}

          {ascents.length === 0 && (
            <tr>
              <th>Suggested grade:</th>
              <td style={{ color: `${grades[grade].color}` }}>
                {grades[grade].grade}
              </td>
            </tr>
          )}

          <tr>
            <th>Rating:</th>
            <td>
              <StarRating rating={consensusRating()} />
            </td>
          </tr>
          {expand && (
            <>
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
            </>
          )}
        </tbody>
      </table>
      <div className='div-center'>
        <button
          onClick={() => toggleExpand(!expand)}
          className='btn background-fade'
          style={{
            color: '#05ab75',
            fontSize: '1.6rem',
            width: '100%'
          }}
        >
          <FontAwesomeIcon icon={expand ? faAngleUp : faAngleDown} />
        </button>
      </div>
    </>
  );
};
