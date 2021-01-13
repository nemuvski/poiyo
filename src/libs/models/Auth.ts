/**
 * 認証APIレスポンスデータのモデル.
 */

export interface Auth {
  account_id: string;
  service_type: string;
  service_id: string;
  email: string;
  created_at: string;
}
