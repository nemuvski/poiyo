/**
 * アカウントに関するサービス関数を定義.
 */

import AccountsApi from "../api/AccountsApi";

/**
 *
 * @param token トークン.
 * @param accountId アカウントID.
 */
const remove = (token: string, accountId: string): Promise<void> => {
  return AccountsApi.remove(token, accountId)
    .then(response => {
      if (response.status == 204) {
        throw new Error('アカウントが見つからなかったため、削除されませんでした。');
      }
    });
};

export default { remove };
