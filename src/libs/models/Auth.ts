/**
 * 認証APIレスポンス・リクエストデータのモデル.
 */

// リクエスト.
export interface AuthRequest {
  serviceType: string;
  serviceId: string;
  email: string | null;
}

// レスポンス.
export interface AuthResponse {
  account_id: string;
  service_type: string;
  service_id: string;
  email: string;
  created_at: string;
}
