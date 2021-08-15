import { useEffect, useState } from 'react';
import { auth } from '../libs/Firebase';
import AuthService from '../services/AuthService';
import SentryTracking from '../utilities/SentryTracking';
import { useDispatch } from 'react-redux';
import { clearAccount, setAccount } from '../stores/account/slice';
import { useFullWideLoading } from './useFullWideLoading';

export const useAuth = (): { error: Error | null } => {
  const dispatch = useDispatch();
  const { setFullWideLoading } = useFullWideLoading(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setFullWideLoading(true);
      setError(null);

      if (user) {
        try {
          const idToken = await user.getIdToken();
          const { uid, email } = user;
          const accountResponse = await AuthService.auth(idToken, email, uid);
          dispatch(setAccount(accountResponse));
        } catch (error) {
          setError(error);
          SentryTracking.exception('アカウント認証中にエラーが発生しました。');
          SentryTracking.exception(error);
          // JWT取得、認証API実行で問題があった場合はFirebase Authでサインアウト処理を実行する.
          await auth.signOut();
          dispatch(clearAccount());
        }
      } else {
        dispatch(clearAccount());
      }

      setFullWideLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { error };
};
