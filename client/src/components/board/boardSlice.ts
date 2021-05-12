import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  SerializedError
} from '@reduxjs/toolkit';
import api from '../../utils/api';
import { setAlert } from '../alert/alertSlice';
import { ApiError } from '../editor/editorSlice';

export interface Board {
  imageUrl: string;
  boardVersion: string;
  _id: string;
  date: string;
}

interface BoardState {
  boards: Array<Board>;
  status: string;
  error: string | SerializedError;
}

const initialState: BoardState = {
  boards: [],
  status: 'idle',
  error: ''
};

export const uploadBoard = createAsyncThunk<
  Board,
  FormData,
  { rejectValue: ApiError }
>('boards/uploadBoard', async (formData, { dispatch, rejectWithValue }) => {
  try {
    const upload = await api.post('/boards/upload', formData);
    const { boardVersion, imageUrl } = upload.data;
    const boardFields = { imageUrl, boardVersion };
    const res = await api.post('/boards', boardFields);
    dispatch(setAlert({ message: 'Board Uploaded', type: 'success' }));
    return res.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    dispatch(setAlert({ message: error.response.statusText, type: 'danger' }));
    return rejectWithValue({ errorMessage: error.response.statusText });
  }
});

export const getBoard = createAsyncThunk<Board, string>(
  'boards/getBoard',
  async (id) => {
    const res = await api.get(`/boards/${id}`);
    return res.data;
  }
);

export const getAllBoards = createAsyncThunk<Array<Board>>(
  'boards/getAllBoards',
  async () => {
    const res = await api.get(`/boards`);
    return res.data;
  }
);

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    clearState: (state) => {
      state.boards = [];
      state.status = 'idle';
      state.error = '';
      return state;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      uploadBoard.fulfilled,
      (state, action: PayloadAction<Board>) => {
        state.boards = [...state.boards, action.payload];
        state.status = 'resolved';
      }
    );
    builder.addCase(uploadBoard.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(uploadBoard.rejected, (state, action) => {
      state.status = 'rejected';
      if (action.payload) {
        state.error = action.payload.errorMessage;
      } else {
        state.error = action.error.message || action.error;
      }
    });

    builder.addCase(
      getAllBoards.fulfilled,
      (state, action: PayloadAction<Array<Board>>) => {
        state.boards = action.payload;
        state.status = 'resolved';
      }
    );
    builder.addCase(getAllBoards.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(getAllBoards.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.error.message || action.error;
    });
  }
});

export const { clearState } = boardSlice.actions;

export default boardSlice.reducer;
