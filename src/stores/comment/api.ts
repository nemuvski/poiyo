import { defaultValidateStatus, poiyoApi } from '../api'
import {
  buildComment,
  buildComments,
  CommentRequest,
  CommentResponse,
  Comment,
  Comments,
  CommentsQueryParams,
  CommentsResponse,
} from '../../models/Comment'

export const commentApi = poiyoApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getComments: builder.query<Comments, CommentsQueryParams>({
      query: (params) => ({
        url: '/comments',
        method: 'GET',
        params,
        validateStatus: defaultValidateStatus,
      }),
      transformResponse: (response: CommentsResponse) => buildComments(response),
      providesTags: (result) => {
        if (result && result.items.length) {
          return result.items.map(({ boardId, commentId }) => ({ type: 'Comment', id: `${boardId}:${commentId}` }))
        }
        return ['Comment']
      },
    }),
    postComment: builder.mutation<Comment, CommentRequest>({
      query: ({ boardId, body, ownerAccountId }) => ({
        url: '/comments',
        method: 'POST',
        body: {
          board_id: boardId,
          body,
          owner_account_id: ownerAccountId,
        },
        validateStatus: defaultValidateStatus,
      }),
      transformResponse: (response: CommentResponse) => buildComment(response),
      invalidatesTags: ['Comment'],
    }),
    patchComment: builder.mutation<Comment, CommentRequest>({
      query: ({ boardId, body, commentId }) => ({
        url: `/comments/${commentId}`,
        method: 'PATCH',
        body: {
          board_id: boardId,
          body,
        },
        validateStatus: defaultValidateStatus,
      }),
      transformResponse: (response: CommentResponse) => buildComment(response),
      invalidatesTags: (result) =>
        result ? [{ type: 'Comment', id: `${result.boardId}:${result.commentId}` }] : ['Comment'],
    }),
    deleteComment: builder.mutation<void, { boardId: string; commentId: string }>({
      query: ({ boardId, commentId }) => ({
        url: `/comments/${boardId}/${commentId}`,
        method: 'DELETE',
        validateStatus: defaultValidateStatus,
      }),
      // レスポンス内容は使わないため、transformResponseは省略
      invalidatesTags: (result, error, { boardId, commentId }) => [{ type: 'Comment', id: `${boardId}:${commentId}` }],
    }),
  }),
})

export const { usePostCommentMutation, usePatchCommentMutation, useDeleteCommentMutation } = commentApi
export const useGetCommentsLazyQuery = commentApi.endpoints.getComments.useLazyQuery
