import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { accountSlice } from './account/slice';
import { modalSlice } from './modal/slice';
import { boardApi } from './board/api';
import { fullWideLoadingSlice } from './fullWideLoading/slice';
import { accountApi } from './account/api';

export const store = configureStore({
  reducer: {
    fullWideLoadingReducer: fullWideLoadingSlice.reducer,
    modalReducer: modalSlice.reducer,
    accountReducer: accountSlice.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
    [boardApi.reducerPath]: boardApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(boardApi.middleware),
  // 本番モードでのビルド以外では開発ツール有効
  devTools: process.env.NODE_ENV !== 'production',
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
