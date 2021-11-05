import { RootState } from '../store'
import { Account } from '../../models/Account'

export const selectAccount = (state: RootState): Account | null => state.accountReducer.account
