import { useDispatch } from 'react-redux'
import { clearModal, ModalNameType, setModal } from '../stores/modal/slice'
import { useEffect } from 'react'

export const useModal = (name?: ModalNameType): { openModal: () => void; closeModal: () => void } => {
  const dispatch = useDispatch()

  useEffect(
    () => () => {
      dispatch(clearModal())
    },
    []
  )

  return {
    openModal: () => {
      if (name) {
        dispatch(setModal(name))
      }
    },
    closeModal: () => {
      dispatch(clearModal())
    },
  }
}
