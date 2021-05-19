import {
  createSlice,
  createAsyncThunk,
  SerializedError,
  PayloadAction
} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Coords } from '../../hooks/useCanvas';
import api from '../../utils/api';
import { setAlert } from '../alert/alertSlice';
import { Board } from '../board/boardSlice';
import { EditProps } from '../editor/EditorForm';
import { ApiError } from '../editor/editorSlice';
import { AscentData } from './AscentForm';

export interface AscentIds {
  ascentId: string;
  problemId: string;
}
export interface Ascent {
  user: string;
  _id: string;
  avatar: string;
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
  board: Board;
  ascents: Array<Ascent>;
  date: string;
  _id: string;
  user: string;
  coords: Array<Coords>;
}

interface Browser {
  currentProblem: Problem;
  problems: Array<Problem>;
  status: string;
  error: string | SerializedError;
  scrollIdx: number;
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
    const board = await api.get(`/boards/${res.data.board}`);
    return { ...res.data, board: board.data };
  }
);

export const editProblem = createAsyncThunk<
  Problem,
  EditProps,
  { rejectValue: ApiError }
>('browser/editProblem', async (data, { dispatch, rejectWithValue }) => {
  const { rules, title, grade, problemId } = data;
  const formData = { rules, title, grade };
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

export const deleteProblem = createAsyncThunk<
  string,
  string,
  { rejectValue: ApiError }
>('browser/deleteProblem', async (id, { dispatch, rejectWithValue }) => {
  try {
    await api.delete(`/problems/${id}`);
    dispatch(setAlert({ message: 'Problem Deleted', type: 'danger' }));
    return id;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    dispatch(setAlert({ message: error.response.statusText, type: 'danger' }));
    return rejectWithValue({ errorMessage: error.response.statusText });
  }
});

export const addAscent = createAsyncThunk<
  Problem,
  AscentData,
  { rejectValue: ApiError }
>('browser/addAscent', async (data, { dispatch, rejectWithValue }) => {
  const { attempts, grade, rating, comment, avatar } = data;
  const formData = { attempts, grade, rating, comment, avatar };
  try {
    const res = await api.post(`/problems/${data.problemId}`, formData);
    dispatch(setAlert({ message: 'Ascent added', type: 'success' }));
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

export const editAscent = createAsyncThunk<
  Problem,
  AscentData,
  { rejectValue: ApiError }
>('browser/editAscent', async (data, { dispatch, rejectWithValue }) => {
  const { attempts, grade, rating, comment, avatar, problemId, ascentId } =
    data;
  const formData = { attempts, grade, rating, comment, avatar };
  try {
    const res = await api.put(`/problems/${problemId}/${ascentId}`, formData);
    dispatch(setAlert({ message: 'Ascent edited', type: 'success' }));
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

export const deleteAscent = createAsyncThunk<
  AscentIds,
  AscentIds,
  { rejectValue: ApiError }
>('browser/deleteAscent', async (ids, { dispatch, rejectWithValue }) => {
  try {
    await api.delete(`/problems/${ids.problemId}/${ids.ascentId}`);
    dispatch(setAlert({ message: 'Ascent Deleted', type: 'danger' }));
    return ids;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    dispatch(setAlert({ message: error.response.statusText, type: 'danger' }));
    return rejectWithValue({ errorMessage: error.response.statusText });
  }
});

const initialState: Browser = {
  status: 'idle',
  error: '',
  problems: [],
  currentProblem: {
    title: '',
    grade: 0,
    setBy: '',
    rules: '',
    board: {
      imageUrl: '',
      boardVersion: '',
      _id: '',
      date: ''
    },
    _id: '',
    user: '',
    ascents: [],
    coords: [],
    date: ''
  },
  scrollIdx: 0
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
    },
    setScrollLocation: (state, action: PayloadAction<number>) => {
      state.scrollIdx = action.payload;
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
      state.currentProblem = action.payload;
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

    builder.addCase(editProblem.fulfilled, (state, action) => {
      state.currentProblem = action.payload;
      state.problems = initialState.problems;
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
      if (action.payload) {
        state.error = action.payload.errorMessage;
      } else {
        state.error = action.error.message || action.error;
      }
    });

    builder.addCase(addAscent.fulfilled, (state, action) => {
      state.currentProblem.ascents = action.payload.ascents;
      state.problems = initialState.problems;
      state.error = '';
      state.status = 'resolved';
    });
    builder.addCase(addAscent.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(addAscent.rejected, (state, action) => {
      state.status = 'rejected';
      if (action.payload) {
        state.error = action.payload.errorMessage;
      } else {
        state.error = action.error.message || action.error;
      }
    });

    builder.addCase(editAscent.fulfilled, (state, action) => {
      state.currentProblem.ascents = action.payload.ascents;
      state.problems = initialState.problems;
      state.error = '';
      state.status = 'resolved';
    });
    builder.addCase(editAscent.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(editAscent.rejected, (state, action) => {
      state.status = 'rejected';
      if (action.payload) {
        state.error = action.payload.errorMessage;
      } else {
        state.error = action.error.message || action.error;
      }
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
      if (action.payload) {
        state.error = action.payload.errorMessage;
      } else {
        state.error = action.error.message || action.error;
      }
    });
  }
});

export const { clearState, setScrollLocation } = browserSlice.actions;
export const selectProblems = (state: RootState) =>
  state.browser.problems.map((problem) => {
    const { title, setBy, grade, date, _id, user, ascents, coords } = problem;
    return { title, setBy, grade, date, _id, user, ascents, coords };
  });
export default browserSlice.reducer;
