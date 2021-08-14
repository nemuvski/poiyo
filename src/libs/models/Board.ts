/**
 * ボードAPIレスポンス・リクエストデータ、処理で利用するモデル.
 */
import { NullTime } from './Time';

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
  updated_timestamp: NullTime;
}

export interface BoardsResponse {
  items: Array<BoardResponse>;
  current_page: number;
  next_page?: number;
}

export type BoardsQueryParams = {
  page: number;
  num_per_page: number;
  owner_account_id?: string;
  search?: string;
}

// ボード詳細ページへ遷移するときに渡すデータの型.
export interface BoardLocationState {
  board: Board;
}

// 処理で利用するモデル.
export class Board {
  boardId: string;
  title: string;
  body: string;
  ownerAccountId: string;
  createdTimestamp: string;
  updatedTimestamp: string | null;

  constructor(boardResponse: BoardResponse) {
    this.boardId = boardResponse.board_id;
    this.title = boardResponse.title;
    this.body = boardResponse.body;
    this.ownerAccountId = boardResponse.owner_account_id;
    this.createdTimestamp = boardResponse.created_timestamp;
    this.updatedTimestamp = null;
    if (boardResponse.updated_timestamp.Valid) {
      this.updatedTimestamp = boardResponse.updated_timestamp.Time;
    }
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
      this.nextPage = boardsResponse.next_page;
    }
  }
}

export const buildBoardQueryParams = (page: number, ownerAccountId?: string, search?: string, numPerPage = 50): BoardsQueryParams => ({
  page,
  num_per_page: numPerPage,
  owner_account_id: ownerAccountId,
  search,
});

export const buildBoard = (boardResponse: BoardResponse) => {
  const { board_id, title, body, owner_account_id, created_timestamp, updated_timestamp } = boardResponse;
  return {
    boardId: board_id,
    title,
    body,
    ownerAccountId: owner_account_id,
    createdTimestamp: created_timestamp,
    updatedTimestamp: (updated_timestamp && updated_timestamp.Valid) ? updated_timestamp.Time : null,
  };
}

export const buildBoards = (boardsResponse: BoardsResponse) => {
  const { items, current_page, next_page } = boardsResponse;
  return {
    items: items.map((data) => buildBoard(data)),
    currentPage: current_page,
    nextPage: next_page,
  };
};
