import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth } from '~/libs/Firebase'
import { firebaseSignOut } from '~/utilities/FirebaseAuth'
import SentryTracking from '~/utilities/SentryTracking'
import { clearAccount, setAccount } from '~/stores/account/slice'
import { useFullWideLoading } from './useFullWideLoading'
import { useSignInMutation } from '~/stores/account/api'
import { buildAuthRequest } from '~/models/Auth'
import { buildAccount } from '~/models/Account'

export const useAuth = (): void => {
  const dispatch = useDispatch()
  const { setFullWideLoading } = useFullWideLoading(true)
  const [signIn] = useSignInMutation()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
      setFullWideLoading(true)

      if (user) {
        try {
          const idToken = await user.getIdToken()
          const { uid, email } = user
          const authResponse = await signIn(buildAuthRequest(idToken, email, uid)).unwrap()
          dispatch(setAccount(buildAccount(authResponse, idToken)))
        } catch (error) {
          console.error('アカウント認証中にエラーが発生しました。', error)
          SentryTracking.exception('アカウント認証中にエラーが発生しました。')
          // JWT取得、認証API実行で問題があった場合はFirebase Authでサインアウト処理を実行する.
          await firebaseSignOut()
          dispatch(clearAccount())
        }
      } else {
        dispatch(clearAccount())
      }

      setFullWideLoading(false)
    })

    return () => unsubscribe()
  }, [dispatch, setFullWideLoading, signIn])
}
