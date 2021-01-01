import React, { createContext, useState, useEffect, useCallback, ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
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
    firebase.auth().getRedirectResult()
      .then(result => {
        if (result.user) {
          setAccount({ uid: result.user.uid });
          history.replace('/dashboard');
        }
      })
      .catch(error => {
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
