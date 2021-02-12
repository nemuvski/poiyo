/**
 * アカウント関連のAPIを実行.
 */

import Axios from '../common/Axios';
import {AxiosPromise} from 'axios';

const path = '/accounts';

/**
 * アカウント削除のAPIを実行する.
 *
 * @param token トークン.
 * @param accountId アカウントID.
 */
const remove = (token: string, accountId: string): AxiosPromise<void> => {
  return Axios(token).delete(`${path}/${accountId}`);
};

export default { remove };
