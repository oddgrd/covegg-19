import { Problem } from '../components/browser/browserSlice';

export const compareGradeAscending = (a: Problem, b: Problem) => {
  if ((a.consensusGrade ?? a.grade) < (b.consensusGrade ?? b.grade)) {
    return -1;
  }
  if ((a.consensusGrade ?? a.grade) > (b.consensusGrade ?? b.grade)) {
    return 1;
  }
  return 0;
};

export const compareGradeDescending = (a: Problem, b: Problem) => {
  if ((a.consensusGrade ?? a.grade) < (b.consensusGrade ?? b.grade)) {
    return 1;
  }
  if ((a.consensusGrade ?? a.grade) > (b.consensusGrade ?? b.grade)) {
    return -1;
  }
  return 0;
};

export const compareRatingAscending = (a: Problem, b: Problem) => {
  if ((a.consensusRating ?? 0) < (b.consensusRating ?? 0)) {
    return -1;
  }
  if ((a.consensusRating ?? 0) > (b.consensusRating ?? 0)) {
    return 1;
  }
  return 0;
};

export const compareRatingDescending = (a: Problem, b: Problem) => {
  if ((a.consensusRating ?? 0) < (b.consensusRating ?? 0)) {
    return 1;
  }
  if ((a.consensusRating ?? 0) > (b.consensusRating ?? 0)) {
    return -1;
  }
  return 0;
};
