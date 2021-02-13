/**
 * コメント関連のAPIを実行.
 */

import Axios from '../common/Axios';
import {AxiosPromise} from 'axios';
import {CommentRequest, CommentResponse, CommentsResponse, CommentsQueryParams} from "../models/Comment";

const path = '/api/v1/comments';

/**
 * コメント登録のAPIを実行する。
 *
 * @param token トークン.
 * @param requestBody リクエストボディ.
 */
const post = (token: string, requestBody: CommentRequest): AxiosPromise<CommentResponse> => {
  return Axios(token).post(path, {
    'board_id': requestBody.boardId,
    'owner_account_id': requestBody.ownerAccountId,
    'body': requestBody.body,
  });
};

/**
 * コメント複数件取得のAPIを実行する。
 *
 * @param token トークン.
 * @param params パラメータ.
 */
const get = (token: string, params: CommentsQueryParams): AxiosPromise<CommentsResponse> => {
  return Axios(token).get(path, {params});
};

/**
 * コメント1件削除のAPIを実行する。
 *
 * @param token トークン.
 * @param boardId ボードID.
 * @param commentId コメントID.
 */
const remove = (token: string, boardId: string, commentId: string): AxiosPromise<CommentResponse> => {
  return Axios(token).delete(`${path}/${boardId}/${commentId}`);
};

/**
 * コメント1件更新のAPIを実行する。
 *
 * @param token トークン.
 * @param requestBody リクエストボディ.
 */
const patch = (token: string, requestBody: CommentRequest): AxiosPromise<CommentResponse> => {
  return Axios(token).patch(`${path}/${requestBody.commentId}`, {
    'board_id': requestBody.boardId,
    'body': requestBody.body,
  });
};

export default { post, get, remove, patch };
