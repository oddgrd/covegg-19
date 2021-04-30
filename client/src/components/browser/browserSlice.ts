import {
  createSlice,
  createAsyncThunk,
  SerializedError
} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import api from '../../utils/api';

export interface AscentIds {
  ascentId: string;
  problemId: string;
}
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
  error: string | SerializedError;
}

export const getProblems = createAsyncThunk<Array<Problem>>(
  'browser/getProblems',
  async () => {
    const res = await api.get('/problems');
    return res.data;
  }
);

export const getProblemById = createAsyncThunk<Problem, string>(
  'browser/getProblem',
  async (id) => {
    const res = await api.get(`/problems/${id}`);
    return res.data;
  }
);

export const deleteProblem = createAsyncThunk<string, string>(
  'browser/deleteProblem',
  async (id) => {
    await api.delete(`/problems/${id}`);
    return id;
  }
);

export const addAscent = createAsyncThunk<Ascent, string>(
  'browser/addAscent',
  async (id) => {
    const res = await api.post(`/problems/${id}`);
    return res.data;
  }
);

export const deleteAscent = createAsyncThunk<AscentIds, AscentIds>(
  'browser/deleteAscent',
  async (ids) => {
    await api.delete(`/problems/${ids.problemId}/${ids.ascentId}`);
    return ids;
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
    board: '',
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
      state.problems = action.payload;
      state.error = '';
      state.status = 'resolved';
    });
    builder.addCase(getProblems.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(getProblems.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.error.message || action.error;
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
      state.error = action.error.message || action.error;
    });

    builder.addCase(deleteProblem.fulfilled, (state, action) => {
      state.currentProblem = initialState.currentProblem;
      state.problems = state.problems.filter(
        (problem) => problem._id !== action.payload
      );
      state.error = '';
      state.status = 'resolved';
    });
    builder.addCase(deleteProblem.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(deleteProblem.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.error.message || action.error;
    });

    builder.addCase(deleteAscent.fulfilled, (state, action) => {
      state.currentProblem.ascents = state.currentProblem.ascents.filter(
        (ascent) => ascent._id !== action.payload.ascentId
      );
      state.problems = initialState.problems;
      state.error = '';
      state.status = 'resolved';
    });
    builder.addCase(deleteAscent.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(deleteAscent.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.error.message || action.error;
    });
  }
});

export const { clearState } = browserSlice.actions;
export const selectProblems = (state: RootState) =>
  state.browser.problems.map((problem) => {
    const { title, setBy, grade, date, rating, _id, user, ascents } = problem;
    return { title, setBy, grade, date, rating, _id, user, ascents };
  });
export default browserSlice.reducer;
