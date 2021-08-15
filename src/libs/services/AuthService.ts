/**
 * 認証に関するサービス関数を定義.
 */

import AuthApi from '../api/AuthApi';
import { Account } from '../../models/Account';
import { AuthRequest } from '../../models/Auth';

/**
 * 認証してアカウント情報を取得する.
 *
 * @param token トークン.
 * @param email メールアドレス.
 * @param serviceId サービスのID.
 * @param serviceType サービスの種別.
 */
const auth = (token: string, email: string | null, serviceId: string, serviceType = 'ggl'): Promise<Account> => {
  const authRequest: AuthRequest = {
    serviceType,
    serviceId,
    email,
  };
  return AuthApi.post(token, authRequest).then((response) => {
    const id = response.data.account_id;
    const account: Account = { id, token };
    return account;
  });
};

export default { auth };
