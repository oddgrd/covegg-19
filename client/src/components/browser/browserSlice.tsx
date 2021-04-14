import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Problem {
  title: string;
  grade: string;
  setBy: string;
  rules: string;
  board: string;
  rating: number;
  dataUrl: string;
  ascents: [];
  date: string;
}

interface Browser {
  problem: Problem;
  problems: Array<Problem>;
  loading: Boolean;
}

const initialState: Browser = {
  problem: {
    title: '',
    grade: '',
    setBy: '',
    rules: '',
    board: '0.1',
    rating: 0,
    ascents: [],
    date: '',
    dataUrl: ''
  },
  problems: [],
  loading: true
};

export const browserSlice = createSlice({
  name: 'browser',
  initialState,
  reducers: {
    clearState: (state) => {
      state = initialState;
      return state;
    }
  }
});

export const { clearState } = browserSlice.actions;

export default browserSlice.reducer;
