import { configureStore } from '@reduxjs/toolkit';
import editorReducer from '../components/editor/editorSlice';
import authReducer from '../components/auth/authSlice';

const store = configureStore({
  reducer: {
    editor: editorReducer,
    auth: authReducer
  }
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
