import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

interface Board {
  boardVersion: string;
  _id: string;
  date: string;
}

interface BoardState {
  currentBoard: Board;
  boards: Array<Board>;
  status: string;
  error: string;
}

const initialState: BoardState = {
  currentBoard: {
    boardVersion: '',
    _id: '',
    date: ''
  },
  boards: [],
  status: 'idle',
  error: ''
};

export const uploadBoard = createAsyncThunk<Board, FormData>(
  'boards/uploadBoard',
  async (formData) => {
    const upload = await api.post('/boards/upload', formData);
    const { boardVersion, imageUrl } = upload.data;
    const boardFields = { imageUrl, boardVersion };
    const res = await api.post('/boards', boardFields);
    return res.data;
  }
);

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    clearState: (state) => {
      state.currentBoard = initialState.currentBoard;
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
        state.currentBoard = action.payload;
        state.boards = [...state.boards, action.payload];
        state.status = 'resolved';
      }
    );
    builder.addCase(uploadBoard.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(
      uploadBoard.rejected,
      (state, action: PayloadAction<any>) => {
        state.status = 'rejected';
        if (action.payload) {
          state.error = action.payload.errorMessage;
        } else {
          state.error = 'Image upload failed';
        }
      }
    );
  }
});

export const { clearState } = boardSlice.actions;

export default boardSlice.reducer;
