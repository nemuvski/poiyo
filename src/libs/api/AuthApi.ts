/**
 * OAuth認証後にアカウントデータの取得をするAPIを実行.
 */

import Axios from '../common/Axios';
import {AxiosPromise} from 'axios';
import {AuthRequest, AuthResponse} from "../models/Auth";

const post = (token: string, requestBody: AuthRequest): AxiosPromise<AuthResponse> => {
  return Axios(token).post('/auth', {
    'service_type': requestBody.serviceType,
    'service_id': requestBody.serviceId,
    'email': requestBody.email,
  });
}

export default { post };
