/**
 * axios（httpクライアント）の共通設定.
 */

import axios, { AxiosInstance } from 'axios';

export default (token: string): AxiosInstance => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  return axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT,
    timeout: 60000,
    headers,
    responseType: 'json',
  });
};
