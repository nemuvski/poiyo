import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { accountSlice } from '~/stores/account/slice'
import { modalSlice } from '~/stores/modal/slice'
import { fullWideLoadingSlice } from '~/stores/fullWideLoading/slice'
import { commentSlice } from '~/stores/comment/slice'
import { poiyoApi } from '~/stores/api'
import { accountApi } from '~/stores/account/api'
import { boardApi } from '~/stores/board/api'
import { commentApi } from '~/stores/comment/api'

export const store = configureStore({
  reducer: {
    fullWideLoadingReducer: fullWideLoadingSlice.reducer,
    modalReducer: modalSlice.reducer,
    accountReducer: accountSlice.reducer,
    commentReducer: commentSlice.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
    [boardApi.reducerPath]: boardApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(poiyoApi.middleware),
  // 本番モードでのビルド以外では開発ツール有効
  devTools: process.env.NODE_ENV !== 'production',
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
