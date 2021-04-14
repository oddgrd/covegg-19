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

interface NewProblem {
  problem: Problem;

  loading: Boolean;
}

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
  loading: true
};

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    saveFormData: (state, action: PayloadAction<object>) => {
      console.log(action.payload);
      state.loading = false;
      state.problem = { ...state.problem, ...action.payload };
    },
    clearState: (state) => {
      state = initialState;
      return state;
    }
  }
});

export const { saveFormData, clearState } = editorSlice.actions;

export default editorSlice.reducer;
