import { useEffect, useState } from 'react';
import { auth } from '../libs/common/Firebase';
import AuthService from '../libs/services/AuthService';
import SentryTracking from '../utilities/SentryTracking';
import { useDispatch } from 'react-redux';
import { clearAccount, setAccount } from '../stores/account/slice';

type ReturnParams = {
  isLoading: boolean;
  error: Error | null;
};

export const useAuth = (): ReturnParams => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setIsLoading(true);
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

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { isLoading, error };
};
