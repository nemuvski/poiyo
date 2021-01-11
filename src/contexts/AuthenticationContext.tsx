import React, { createContext, useState, useEffect, useCallback, ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import firebase from '../firebase';
import { hideLoading } from '../utilities/loading';

type Props = {
  children?: React.ReactNode;
}

type Account = {
  uid: string;
}

type Context = {
  account: Account | null;
  signIn: () => void;
  signOut: () => void;
  getToken: () => string | null;
}

export const AuthenticationContext: React.Context<Context> = createContext<Context>({
  account: null,
  signIn: () => null,
  signOut: () => null,
  getToken: () => null,
});

export const AuthenticationProvider: React.FC<Props> = (props: Props): ReactElement => {
  const [account, setAccount] = useState<Account | null>(null);
  const history = useHistory();

  const removeToken: () => void = useCallback(() => {
    localStorage.removeItem('token');
  }, []);

  const getToken: () => string | null = () => {
    return localStorage.getItem('token')
  };

  const signIn: () => void = useCallback(() => {
    firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }, []);

  const signOut: () => void = useCallback(() => {
    firebase.auth().signOut()
      .then(() => {
        removeToken()
        setAccount(null);
      })
      .catch(error => {
        console.error('サインアウト中にエラーが発生しました。');
        console.error(error);
      })
      .finally(() => {
        // フロントページへ. (前画面へ戻れないようにする)
        history.replace('/');
      });
  }, []);

  useEffect(() => {
    // サインイン後に実行する処理を記述する.
    firebase.auth().getRedirectResult()
      .then(async result => {
        if (!result.user) {
          return;
        }

        await result.user.getIdToken().then(idToken => {
          localStorage.setItem('token', idToken.toString())
        })

        const token = getToken();
        const res = await axios.get(
          'http://localhost:1323/api/v1/auth',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        console.log(res);

        setAccount({ uid: result.user.uid });

        // ダッシュボードページへ飛ばす.
        history.replace('/dashboard');
      })
      .catch(error => {
        removeToken();
        setAccount(null);
        console.error('サインイン中にエラーが発生しました。');
        console.error(error);
      })
      .finally(() => {
        hideLoading();
      });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setAccount({ uid: user.uid });
      }
      else {
        removeToken();
        setAccount(null);
      }
    });
  }, []);

  return (
    <AuthenticationContext.Provider value={{ account, signIn, signOut, getToken }}>
      {props.children}
    </AuthenticationContext.Provider>
  );
}
