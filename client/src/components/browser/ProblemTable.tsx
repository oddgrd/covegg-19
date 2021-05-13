import React, { useState } from 'react';
import Moment from 'react-moment';
import grades from '../editor/grades';
import { StarRating } from '../layout/StarRating';
import { Ascent } from './browserSlice';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
interface Props {
  setBy: string;
  rules: string;
  board: string;
  date: string;
  grade: number;
  user: string;
  ascents: Ascent[];
}
export const ProblemTable = ({
  setBy,
  rules,
  board,
  date,
  ascents,
  grade,
  user
}: Props) => {
  const [expand, toggleExpand] = useState(false);
  const consensusRating = () => {
    const suggestedRatings = ascents.map((ascent: Ascent) => ascent.rating);
    const averageRating = suggestedRatings.reduce(
      (val: number, acc: number) => acc + val
    );
    return Math.round(averageRating / suggestedRatings.length);
  };
  const setterFa = ascents.length > 0 && ascents[0].user === user;
  return (
    <>
      <table className='problem-table '>
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
          <tr className='menu-animation-down'>
            <th>Rules:</th>
            <td>{rules}</td>
          </tr>
          {expand && (
            <>
              {ascents.length === 0 && (
                <tr className='menu-animation-down'>
                  <th>Suggested grade:</th>
                  <td style={{ color: `${grades[grade].color}` }}>
                    {grades[grade].grade}
                  </td>
                </tr>
              )}
              <tr className='menu-animation-down'>
                <th>Rating:</th>
                <td>
                  {ascents.length === 0 ? (
                    'Unrated'
                  ) : (
                    <StarRating rating={consensusRating()} />
                  )}
                </td>
              </tr>
              <tr className='menu-animation-down'>
                <th>Board:</th>
                <td>{board}</td>
              </tr>
              <tr className='menu-animation-down'>
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
          className='btn'
          style={{
            color: '#05ab75',
            fontSize: '1.6rem',
            width: '100%'
          }}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
        </button>
      </div>
    </>
  );
};
