/**
 * ボードに関するサービス関数を定義.
 */

import BoardsApi from '../api/BoardsApi';
import { Board, BoardRequest, Boards, BoardsQueryParams } from '../models/Board';

/**
 * ボードを1件登録する.
 *
 * @param token トークン.
 * @param title 登録するボードのタイトル.
 * @param body 登録するボードの本文.
 * @param ownerAccountId 登録するボードの所有者のアカウントID.
 */
const create = (token: string, title: string, body: string, ownerAccountId: string): Promise<Board> => {
  const boardRequest: BoardRequest = {
    boardId: null,
    title,
    body,
    ownerAccountId,
  };
  return BoardsApi.post(token, boardRequest).then((response) => {
    return new Board(response.data);
  });
};

/**
 * ボードをタイトルについてキーワードで絞り込んで取得する.
 *
 * @param token トークン.
 * @param keyword タイトルのキーワード.
 * @param page ページ番号.
 * @param numPerPage 1ページの件数.
 */
const getByKeyword = (token: string, keyword: string, page: number, numPerPage = 50): Promise<Boards> => {
  const queryParams: BoardsQueryParams = {
    page: page,
    num_per_page: numPerPage,
    search: keyword,
  };
  return BoardsApi.get(token, queryParams).then((response) => {
    return new Boards(response.data);
  });
};

/**
 * ボードをアカウントIDについて絞り込んで取得する.
 *
 * @param token トークン.
 * @param accountId アカウントID.
 * @param page ページ番号.
 * @param numPerPage 1ページの件数.
 */
const getByAccountId = (token: string, accountId: string, page: number, numPerPage = 50): Promise<Boards> => {
  const queryParams: BoardsQueryParams = {
    page: page,
    num_per_page: numPerPage,
    owner_account_id: accountId,
  };
  return BoardsApi.get(token, queryParams).then((response) => {
    return new Boards(response.data);
  });
};

/**
 * ボードを取得する.
 *
 * @param token トークン.
 * @param keyword キーワード.
 * @param accountId アカウントID.
 * @param page ページ番号.
 * @param numPerPage 1ページの件数.
 */
const get = (
  token: string,
  keyword: string | null | undefined,
  accountId: string | null | undefined,
  page: number,
  numPerPage = 50
): Promise<Boards> => {
  const queryParams: BoardsQueryParams = {
    page: page,
    num_per_page: numPerPage,
  };

  if (keyword) {
    queryParams.search = keyword;
  }
  if (accountId) {
    queryParams.owner_account_id = accountId;
  }

  return BoardsApi.get(token, queryParams).then((response) => {
    return new Boards(response.data);
  });
};

/**
 * ボードを1件削除する.
 *
 * @param token トークン.
 * @param boardId ボードID.
 */
const remove = (token: string, boardId: string): Promise<void> => {
  return BoardsApi.remove(token, boardId).then((response) => {
    if (response.status == 204) {
      throw new Error('ボードが見つからなかったため、削除されませんでした。');
    }
  });
};

/**
 * ボードを1件更新する.
 *
 * @param token トークン.
 * @param board ボードのオブジェクト.
 */
const update = (token: string, board: Board): Promise<Board> => {
  const boardRequest: BoardRequest = {
    boardId: board.boardId,
    title: board.title,
    body: board.body,
    ownerAccountId: board.ownerAccountId,
  };
  return BoardsApi.patch(token, boardRequest).then((response) => {
    if (response.status == 204) {
      throw new Error('ボードが見つからなかったため、更新されませんでした。');
    }
    return new Board(response.data);
  });
};

export default { create, getByKeyword, getByAccountId, get, remove, update };
