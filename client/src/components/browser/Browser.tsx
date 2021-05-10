import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getProblems, clearState, selectProblems } from './browserSlice';
import Spinner from '../layout/Spinner';
import { BrowserItem } from './BrowserItem';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Browser = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.browser.status);
  const error = useAppSelector((state) => state.browser.error);
  const problems = useAppSelector(selectProblems);

  // Set timeout to ensure new problems are loaded after redirect
  useEffect(() => {
    setTimeout(() => dispatch(getProblems()), 50);
    return () => {
      dispatch(clearState());
    };
  }, [dispatch]);

  return (
    <section className='container'>
      <div className='browser'>
        <button
          onClick={() => dispatch(getProblems())}
          className='btn-save'
          style={{ maxWidth: '360px', margin: 'auto', fontSize: '1.7rem' }}
        >
          <FontAwesomeIcon icon={faSyncAlt} />
        </button>
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
