import { configureStore } from '@reduxjs/toolkit';
import { accountSlice } from './account/slice';
import { modalSlice } from './modal/slice';

export const store = configureStore({
  reducer: {
    modalReducer: modalSlice.reducer,
    accountReducer: accountSlice.reducer,
  },
  // 本番モードでのビルド以外では開発ツール有効
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
