import { poiyoApi } from '../api';
import {
  Board,
  BoardRequest,
  BoardResponse,
  Boards,
  BoardsQueryParams,
  BoardsResponse,
  buildBoard,
  buildBoards,
} from '../../libs/models/Board';

export const boardApi = poiyoApi.injectEndpoints({
  endpoints: (builder) => ({
    getBoard: builder.query<Board, string>({
      query: (boardId) => `/boards/${boardId}`,
      transformResponse: (response: BoardResponse) => buildBoard(response),
    }),
    getBoards: builder.mutation<Boards, BoardsQueryParams>({
      query: ({ owner_account_id, search, page, num_per_page }) => ({
        url: '/boards',
        method: 'GET',
        params: { owner_account_id, search, page, num_per_page },
      }),
      transformResponse: (response: BoardsResponse) => buildBoards(response),
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
      }),
      transformResponse: (response: BoardResponse) => buildBoard(response),
    }),
    patchBoard: builder.mutation<Board, BoardRequest>({
      query: ({ boardId, title, body }) => ({
        url: `/boards/${boardId}`,
        method: 'PATCH',
        body: {
          title,
          body,
        },
      }),
      transformResponse: (response: BoardResponse) => buildBoard(response),
    }),
    deleteBoard: builder.mutation<void, string>({
      query: (boardId) => ({
        url: `/boards/${boardId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetBoardQuery,
  useGetBoardsMutation,
  usePostBoardMutation,
  usePatchBoardMutation,
  useDeleteBoardMutation,
} = boardApi;
