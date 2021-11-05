import { signInWithRedirect, signOut, GoogleAuthProvider } from 'firebase/auth'
import { firebaseAuth } from '../libs/Firebase'
import SentryTracking from './SentryTracking'

/**
 * Firebase Authenticationでサインインを実行
 */
export const firebaseSignIn = (): Promise<void> => {
  return signInWithRedirect(firebaseAuth, new GoogleAuthProvider()).catch((error) => {
    SentryTracking.exception('FirebaseAuth: サインイン中にエラーが発生しました。')
    SentryTracking.exception(error)
  })
}

/**
 * Firebase Authenticationでサインアウトを実行
 */
export const firebaseSignOut = (): Promise<void> => {
  return signOut(firebaseAuth).catch((error) => {
    SentryTracking.exception('FirebaseAuth: サインアウト中にエラーが発生しました。')
    SentryTracking.exception(error)
  })
}
