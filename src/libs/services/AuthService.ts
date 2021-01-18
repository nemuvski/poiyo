/**
 * カウントデータの取得して、データを
 */

import AuthApi from '../api/AuthApi';
import {Account} from '../models/Account';
import {AuthRequest} from "../models/Auth";

const auth = (token: string, email: string | null, serviceId: string, serviceType = 'ggl'): Promise<Account> => {
  const authRequest: AuthRequest = {
    serviceType,
    serviceId,
    email,
  };
  return AuthApi.post(token, authRequest)
    .then(response => {
      const id = response.data.account_id;
      return new Account(id, token);
    });
}

export default { auth };
