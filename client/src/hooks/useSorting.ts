import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
  faSort,
  faSortUp,
  faSortDown
} from '@fortawesome/free-solid-svg-icons';
import {
  clearSortState,
  getProblems,
  sortGradeAscending,
  sortGradeDescending,
  sortRatingAscending,
  sortRatingDescending
} from '../components/browser/browserSlice';

export const useSorting = () => {
  const dispatch = useAppDispatch();
  const sortState = useAppSelector((state) => state.browser.sortState);
  const { grade, rating } = sortState;

  const handleSortGrade = () => {
    if (grade === '') {
      dispatch(sortGradeAscending());
    }
    if (grade === 'Ascending') {
      dispatch(sortGradeDescending());
    }
    if (grade === 'Descending') {
      dispatch(clearSortState());
      dispatch(getProblems());
    }
  };
  const handleSortRating = () => {
    if (rating === '') {
      dispatch(sortRatingAscending());
    }
    if (rating === 'Ascending') {
      dispatch(sortRatingDescending());
    }
    if (rating === 'Descending') {
      dispatch(clearSortState());
      dispatch(getProblems());
    }
  };

  const getSortIcon = (state: string) => {
    if (state === 'Ascending') {
      return faSortUp;
    }
    if (state === 'Descending') {
      return faSortDown;
    }
    return faSort;
  };
  const getSortColor = (state: string) => {
    if (state === 'Ascending') {
      return 'green';
    }
    if (state === 'Descending') {
      return 'red';
    }
  };
  return { handleSortGrade, handleSortRating, getSortIcon, getSortColor };
};
