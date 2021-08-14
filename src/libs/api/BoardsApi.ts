/**
 * ボード関連のAPIを実行.
 */

import Axios from '../common/Axios';
import { AxiosPromise } from 'axios';
import { BoardRequest, BoardResponse, BoardsQueryParams, BoardsResponse } from '../models/Board';

const path = '/api/v1/boards';

/**
 * ボード登録のAPIを実行する。
 *
 * @param token トークン.
 * @param requestBody リクエストボディ.
 */
const post = (token: string, requestBody: BoardRequest): AxiosPromise<BoardResponse> => {
  return Axios(token).post(path, {
    title: requestBody.title,
    body: requestBody.body,
    owner_account_id: requestBody.ownerAccountId,
  });
};

/**
 * ボード複数件取得のAPIを実行する。
 *
 * @param token トークン.
 * @param params パラメータ.
 */
const get = (token: string, params: BoardsQueryParams): AxiosPromise<BoardsResponse> => {
  return Axios(token).get(path, { params });
};

/**
 * ボード1件削除のAPIを実行する。
 *
 * @param token トークン.
 * @param boardId ボードID.
 */
const remove = (token: string, boardId: string): AxiosPromise<BoardResponse> => {
  return Axios(token).delete(`${path}/${boardId}`);
};

/**
 * ボード1件更新のAPIを実行する。
 *
 * @param token トークン.
 * @param requestBody リクエストボディ.
 */
const patch = (token: string, requestBody: BoardRequest): AxiosPromise<BoardResponse> => {
  return Axios(token).patch(`${path}/${requestBody.boardId}`, {
    title: requestBody.title,
    body: requestBody.body,
  });
};

export default { post, get, remove, patch };
