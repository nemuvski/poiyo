import React from 'react'
import { useSelector } from 'react-redux'
import Modal from '~/components/modals/Modal'
import Confirm from '~/components/Confirm'
import { ModalName } from '~/stores/modal/slice'
import { selectModal } from '~/stores/modal/selector'

type Props = {
  okAction: () => void
  cancelAction: () => void
}

const SignOffConfirmModal: React.FC<Props> = ({ okAction, cancelAction }) => {
  const modal = useSelector(selectModal)

  if (modal !== ModalName.SIGN_OFF_CONFIRM) {
    return null
  }

  return (
    <Modal isCompactMode={true}>
      <Confirm
        message='サービスを退会しますがよろしいですか？'
        okLabel='退会'
        okAction={okAction}
        cancelAction={cancelAction}
      />
    </Modal>
  )
}

export default SignOffConfirmModal
