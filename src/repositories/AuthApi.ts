/**
 * OAuth認証後にアカウントデータの取得をするAPIを実行.
 */

import Axios from '../libs/common/Axios';
import { AxiosPromise } from 'axios';
import { AuthRequest, AuthResponse } from '../models/Auth';

const path = '/repositories/v1/auth';

/**
 * 認証APIを実行する.
 *
 * @param token トークン.
 * @param requestBody リクエストボディ.
 */
const post = (token: string, requestBody: AuthRequest): AxiosPromise<AuthResponse> => {
  return Axios(token).post(path, {
    service_type: requestBody.serviceType,
    service_id: requestBody.serviceId,
    email: requestBody.email,
  });
};

export default { post };
