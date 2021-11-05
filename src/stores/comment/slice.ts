import { Comment } from '../../models/Comment'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CommentState {
  // 編集・削除の対象のCommentエンティティ
  operatingComment: Comment | null
  // ボードのコメント一覧の現在のページ番号
  commentListCurrentPage: number
}

const initialState: CommentState = {
  operatingComment: null,
  commentListCurrentPage: 1,
}

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setOperatingComment: (state, action: PayloadAction<Comment>) => {
      state.operatingComment = action.payload
    },
    clearOperatingComment: (state) => {
      state.operatingComment = null
    },
    setCommentListCurrentPage: (state, action: PayloadAction<number>) => {
      state.commentListCurrentPage = action.payload < 1 ? 1 : action.payload
    },
    clearCommentListCurrentPage: (state) => {
      state.commentListCurrentPage = 1
    },
  },
})

export const { setOperatingComment, clearOperatingComment, setCommentListCurrentPage, clearCommentListCurrentPage } =
  commentSlice.actions
