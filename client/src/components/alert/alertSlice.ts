import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export interface Alert {
  message: string;
  type: string;
  id: string;
}

interface AlertState {
  alerts: Array<Alert>;
}

interface AlertPayload {
  message: string;
  type: string;
}
export const setAlert = createAsyncThunk<void, AlertPayload>(
  'alert/setAlert',
  async (alert, { dispatch }) => {
    const id = uuidv4();
    const newAlert = { ...alert, id };
    dispatch(addAlert(newAlert));
    const remove = async () =>
      setTimeout(() => dispatch(removeAlert(id)), 5000);
    await remove();
  }
);

const initialState: AlertState = {
  alerts: []
};
export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    addAlert: (state, action: PayloadAction<Alert>) => {
      state.alerts = [...state.alerts, action.payload];
    },
    removeAlert: (state, action: PayloadAction<string>) => {
      state.alerts = state.alerts.filter(
        (alert) => alert.id !== action.payload
      );
    }
  }
});

export const { addAlert, removeAlert } = alertSlice.actions;

export default alertSlice.reducer;
