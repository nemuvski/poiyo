import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setFullWideLoading } from '../stores/fullWideLoading/slice'

export const useFullWideLoading = (initial: boolean): { setFullWideLoading: (state: boolean) => void } => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setFullWideLoading(initial))
  }, [])

  return {
    setFullWideLoading: (state) => {
      dispatch(setFullWideLoading(state))
    },
  }
}
