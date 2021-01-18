import React, {createContext, useState, useEffect, useCallback, ReactElement} from 'react';
import {useHistory} from 'react-router-dom';
import firebase from '../firebase';
import {Account} from '../libs/models/Account';
import AuthService from "../libs/services/AuthService";
import FullWideLoading from "../components/FullWideLoading";

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
  const [loading, setLoading] = useState<boolean>(true);
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
        history.replace('/');
      });
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        try {
          const idToken = await user.getIdToken();
          const uid = user.uid;
          const email = user.email;
          const accountResponse = await AuthService.auth(idToken, email, uid);
          setAccount(accountResponse);
        } catch (error) {
          console.error('アカウント認証中にエラーが発生しました。');
          console.error(error);
          // JWT取得、認証API実行で問題があった場合はFirebase Authでサインアウト処理を実行する.
          signOut();
        }
      }
      else {
        setAccount(null);
      }
      setLoading(false);
    });
  }, []);

  return (
    <AuthenticationContext.Provider value={{ account, signIn, signOut }}>
      {loading ? <FullWideLoading /> : props.children}
    </AuthenticationContext.Provider>
  );
}
