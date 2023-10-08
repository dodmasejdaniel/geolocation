import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import geoLocationReducer from '../features/geoLocation/geoLocationSlice';

export const store = configureStore({
  reducer: {
    geoLocation: geoLocationReducer,
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
