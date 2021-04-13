import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

interface EditorState {
  problem: string;
  formData: object;
}

const initialState: EditorState = {
  problem: '',
  formData: {
    name: '',
    grade: '',
    setby: '',
    firstascent: '',
    attempts: 1,
    rules: '',
    rating: 0,
    board: 0.1,
    date: ''
  }
};

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    saveFormData: (state, action: PayloadAction<object>) => {
      state.formData = action.payload;
    },
    saveProblem: (state, action: PayloadAction<string>) => {
      state.problem = action.payload;
    }
  }
});

export const { saveFormData, saveProblem } = editorSlice.actions;

export default editorSlice.reducer;
