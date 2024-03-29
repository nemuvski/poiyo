import React from 'react'
import { useSelector } from 'react-redux'
import CommentForm from '~/components/CommentForm'
import Modal from '~/components/modals/Modal'
import { Board } from '~/models/Board'
import { ModalName } from '~/stores/modal/slice'
import { selectModal } from '~/stores/modal/selector'
import { useOperatingComment } from '~/hooks/useOperatingComment'
import { useModal } from '~/hooks/useModal'

type Props = {
  board: Board
}

const CommentFormModal: React.FC<Props> = ({ board }) => {
  const modal = useSelector(selectModal)
  const { closeModal } = useModal()
  const { operatingComment, clearOperatingComment } = useOperatingComment()

  if (modal !== ModalName.COMMENT_FORM) {
    return null
  }

  return (
    <Modal>
      <CommentForm
        board={board}
        operatingComment={operatingComment}
        closeAction={() => {
          clearOperatingComment()
          closeModal()
        }}
      />
    </Modal>
  )
}

export default CommentFormModal
