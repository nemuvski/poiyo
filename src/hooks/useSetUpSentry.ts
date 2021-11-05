import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectAccount } from '~/stores/account/selector'
import Sentry from '~/libs/Sentry'

export const useSetUpSentry = (): void => {
  const account = useSelector(selectAccount)

  useEffect(() => {
    Sentry.configureScope((scope) => {
      scope.setUser({ id: account ? account.id : undefined })
    })
  }, [account])
}
