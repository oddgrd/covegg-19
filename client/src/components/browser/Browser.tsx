import React, { useEffect, useLayoutEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getProblems, selectProblems, setScrollLocation } from './browserSlice';
import Spinner from '../layout/Spinner';
import { BrowserItem } from './BrowserItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSorting } from '../../hooks/useSorting';

export const Browser = () => {
  const dispatch = useAppDispatch();
  const { getSortColor, getSortIcon, handleSortGrade, handleSortRating } =
    useSorting();
  const status = useAppSelector((state) => state.browser.status);
  const error = useAppSelector((state) => state.browser.error);
  const scrollIdx = useAppSelector((state) => state.browser.scrollIdx);
  const problems = useAppSelector(selectProblems);
  const sortState = useAppSelector((state) => state.browser.sortState);
  const { grade, rating } = sortState;

  useEffect(() => {
    dispatch(getProblems());
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
        <div className='options'>
          <button
            onClick={handleSortGrade}
            className='btn-save'
            style={{
              color: getSortColor(grade),
              borderColor: getSortColor(grade)
            }}
          >
            Grade <FontAwesomeIcon icon={getSortIcon(grade)} />
          </button>
          <button
            onClick={handleSortRating}
            className='btn-save'
            style={{
              color: getSortColor(rating),
              borderColor: getSortColor(rating)
            }}
          >
            Rating <FontAwesomeIcon icon={getSortIcon(rating)} />
          </button>
        </div>

        {status === 'pending' ? (
          <Spinner />
        ) : status === 'resolved' ? (
          <>
            {problems.map((problem, idx) => (
              <BrowserItem {...problem} key={idx} />
            ))}
          </>
        ) : (
          `${error}`
        )}
      </div>
    </section>
  );
};
