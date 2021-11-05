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

const DeleteBoardConfirmModal: React.FC<Props> = ({ okAction, cancelAction }) => {
  const modal = useSelector(selectModal)

  if (modal !== ModalName.DELETE_BOARD_CONFIRM) {
    return null
  }

  return (
    <Modal isCompactMode={true}>
      <Confirm
        message='ボードを削除しますがよろしいですか？'
        okLabel='削除'
        okAction={okAction}
        cancelAction={cancelAction}
      />
    </Modal>
  )
}

export default DeleteBoardConfirmModal
