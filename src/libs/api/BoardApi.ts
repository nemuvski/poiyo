/**
 * ボード関連のAPIを実行.
 */

import Axios from '../common/Axios';
import {AxiosPromise} from 'axios';
import {BoardRequest, BoardResponse} from "../models/Board";

const post = (token: string, requestBody: BoardRequest): AxiosPromise<BoardResponse> => {
  return Axios(token).post('/board', {
    'title': requestBody.title,
    'body': requestBody.body,
    'owner_account_id': requestBody.ownerAccountId,
  });
}

export default { post };
