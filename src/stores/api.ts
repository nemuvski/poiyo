import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './store';

export const poiyoApi = createApi({
  reducerPath: 'poiyoApi',
  tagTypes: ['Board'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_ENDPOINT}/api/v1`,
    prepareHeaders: (headers, { getState }) => {
      headers.set('Content-Type', 'application/json');
      const account = (getState() as RootState).accountReducer.account;
      if (account) {
        headers.set('Authorization', `Bearer ${account.token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});

export const defaultValidateStatus = ({ status }: Response): boolean => {
  console.info('Status: ', status);
  return status === 200 || status === 201;
};
