import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getProblems, clearState } from './browserSlice';
import Spinner from '../layout/Spinner';
import { BrowserItem } from './BrowserItem';
export const Browser = () => {
  const dispatch = useAppDispatch();
  const problems = useAppSelector((state) => state.browser.problems);
  const status = useAppSelector((state) => state.browser.status);
  const error = useAppSelector((state) => state.browser.error);

  useEffect(() => {
    dispatch(getProblems());
    return () => {
      dispatch(clearState());
    };
  }, [dispatch]);
  return (
    <>
      <div>
        <h2>Browse Problems</h2>
        {status === 'pending' ? (
          <Spinner />
        ) : status === 'resolved' ? (
          <table>
            <thead>
              <tr>
                <th>Title:</th>
                <th>Set By:</th>
                <th>Grade:</th>
                <th>Date:</th>
              </tr>
            </thead>
            <tbody>
              {problems.map((problem, idx) => (
                <BrowserItem problem={problem} key={idx} />
              ))}
            </tbody>
          </table>
        ) : (
          `${error}`
        )}
      </div>
    </>
  );
};
