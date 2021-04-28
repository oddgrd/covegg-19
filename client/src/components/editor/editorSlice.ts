import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

interface Ascent {
  user: string;
  _id: string;
  name: string;
  attempts: string;
  grade: number;
  rating: number;
  comment?: string;
}

interface Problem {
  title: string;
  grade: number;
  setBy: string;
  rules: string;
  board: string;
  rating: number;
  dataUrl: string;
  ascents: Array<Ascent>;
  date: string;
  _id: string;
  user: string;
}

interface Editor {
  newProblem: Problem;
  status: string;
  error: string;
}

const initialState: Editor = {
  status: 'idle',
  error: '',
  newProblem: {
    title: '',
    grade: 0,
    setBy: '',
    rules: '',
    board: '',
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
      state.newProblem = initialState.newProblem;
      state.status = 'idle';
      state.error = '';
      return state;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(saveProblem.fulfilled, (state, action) => {
      state.status = 'resolved';
      state.error = '';
      state.newProblem = { ...state.newProblem, ...action.payload };
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
