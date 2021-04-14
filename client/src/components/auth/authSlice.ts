import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  name: string;
  email: string;
  googleId: string;
  _id: string;
  date: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
}

const initialState: AuthState = {
  user: {
    name: '',
    email: '',
    googleId: '',
    _id: '',
    date: ''
  },
  isAuthenticated: false,
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
      state.user = { ...state.user, ...action.payload };
    },
    clearState: (state) => {
      state = initialState;
      return state;
    }
  }
});

export const { loadUser, clearState } = authSlice.actions;

export default authSlice.reducer;
