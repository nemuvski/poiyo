/**
 * 認証をして、アカウント情報を取得.
 */

import BoardsApi from "../api/BoardsApi";
import {Board, BoardRequest, Boards, BoardsQueryParams} from "../models/Board";

/**
 * ボードを登録する.
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
  return BoardsApi.post(token, boardRequest)
    .then(response => {
      return new Board(response.data);
    });
};

/**
 * ボードを1件取得する.
 *
 * @param token トークン.
 * @param boardId ボードID.
 */
const getSingle = (token: string, boardId: string): Promise<Board | null> => {
  return BoardsApi.getSingle(token, boardId)
    .then(response => {
      // HTTPステータスコード 204 (NoContent)
      if (response.status == 204) {
        return null;
      }
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
  return BoardsApi.get(token, queryParams)
    .then(response => {
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
  return BoardsApi.get(token, queryParams)
    .then(response => {
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
const get = (token: string, keyword: string | null | undefined, accountId: string | null | undefined, page: number, numPerPage = 50): Promise<Boards> => {
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

  return BoardsApi.get(token, queryParams)
    .then(response => {
      return new Boards(response.data);
    });
};

export default { create, getSingle, getByKeyword, getByAccountId, get };
