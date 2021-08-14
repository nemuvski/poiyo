import { poiyoApi } from '../api';
import {
  Board,
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
        url: `/boards`,
        method: 'GET',
        params: { owner_account_id, search, page, num_per_page },
      }),
      transformResponse: (response: BoardsResponse) => buildBoards(response),
    }),
  }),
});

export const { useGetBoardQuery, useGetBoardsMutation } = boardApi;
