import {
  createSlice,
  createAsyncThunk,
  SerializedError
} from '@reduxjs/toolkit';
import { Coords } from '../../hooks/useCanvas';
import api from '../../utils/api';
import { setAlert } from '../alert/alertSlice';
import { Problem } from '../browser/browserSlice';

interface Editor {
  status: string;
  error: string | SerializedError;
}
export interface EditProps {
  title: string;
  rules: string;
  grade: number;
  problemId: string;
  coords?: Array<Coords> | undefined;
  ascentsLength?: number;
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

export const editProblem = createAsyncThunk<
  Problem,
  EditProps,
  { rejectValue: ApiError }
>('editor/editProblem', async (data, { dispatch, rejectWithValue }) => {
  const { rules, title, grade, problemId, coords } = data;
  const formData = { rules, title, grade, coords };
  try {
    const res = await api.put(`/problems/${problemId}`, formData);
    dispatch(setAlert({ message: 'Problem edited', type: 'success' }));
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

    builder.addCase(editProblem.fulfilled, (state) => {
      state.error = '';
      state.status = 'resolved';
    });
    builder.addCase(editProblem.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(editProblem.rejected, (state, action) => {
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
