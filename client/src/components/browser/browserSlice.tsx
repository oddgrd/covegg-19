import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Problem {
  title: string;
  grade: string;
  setBy: string;
  rules: string;
  board: string;
  rating: number;
  ascents: [];
  date: string;
  _id: string;
  user: string;
  dataUrl: string;
}

interface Browser {
  currentProblem: Problem;
  problems: Array<Problem>;
  status: string;
  error: string;
}

const initialState: Browser = {
  status: 'idle',
  error: '',
  problems: [],
  currentProblem: {
    title: '',
    grade: '',
    setBy: '',
    rules: '',
    board: '0.1',
    rating: 0,
    _id: '',
    user: '',
    ascents: [],
    date: '',
    dataUrl: ''
  }
};

export const browserSlice = createSlice({
  name: 'browser',
  initialState,
  reducers: {
    clearState: (state) => {
      state.problems = [];
      state.status = 'idle';
      state.error = '';
      state.currentProblem = initialState.currentProblem;
      return state;
    }
  }
});

export const { clearState } = browserSlice.actions;

export default browserSlice.reducer;
