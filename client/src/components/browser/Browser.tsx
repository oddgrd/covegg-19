import React, { useEffect, useLayoutEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  getProblems,
  clearState,
  selectProblems,
  setScrollLocation
} from './browserSlice';
import Spinner from '../layout/Spinner';
import { BrowserItem } from './BrowserItem';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Browser = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.browser.status);
  const error = useAppSelector((state) => state.browser.error);
  const scrollIdx = useAppSelector((state) => state.browser.scrollIdx);
  const problems = useAppSelector(selectProblems);

  useEffect(() => {
    dispatch(getProblems());
    return () => {
      dispatch(clearState());
    };
  }, [dispatch]);

  // Save scroll location after DOM mutations, return to it on "go back"
  useLayoutEffect(() => {
    return () => {
      dispatch(setScrollLocation(window.scrollY));
    };
  }, [dispatch]);
  useEffect(() => {
    if (status === 'resolved') {
      window.scroll({ top: scrollIdx, left: 0, behavior: 'smooth' });
    }
  }, [scrollIdx, status]);

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
