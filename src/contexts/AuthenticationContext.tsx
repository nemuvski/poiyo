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
  token: string;
}

type Context = {
  account: Account | null;
  signIn: () => void;
  signOut: () => void;
}

export const AuthenticationContext: React.Context<Context> = createContext<Context>({
  account: null,
  signIn: () => null,
  signOut: () => null,
});

export const AuthenticationProvider: React.FC<Props> = (props: Props): ReactElement => {
  const [account, setAccount] = useState<Account | null>(null);
  const history = useHistory();

  const signIn: () => void = useCallback(() => {
    firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }, []);

  const signOut: () => void = useCallback(() => {
    firebase.auth().signOut()
      .then(() => {
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
        const idToken = await result.user.getIdToken()
        const authAccount: Account = {
          uid: result.user.uid,
          token: idToken.toString(),
        };

        await axios.get(
          'http://localhost:1323/api/v1/auth',
          {
            headers: {
              Authorization: `Bearer ${authAccount.token}`
            }
          }
        );

        setAccount(authAccount);
        history.replace('/dashboard');
      })
      .catch(error => {
        setAccount(null);
        console.error('サインイン中にエラーが発生しました。');
        console.error(error);
      })
      .finally(() => {
        hideLoading();
      });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        user.getIdToken().then(idToken => {
          setAccount({
            uid: user.uid,
            token: idToken.toString(),
          });
        })
      }
      else {
        setAccount(null);
      }
    });
  }, []);

  return (
    <AuthenticationContext.Provider value={{ account, signIn, signOut }}>
      {props.children}
    </AuthenticationContext.Provider>
  );
}
