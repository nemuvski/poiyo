import React, { createContext, useState, useEffect, useCallback, ReactElement } from 'react';
import firebase from '../firebase';

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

  const signIn: () => void = useCallback(() => {
    firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    firebase.auth().getRedirectResult()
      .then(result => {
        if (result.user) {
          setAccount({ uid: result.user.uid });
        }
      })
      .catch(error => {
        console.error('サインイン中にエラーが発生しました。');
        console.error(error);
      });
  }, []);

  const signOut: () => void = useCallback(() => {
    firebase.auth().signOut();
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setAccount({ uid: user.uid });
      }
      else {
        setAccount(null);
      }
    });
  });

  return (
    <AuthenticationContext.Provider value={{ account, signIn, signOut }}>
      {props.children}
    </AuthenticationContext.Provider>
  );
}
