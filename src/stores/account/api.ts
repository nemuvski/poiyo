import { defaultValidateStatus, poiyoApi } from '../api';
import { AuthRequest, AuthResponse } from '../../models/Auth';

export const accountApi = poiyoApi.injectEndpoints({
  endpoints: (builder) => ({
    // 認証（サインイン）時に呼び出す
    signIn: builder.mutation<AuthResponse, AuthRequest>({
      query: ({ serviceType, serviceId, email, token }) => ({
        url: '/auth',
        method: 'POST',
        body: {
          service_type: serviceType,
          service_id: serviceId,
          email,
        },
        validateStatus: defaultValidateStatus,
        // このWebAPIを実行するタイミングでは、prepareHeadersで設定はできないので、呼び出しの時にヘッダーに付与する
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
    // 退会時に呼び出す
    signOff: builder.mutation<void, string>({
      query: (accountId) => ({
        url: `/accounts/${accountId}`,
        method: 'DELETE',
        validateStatus: defaultValidateStatus,
      }),
    }),
  }),
});

export const { useSignInMutation, useSignOffMutation } = accountApi;
