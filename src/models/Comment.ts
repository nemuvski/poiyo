/**
 * コメントAPIレスポンス・リクエストデータ、処理で利用するモデル.
 */
import { NullTime } from './Time';

export type CommentRequest = {
  commentId: string | null;
  boardId: string;
  ownerAccountId: string;
  body: string;
};
export const buildCommentRequest = (
  boardId: string,
  ownerAccountId: string,
  body: string,
  commentId?: string
): CommentRequest => ({
  commentId: commentId ?? null,
  boardId,
  ownerAccountId,
  body,
});

export type CommentResponse = {
  comment_id: string;
  board_id: string;
  owner_account_id: string;
  body: string;
  created_timestamp: string;
  updated_timestamp: NullTime;
};

export type CommentsResponse = {
  items: Array<CommentResponse>;
  current_page: number;
  next_page?: number;
};

export type CommentsQueryParams = {
  page: number;
  num_per_page: number;
  board_id: string;
};
export const buildCommentsQueryParams = (page: number, boardId: string, numPerPage = 50): CommentsQueryParams => ({
  page,
  board_id: boardId,
  num_per_page: numPerPage,
});

export type Comment = {
  commentId: string;
  boardId: string;
  ownerAccountId: string;
  body: string;
  createdTimestamp: string;
  updatedTimestamp: string | null;
};
export const buildComment = (commentResponse: CommentResponse): Comment => {
  const { comment_id, body, board_id, owner_account_id, created_timestamp, updated_timestamp } = commentResponse;
  return {
    commentId: comment_id,
    body,
    boardId: board_id,
    ownerAccountId: owner_account_id,
    createdTimestamp: created_timestamp,
    updatedTimestamp: updated_timestamp && updated_timestamp.Valid ? updated_timestamp.Time : null,
  };
};

export type Comments = {
  items: Array<Comment>;
  currentPage: number;
  nextPage?: number;
};
export const buildComments = (commentsResponse: CommentsResponse): Comments => {
  const { items, current_page, next_page } = commentsResponse;
  return {
    items: items.map((data) => buildComment(data)),
    currentPage: current_page,
    nextPage: next_page,
  };
};
