/**
 * ボードAPIレスポンス・リクエストデータ、処理で利用するモデル.
 */
import { NullTime } from './Time';

export type BoardRequest = {
  boardId: string | null;
  title: string;
  body: string;
  ownerAccountId: string;
};
export const buildBoardRequest = (
  title: string,
  body: string,
  ownerAccountId: string,
  boardId?: string
): BoardRequest => ({
  boardId: boardId ?? null,
  title,
  body,
  ownerAccountId,
});

export type BoardResponse = {
  board_id: string;
  title: string;
  body: string;
  owner_account_id: string;
  created_timestamp: string;
  updated_timestamp: NullTime;
};

export type BoardsResponse = {
  items: Array<BoardResponse>;
  current_page: number;
  next_page?: number;
};

export type BoardsQueryParams = {
  page: number;
  num_per_page: number;
  owner_account_id?: string;
  search?: string;
};
export const buildBoardQueryParams = (
  page: number,
  ownerAccountId?: string,
  search?: string,
  numPerPage = 50
): BoardsQueryParams => ({
  page,
  num_per_page: numPerPage,
  owner_account_id: ownerAccountId,
  search,
});

export type Board = {
  boardId: string;
  title: string;
  body: string;
  ownerAccountId: string;
  createdTimestamp: string;
  updatedTimestamp: string | null;
};
export const buildBoard = (boardResponse: BoardResponse): Board => {
  const { board_id, title, body, owner_account_id, created_timestamp, updated_timestamp } = boardResponse;
  return {
    boardId: board_id,
    title,
    body,
    ownerAccountId: owner_account_id,
    createdTimestamp: created_timestamp,
    updatedTimestamp: updated_timestamp && updated_timestamp.Valid ? updated_timestamp.Time : null,
  };
};

export type Boards = {
  items: Array<Board>;
  currentPage: number;
  nextPage?: number;
};
export const buildBoards = (boardsResponse: BoardsResponse): Boards => {
  const { items, current_page, next_page } = boardsResponse;
  return {
    items: items.map((data) => buildBoard(data)),
    currentPage: current_page,
    nextPage: next_page,
  };
};

// ボード詳細ページへ遷移するときに渡すデータの型.
export type BoardLocationState = {
  board: Board;
};
