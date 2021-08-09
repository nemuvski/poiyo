import { configureStore } from '@reduxjs/toolkit';
import { accountSlice } from './account/slice';

export const store = configureStore({
  reducer: {
    accountReducer: accountSlice.reducer,
  },
  // 本番モードでのビルド以外では開発ツール有効
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
