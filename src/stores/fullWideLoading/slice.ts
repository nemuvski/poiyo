import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FullWideLoadingState {
  isActive: boolean;
}

const initialState: FullWideLoadingState = {
  isActive: true,
};

export const fullWideLoadingSlice = createSlice({
  name: 'fullWideLoading',
  initialState,
  reducers: {
    setFullWideLoading: (state, action: PayloadAction<boolean>) => {
      state.isActive = action.payload;
    },
  },
});

export const { setFullWideLoading } = fullWideLoadingSlice.actions;
