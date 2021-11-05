import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { clearModal, ModalNameType, setModal } from '~/stores/modal/slice'

export const useModal = (name?: ModalNameType): { openModal: () => void; closeModal: () => void } => {
  const dispatch = useDispatch()

  const openModal = useCallback(() => {
    if (name) {
      dispatch(setModal(name))
    }
  }, [dispatch, name])

  const closeModal = useCallback(() => {
    dispatch(clearModal())
  }, [dispatch])

  useEffect(
    () => () => {
      dispatch(clearModal())
    },
    [dispatch]
  )

  return { openModal, closeModal }
}
