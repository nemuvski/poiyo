import { poiyoApi } from '../api';
import { Board, BoardResponse } from '../../libs/models/Board';

export const boardApi = poiyoApi.injectEndpoints({
  endpoints: (builder) => ({
    getBoard: builder.query({
      query: (boardId: string) => `/boards/${boardId}`,
      transformResponse: (response: BoardResponse) => new Board(response),
    }),
  }),
});

export const { useGetBoardQuery } = boardApi;
