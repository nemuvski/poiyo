import { Comment } from '../../models/Comment';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CommentState {
  operatingComment: Comment | null;
}

const initialState: CommentState = {
  operatingComment: null,
};

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setOperatingComment: (state, action: PayloadAction<Comment>) => {
      state.operatingComment = action.payload;
    },
    clearOperatingComment: (state) => {
      state.operatingComment = null;
    },
  },
});

export const { setOperatingComment, clearOperatingComment } = commentSlice.actions;
