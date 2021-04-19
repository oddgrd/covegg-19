import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

interface Problem {
  title: string;
  grade: number;
  setBy: string;
  rules: string;
  board: string;
  rating: number;
  dataUrl: string;
  ascents?: [];
  date: string;
  _id: string;
  user: string;
}

interface NewProblem {
  problem: Problem;
  status: string;
  error: string;
}

// interface Data {
//   title: string;
//   grade: string;
//   setBy: string;
//   rules: string;
//   rating: number;
//   board: string;
//   date: string;
//   dataUrl: string;
// }

const initialState: NewProblem = {
  status: 'idle',
  error: '',
  problem: {
    title: '',
    grade: 0,
    setBy: '',
    rules: '',
    board: '0.1',
    rating: 0,
    ascents: [],
    _id: '',
    user: '',
    date: '',
    dataUrl: ''
  }
};

export const saveProblem = createAsyncThunk<object, object>(
  'editor/saveProblem',
  async (data) => {
    const res = await api.post('/problems', data);
    if (res.status !== 200) {
      throw Error(res.statusText);
    } else {
      return res.data;
    }
  }
);

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    clearState: (state) => {
      state.problem = initialState.problem;
      state.status = 'idle';
      state.error = '';
      return state;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(saveProblem.fulfilled, (state, action) => {
      state.status = 'resolved';
      state.error = '';
      state.problem = { ...state.problem, ...action.payload };
    });
    builder.addCase(saveProblem.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(saveProblem.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.error.message as string;
    });
  }
});

export const { clearState } = editorSlice.actions;

export default editorSlice.reducer;
