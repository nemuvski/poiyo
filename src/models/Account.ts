/**
 * アカウントに紐づく情報のモデル.
 */
import { AuthResponse } from '~/models/Auth'

export type Account = {
  id: string
  token: string
}
export const buildAccount = (authResponse: AuthResponse, token: string): Account => {
  const { account_id } = authResponse
  return {
    id: account_id,
    token,
  }
}
