import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import orderbookReducer from 'KrakenFutures/src/reducers/orderbookReducer';

export const store = configureStore({
  reducer: {
    orderbook: orderbookReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
