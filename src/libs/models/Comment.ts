/**
 * コメントAPIレスポンス・リクエストデータ、処理で利用するモデル.
 */
import {Board} from "./Board";

export interface CommentRequest {
  commentId: string | null;
  boardId: string;
  ownerAccountId: string;
  body: string;
}

export interface CommentResponse {
  comment_id: string;
  board_id: string;
  owner_account_id: string;
  body: string;
  created_at: string;
  update_at: string | null;
}

export interface CommentsResponse {
  items: Array<CommentResponse>;
  current_page: number;
  next_page?: number;
}

export interface CommentsQueryParams {
  page: number;
  num_per_page: number;
  board_id: string;
}

// ボード一覧コンポーネントへ渡すプロパティ.
export interface CommentListProps {
  board: Board;
}

// 処理で利用するモデル.
export class Comment {
  commentId: string;
  boardId: string;
  ownerAccountId: string;
  body: string;
  createdAt: string;
  updatedAt: string | null;

  constructor(commentResponse: CommentResponse) {
    this.commentId = commentResponse.comment_id;
    this.boardId = commentResponse.board_id;
    this.ownerAccountId = commentResponse.owner_account_id;
    this.body = commentResponse.body;
    this.createdAt = commentResponse.created_at;
    this.updatedAt = commentResponse.update_at;
  }
}
export class Comments {
  items: Array<Comment>;
  currentPage: number;
  nextPage?: number;

  constructor(commentsResponse: CommentsResponse) {
    this.items = commentsResponse.items.map((singleResponseData) => {
      return new Comment(singleResponseData);
    });
    this.currentPage = commentsResponse.current_page;
    if (commentsResponse.next_page) {
      this.nextPage = commentsResponse.next_page;
    }
  }
}
