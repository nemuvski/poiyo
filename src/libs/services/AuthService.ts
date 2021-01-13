/**
 * カウントデータの取得して、データを
 */

import AuthApi from '../api/AuthApi';
import { Account } from '../models/Account';

const auth = (token: string, email: string | null, serviceId: string, serviceType = 'ggl'): Promise<Account> => {
  return AuthApi.post(token, email, serviceId, serviceType)
    .then(response => {
      const id = response.data.account_id;
      return new Account(id, token);
    });
}

export default { auth };
