import React, { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getProblems, clearState, selectProblems } from './browserSlice';
import Spinner from '../layout/Spinner';
import { BrowserItem } from './BrowserItem';

export const Browser = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.browser.status);
  const error = useAppSelector((state) => state.browser.error);
  const problems = useAppSelector(selectProblems);

  useEffect(() => {
    dispatch(getProblems());
    return () => {
      dispatch(clearState());
    };
  }, [dispatch]);

  return (
    <section className='container'>
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
    </section>
  );
};
