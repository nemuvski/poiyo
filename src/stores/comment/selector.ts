import { RootState } from '../store';
import { Comment } from '../../models/Comment';

export const selectOperatingComment = (state: RootState): Comment | null => state.commentReducer.operatingComment;

export const selectCommentListCurrentPage = (state: RootState): number => state.commentReducer.commentListCurrentPage;
