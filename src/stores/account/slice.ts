import { Account } from '../../models/Account';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AccountState {
  account: Account | null;
}

const initialState: AccountState = {
  account: null,
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccount: (state, action: PayloadAction<Account>) => {
      state.account = action.payload;
    },
    clearAccount: (state) => {
      state.account = null;
    },
  },
});

export const { setAccount, clearAccount } = accountSlice.actions;
