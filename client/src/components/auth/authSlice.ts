import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  SerializedError
} from '@reduxjs/toolkit';
import api from '../../utils/api';

interface User {
  name: string;
  email: string;
  googleId: string;
  avatar: string;
  _id: string;
  date: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User;
  status: string;
  error: string | SerializedError;
}

const initialState: AuthState = {
  user: {
    name: '',
    email: '',
    googleId: '',
    avatar: '',
    _id: '',
    date: ''
  },
  isAuthenticated: false,
  status: 'idle',
  error: ''
};

export const loadUser = createAsyncThunk('auth/loadUser', async () => {
  const res = await api.get('/auth');
  return res.data;
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await api.get('/auth/logout');
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearState: (state) => {
      state.user = initialState.user;
      state.isAuthenticated = false;
      state.status = 'idle';
      state.error = '';
      return state;
    },
    login: () => {
      window.open('https://covegg19.com/api/auth/google', '_self');
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      loadUser.fulfilled,
      (state, action: PayloadAction<object>) => {
        state.user = { ...state.user, ...action.payload };
        state.isAuthenticated = true;
        state.status = 'resolved';
      }
    );
    builder.addCase(loadUser.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(loadUser.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.error.message || action.error;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.user = initialState.user;
      state.isAuthenticated = false;
      state.status = 'idle';
      state.error = '';
    });
  }
});

export const { clearState, login } = authSlice.actions;

export default authSlice.reducer;
