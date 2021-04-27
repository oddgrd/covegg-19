import { configureStore } from '@reduxjs/toolkit';
import editorReducer from '../components/editor/editorSlice';
import authReducer from '../components/auth/authSlice';
import browserReducer from '../components/browser/browserSlice';
import boardSlice from '../components/board/boardSlice';

const store = configureStore({
  reducer: {
    editor: editorReducer,
    auth: authReducer,
    browser: browserReducer,
    board: boardSlice
  }
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
