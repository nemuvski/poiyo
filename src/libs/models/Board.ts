/**
 * 認証APIレスポンス・リクエストデータのモデル.
 */

// POSTリクエスト.
export interface BoardRequest {
  // NOTE: 新規作成の場合はboardIdがないため、nullを許容.
  boardId: string | null;
  title: string;
  body: string;
  ownerAccountId: string;
}

export interface BoardResponse {
  board_id: string;
  title: string;
  body: string;
  owner_account_id: string;
  created_at: string;
  updated_at: string | null;
}

// ボード詳細ページへ遷移するときに渡すデータの型.
export interface BoardLocationState {
  board: Board;
}

// 処理で利用するモデル.
export interface Board {
  boardId: string;
  title: string;
  body: string;
  ownerAccountId: string;
  createdAt: string;
  updatedAt: string | null;
}
