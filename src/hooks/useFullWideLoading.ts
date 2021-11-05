import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setFullWideLoading } from '~/stores/fullWideLoading/slice'

export const useFullWideLoading = (initial: boolean): { setFullWideLoading: (state: boolean) => void } => {
  const dispatch = useDispatch()

  const setFullWideLoadingAction = useCallback(
    (state) => {
      dispatch(setFullWideLoading(state))
    },
    [dispatch]
  )

  useEffect(() => {
    dispatch(setFullWideLoading(initial))
  }, [dispatch, initial])

  return {
    setFullWideLoading: setFullWideLoadingAction,
  }
}
