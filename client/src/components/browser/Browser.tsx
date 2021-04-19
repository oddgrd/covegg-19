import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getProblems } from './browserSlice';
import grades from '../editor/grades';
import Spinner from '../layout/Spinner';
export const Browser = () => {
  const dispatch = useAppDispatch();
  const problems = useAppSelector((state) => state.browser.problems);
  const status = useAppSelector((state) => state.browser.status);
  useEffect(() => {
    dispatch(getProblems());
  }, [dispatch]);
  return (
    <>
      <div>
        <h2>Browse Problems</h2>
        {status === 'pending' ? (
          <Spinner />
        ) : status === 'resolved' ? (
          <table>
            <th>Title:</th>
            <th>Set By:</th>
            <th>Grade:</th>
            <th>Date:</th>
            {problems &&
              problems.map((problem) => (
                <tr>
                  <td>{problem.title}</td>
                  <td>{problem.setBy}</td>
                  <td>N/A</td>
                  <td>{problem.date}</td>
                </tr>
              ))}
          </table>
        ) : (
          '404 Problems Not Found'
        )}
      </div>
    </>
  );
};
