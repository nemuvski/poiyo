/**
 * ボードAPIレスポンス・リクエストデータ、処理で利用するモデル.
 */

export interface BoardRequest {
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
  created_timestamp: string;
  updated_timestamp: string | null;
}

export interface BoardsResponse {
  items: Array<BoardResponse>;
  current_page: number;
  next_page?: number;
}

export interface BoardsQueryParams {
  page: number;
  num_per_page: number;
  owner_account_id?: string;
  search?: string;
}

// ボード詳細ページへ遷移するときに渡すデータの型.
export interface BoardLocationState {
  board: Board;
}

// ボード一覧コンポーネントへ渡すプロパティ.
export interface BoardListProps {
  keyword?: string;
  accountId?: string;
}

// 処理で利用するモデル.
export class Board {
  boardId: string;
  title: string;
  body: string;
  ownerAccountId: string;
  createdAt: string;
  updatedAt: string | null;

  constructor(boardResponse: BoardResponse) {
    this.boardId = boardResponse.board_id;
    this.title = boardResponse.title;
    this.body = boardResponse.body;
    this.ownerAccountId = boardResponse.owner_account_id;
    this.createdAt = boardResponse.created_timestamp;
    this.updatedAt = boardResponse.updated_timestamp;
  }
}
export class Boards {
  items: Array<Board>;
  currentPage: number;
  nextPage?: number;

  constructor(boardsResponse: BoardsResponse) {
    this.items = boardsResponse.items.map((singleResponseData) => {
      return new Board(singleResponseData);
    });
    this.currentPage = boardsResponse.current_page;
    if (boardsResponse.next_page) {
      this.nextPage = boardsResponse.next_page
    }
  }
}
