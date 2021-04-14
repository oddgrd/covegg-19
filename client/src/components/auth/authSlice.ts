import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../../utils/api';

interface AuthState {
  isAuthenticated: boolean;
  user: object | null;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: ''
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loadUser: (state, action: PayloadAction<object>) => {
      state.isAuthenticated = true;
      state.isSuccess = true;
      state.user = action.payload;
    },
    clearState: (state) => {
      state.isAuthenticated = false;
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = false;
      state.user = null;
      return state;
    }
  }
});

export const { loadUser, clearState } = authSlice.actions;

export default authSlice.reducer;
