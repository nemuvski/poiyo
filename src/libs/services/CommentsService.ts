/**
 * ボードに関するサービス関数を定義.
 */

import CommentsApi from '../api/CommentsApi';
import { CommentRequest, Comment, Comments, CommentsQueryParams } from '../models/Comment';

/**
 * コメントを1件登録する.
 *
 * @param token トークン.
 * @param boardId コメントを投稿するボードID.
 * @param ownerAccountId コメントの所有者のアカウントID.
 * @param body コメントの本文.
 */
const create = (token: string, boardId: string, ownerAccountId: string, body: string): Promise<Comment> => {
  const commentRequest: CommentRequest = {
    commentId: null,
    boardId,
    ownerAccountId,
    body,
  };
  return CommentsApi.post(token, commentRequest).then((response) => {
    return new Comment(response.data);
  });
};

/**
 * コメントを取得する.
 *
 * @param token
 * @param boardId
 * @param page
 * @param numPerPage
 */
const get = (token: string, boardId: string, page: number, numPerPage = 50): Promise<Comments> => {
  const queryParams: CommentsQueryParams = {
    board_id: boardId,
    page: page,
    num_per_page: numPerPage,
  };
  return CommentsApi.get(token, queryParams).then((response) => {
    return new Comments(response.data);
  });
};

/**
 * コメントを1件削除する.
 *
 * @param token トークン.
 * @param boardId ボードID.
 * @param commentId コメントID.
 */
const remove = (token: string, boardId: string, commentId: string): Promise<void> => {
  return CommentsApi.remove(token, boardId, commentId).then((response) => {
    if (response.status == 204) {
      throw new Error('コメントが見つからなかったため、削除されませんでした。');
    }
  });
};

/**
 * コメントを1件更新する.
 *
 * @param token トークン.
 * @param comment コメントのオブジェクト.
 */
const update = (token: string, comment: Comment): Promise<Comment> => {
  const commentRequest: CommentRequest = {
    commentId: comment.commentId,
    boardId: comment.boardId,
    body: comment.body,
    ownerAccountId: comment.ownerAccountId,
  };
  return CommentsApi.patch(token, commentRequest).then((response) => {
    if (response.status == 204) {
      throw new Error('コメントが見つからなかったため、更新されませんでした。');
    }
    return new Comment(response.data);
  });
};

export default { create, get, remove, update };
