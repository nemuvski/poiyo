import { RootState } from '~/stores/store'
import { Account } from '~/models/Account'

export const selectAccount = (state: RootState): Account | null => state.accountReducer.account
