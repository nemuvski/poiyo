/**
 * 認証APIレスポンス・リクエストデータのモデル.
 */

// リクエスト.
export type AuthRequest = {
  serviceType: string
  serviceId: string
  email: string | null
  // Firebase Authenticationで発行したトークン（JWT）
  token: string
}
export const buildAuthRequest = (
  token: string,
  email: string | null,
  serviceId: string,
  serviceType = 'ggl'
): AuthRequest => {
  return {
    serviceType,
    serviceId,
    email,
    token,
  }
}

// レスポンス.
export type AuthResponse = {
  account_id: string
  service_type: string
  service_id: string
  email: string
  created_timestamp: string
}
