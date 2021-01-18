/**
 * 認証をして、アカウント情報を取得.
 */

import BoardApi from "../api/BoardApi";
import {Board, BoardRequest} from "../models/Board";

const create = (token: string, title: string, body: string, ownerAccountId: string): Promise<Board> => {
  const boardRequest: BoardRequest = {
    boardId: null,
    title,
    body,
    ownerAccountId,
  };
  return BoardApi.post(token, boardRequest)
    .then(response => {
      const board: Board = {
        boardId: response.data.board_id,
        title: response.data.title,
        body: response.data.body,
        ownerAccountId: response.data.owner_account_id,
        createdAt: response.data.created_at,
        updatedAt: response.data.updated_at,
      };
      return board;
    });
}

export default { create };
