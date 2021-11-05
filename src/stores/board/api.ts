import { defaultValidateStatus, poiyoApi } from '~/stores/api'
import {
  Board,
  BoardRequest,
  BoardResponse,
  Boards,
  BoardsQueryParams,
  BoardsResponse,
  buildBoard,
  buildBoards,
} from '~/models/Board'

export const boardApi = poiyoApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getBoard: builder.query<Board, string>({
      query: (boardId) => `/boards/${boardId}`,
      transformResponse: (response: BoardResponse) => buildBoard(response),
      providesTags: (result) => (result ? [{ type: 'Board', id: result.boardId }] : ['Board']),
    }),
    getBoards: builder.query<Boards, BoardsQueryParams>({
      query: (params) => ({
        url: '/boards',
        method: 'GET',
        params,
        validateStatus: defaultValidateStatus,
      }),
      transformResponse: (response: BoardsResponse) => buildBoards(response),
      providesTags: (result) => {
        if (result && result.items.length) {
          return result.items.map((board) => ({ type: 'Board', id: board.boardId }))
        }
        return ['Board']
      },
    }),
    postBoard: builder.mutation<Board, BoardRequest>({
      query: ({ title, body, ownerAccountId }) => ({
        url: '/boards',
        method: 'POST',
        body: {
          title,
          body,
          owner_account_id: ownerAccountId,
        },
        validateStatus: defaultValidateStatus,
      }),
      transformResponse: (response: BoardResponse) => buildBoard(response),
      invalidatesTags: ['Board'],
    }),
    patchBoard: builder.mutation<Board, BoardRequest>({
      query: ({ boardId, title, body }) => ({
        url: `/boards/${boardId}`,
        method: 'PATCH',
        body: {
          title,
          body,
        },
        validateStatus: defaultValidateStatus,
      }),
      transformResponse: (response: BoardResponse) => buildBoard(response),
      invalidatesTags: (result) => (result ? [{ type: 'Board', id: result.boardId }] : ['Board']),
    }),
    deleteBoard: builder.mutation<void, string>({
      query: (boardId) => ({
        url: `/boards/${boardId}`,
        method: 'DELETE',
        validateStatus: defaultValidateStatus,
      }),
      // レスポンス内容は使わないため、transformResponseは省略
      invalidatesTags: (result, error, arg) => [{ type: 'Board', id: arg }],
    }),
  }),
})

export const { useGetBoardQuery, usePostBoardMutation, usePatchBoardMutation, useDeleteBoardMutation } = boardApi
export const useGetBoardsLazyQuery = boardApi.endpoints.getBoards.useLazyQuery
