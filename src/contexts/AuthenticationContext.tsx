import React, {createContext, useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import firebase from '../libs/common/Firebase';
import {Account} from '../libs/models/Account';
import AuthService from "../libs/services/AuthService";
import FullWideLoading from "../components/FullWideLoading";
import SentryTracking from "../utilities/SentryTracking";

type Props = {
  children?: React.ReactNode;
};

type Context = {
  account: Account | null;
  signIn: () => void;
  signOut: () => void;
};

export const AuthenticationContext: React.Context<Context> = createContext<Context>({
  account: null,
  signIn: () => null,
  signOut: () => null,
});

export const AuthenticationProvider: React.FC<Props> = (props: Props) => {
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const history = useHistory();

  const signIn = () => {
    firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  };

  const signOut = () => {
    setLoading(true);
    firebase.auth().signOut()
      .then(() => {
        setAccount(null);
      })
      .catch(error => {
        SentryTracking.exception('サインアウト中にエラーが発生しました。');
        SentryTracking.exception(error);
      })
      .finally(() => {
        history.replace('/');
        setLoading(false);
      });
  };

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
          SentryTracking.exception('アカウント認証中にエラーが発生しました。');
          SentryTracking.exception(error);
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
