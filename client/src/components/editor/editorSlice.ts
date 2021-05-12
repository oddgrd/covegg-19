import {
  createSlice,
  createAsyncThunk,
  SerializedError
} from '@reduxjs/toolkit';
import api from '../../utils/api';
import { setAlert } from '../alert/alertSlice';

interface Editor {
  status: string;
  error: string | SerializedError;
}
export interface ApiError {
  errorMessage: string;
}
const initialState: Editor = {
  status: 'idle',
  error: ''
};

export const saveProblem = createAsyncThunk<
  object,
  object,
  { rejectValue: ApiError }
>('editor/saveProblem', async (data, { dispatch, rejectWithValue }) => {
  try {
    const res = await api.post('/problems', data);
    dispatch(setAlert({ message: 'Problem Created', type: 'success' }));
    return res.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    if (error.response.status === 422) {
      dispatch(
        setAlert({ message: error.response.data.error, type: 'danger' })
      );
    } else {
      dispatch(
        setAlert({ message: error.response.statusText, type: 'danger' })
      );
    }
    return rejectWithValue({ errorMessage: error.response.statusText });
  }
});

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
    builder.addCase(saveProblem.fulfilled, (state) => {
      state.status = 'resolved';
      state.error = '';
    });
    builder.addCase(saveProblem.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(saveProblem.rejected, (state, action) => {
      state.status = 'rejected';
      if (action.payload) {
        state.error = action.payload.errorMessage;
      } else {
        state.error = action.error.message || action.error;
      }
    });
  }
});

export const { clearState } = editorSlice.actions;

export default editorSlice.reducer;
