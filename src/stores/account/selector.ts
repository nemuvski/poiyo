import { RootState } from '../store';
import { Account } from '../../libs/models/Account';

export const selectAccount = (state: RootState): Account | null => state.accountReducer.account;
