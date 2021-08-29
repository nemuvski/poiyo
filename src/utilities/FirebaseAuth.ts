import firebase from 'firebase/compat/app';
import { auth } from '../libs/Firebase';
import SentryTracking from './SentryTracking';

/**
 * Firebase Authenticationでサインインを実行
 */
export const signIn = (): Promise<void> => {
  return auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider()).catch((error) => {
    SentryTracking.exception('FirebaseAuth: サインイン中にエラーが発生しました。');
    SentryTracking.exception(error);
  });
};

/**
 * Firebase Authenticationでサインアウトを実行
 */
export const signOut = (): Promise<void> => {
  return auth.signOut().catch((error) => {
    SentryTracking.exception('FirebaseAuth: サインアウト中にエラーが発生しました。');
    SentryTracking.exception(error);
  });
};
