import React, { createContext, useState, useEffect, useCallback, ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from '../firebase';
import { hideLoading } from '../utilities/loading';
import { Account } from '../libs/models/Account';
import AuthService from "../libs/services/AuthService";

type Props = {
  children?: React.ReactNode;
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
        const idToken = await result.user.getIdToken();
        const uid = result.user.uid;
        const email = result.user.email;
        const authResponse = await AuthService.auth(idToken, email, uid);
        setAccount(new Account(authResponse.id, authResponse.token));
        history.replace('/dashboard');
      })
      .catch(error => {
        setAccount(null);
        history.replace('/');
        console.error('サインイン中にエラーが発生しました。');
        console.error(error);
      })
      .finally(() => {
        hideLoading();
      });

    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        const idToken = await user.getIdToken();
        const uid = user.uid;
        const email = user.email;
        const authResponse = await AuthService.auth(idToken, email, uid);
        setAccount(new Account(authResponse.id, authResponse.token));
        history.replace('/dashboard');
      }
      else {
        setAccount(null);
        history.replace('/');
      }
    });
  }, []);

  return (
    <AuthenticationContext.Provider value={{ account, signIn, signOut }}>
      {props.children}
    </AuthenticationContext.Provider>
  );
}
