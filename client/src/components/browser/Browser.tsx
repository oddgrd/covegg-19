import React, { useEffect, useLayoutEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  getProblems,
  selectProblems,
  setScrollLocation,
  sortGradeAscending,
  sortGradeDescending,
  sortRatingAscending,
  sortRatingDescending,
  clearSortState
} from './browserSlice';
import Spinner from '../layout/Spinner';
import { BrowserItem } from './BrowserItem';
import {
  faSort,
  faSortUp,
  faSortDown
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Browser = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.browser.status);
  const error = useAppSelector((state) => state.browser.error);
  const scrollIdx = useAppSelector((state) => state.browser.scrollIdx);
  const problems = useAppSelector(selectProblems);
  const sortState = useAppSelector((state) => state.browser.sortState);
  const { grade, rating } = sortState;

  const handleSortGrade = () => {
    if (sortState.grade === '') {
      dispatch(sortGradeAscending());
    }
    if (sortState.grade === 'Ascending') {
      dispatch(sortGradeDescending());
    }
    if (sortState.grade === 'Descending') {
      dispatch(clearSortState());
      dispatch(getProblems());
    }
  };
  const handleSortRating = () => {
    if (sortState.rating === '') {
      dispatch(sortRatingAscending());
    }
    if (sortState.rating === 'Ascending') {
      dispatch(sortRatingDescending());
    }
    if (sortState.rating === 'Descending') {
      dispatch(clearSortState());
      dispatch(getProblems());
    }
  };

  const getSortIcon = (state: string) => {
    if (state === 'Ascending') {
      return <FontAwesomeIcon icon={faSortUp} />;
    }
    if (state === 'Descending') {
      return <FontAwesomeIcon icon={faSortDown} />;
    }
    return <FontAwesomeIcon icon={faSort} />;
  };

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
          <button onClick={handleSortGrade} className='btn-save'>
            Grade {getSortIcon(grade)}
          </button>
          <button onClick={handleSortRating} className='btn-save'>
            Rating {getSortIcon(rating)}
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
