import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../../utils/api';

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  user: object | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  loading: true,
  user: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loadUser: (state, action: PayloadAction<object>) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    }
  }
});

export const { loadUser } = authSlice.actions;

export default authSlice.reducer;
