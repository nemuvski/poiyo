/**
 * 認証をして、アカウント情報を取得.
 */

import BoardsApi from "../api/BoardsApi";
import {Board, BoardRequest} from "../models/Board";

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
}

/**
 * ボードを1件取得する.
 *
 * @param token トークン
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
}

export default { create, getSingle };
