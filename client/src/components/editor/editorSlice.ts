import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

interface Problem {
  title: string;
  grade: string;
  setBy: string;
  rules: string;
  board: string;
  rating: number;
  dataUrl: string;
  ascents?: [];
  date: string;
}

interface NewProblem {
  problem: Problem;
  status: string;
  error: object;
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
  status: 'idle',
  error: {}
};

export const saveProblem = createAsyncThunk(
  'editor/saveProblem',
  async (data: object, { rejectWithValue }) => {
    try {
      const res = await api.post('/problems', data);
      if (res.status === 200) {
        return res.data;
      } else {
        return rejectWithValue(res);
      }
    } catch (error) {
      console.log('Error', error.response.data);
      return rejectWithValue(error.response.data);
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
      state.error = {};
      return state;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(saveProblem.fulfilled, (state, action) => {
      state.status = 'resolved';
      state.problem = { ...state.problem, ...action.payload };
    });
    builder.addCase(saveProblem.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(saveProblem.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = { ...action };
    });
  }
});

export const { clearState } = editorSlice.actions;

export default editorSlice.reducer;
