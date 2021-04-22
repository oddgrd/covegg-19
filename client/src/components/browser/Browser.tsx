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
      <div className='browser'>
        <h2
          style={{ textAlign: 'center', padding: '1.5rem', color: '#05ab75' }}
        >
          Browse Problems
        </h2>
        {status === 'pending' ? (
          <Spinner />
        ) : status === 'resolved' ? (
          <>
            {problems.map((problem, idx) => (
              <BrowserItem problem={problem} key={idx} />
            ))}
          </>
        ) : (
          `${error}`
        )}
      </div>
    </section>
  );
};
