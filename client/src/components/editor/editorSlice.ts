import {
  createSlice,
  createAsyncThunk,
  SerializedError
} from '@reduxjs/toolkit';
import api from '../../utils/api';

interface Editor {
  status: string;
  error: string | SerializedError;
}

const initialState: Editor = {
  status: 'idle',
  error: ''
};

export const saveProblem = createAsyncThunk<object, object>(
  'editor/saveProblem',
  async (data) => {
    const res = await api.post('/problems', data);
    return res.data;
  }
);

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    clearState: (state) => {
      state.status = 'idle';
      state.error = '';
      return state;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(saveProblem.fulfilled, (state, action) => {
      state.status = 'resolved';
      state.error = '';
    });
    builder.addCase(saveProblem.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(saveProblem.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.error.message || action.error;
    });
  }
});

export const { clearState } = editorSlice.actions;

export default editorSlice.reducer;
