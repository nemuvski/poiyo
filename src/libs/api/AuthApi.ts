/**
 * OAuth認証後にアカウントデータの取得をするAPIを実行.
 */

import Axios from '../common/Axios';
import { AxiosPromise } from 'axios';
import { Auth } from "../models/Auth";

const post = (token: string, email: string | null, serviceId: string, serviceType: string): AxiosPromise<Auth> => {
  return Axios(token).post('/auth', {
    'service_id': serviceId,
    'service_type': serviceType,
    'email': email,
  });
}

export default { post };
