/**
 * OAuth認証後にアカウントデータの取得をするAPIを実行.
 */

import Axios from '../common/Axios';
import {AxiosPromise} from 'axios';
import {Auth, AuthRequest} from "../models/Auth";

const post = (token: string, requestBody: AuthRequest): AxiosPromise<Auth> => {
  return Axios(token).post('/auth', {
    'service_type': requestBody.serviceType,
    'service_id': requestBody.serviceId,
    'email': requestBody.email,
  });
}

export default { post };
