import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import api from '../../utils/api';

export interface Ascent {
  user: string;
  _id: string;
  name: string;
  attempts: string;
  grade: number;
  rating: number;
  comment?: string;
  createdAt: string;
}

export interface Problem {
  title: string;
  grade: number;
  setBy: string;
  rules: string;
  board: string;
  rating: number;
  ascents: Array<Ascent>;
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

export const getProblems = createAsyncThunk('browser/getProblems', async () => {
  const res = await api.get('/problems');
  if (res.status !== 200) {
    throw Error(res.statusText);
  } else {
    return res.data;
  }
});
export const getProblemById = createAsyncThunk<Problem, string>(
  'browser/getProblemById',
  async (id) => {
    const res = await api.get(`/problems/${id}`);
    if (res.status !== 200) {
      throw Error(res.statusText);
    } else {
      return res.data;
    }
  }
);

const initialState: Browser = {
  status: 'idle',
  error: '',
  problems: [],
  currentProblem: {
    title: '',
    grade: 0,
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
  },
  extraReducers: (builder) => {
    builder.addCase(getProblems.fulfilled, (state, action) => {
      state.problems = [...state.problems, ...action.payload];
      state.error = '';
      state.status = 'resolved';
    });
    builder.addCase(getProblems.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(getProblems.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.error.message as string;
    });
    builder.addCase(getProblemById.fulfilled, (state, action) => {
      state.currentProblem = { ...state.currentProblem, ...action.payload };
      state.error = '';
      state.status = 'resolved';
    });
    builder.addCase(getProblemById.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(getProblemById.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.error.message as string;
    });
  }
});

export const { clearState } = browserSlice.actions;
export const selectProblems = (state: RootState) =>
  state.browser.problems.map((problem) => {
    const { title, setBy, grade, date, rating, _id } = problem;
    return { title, setBy, grade, date, rating, _id };
  });
export default browserSlice.reducer;
