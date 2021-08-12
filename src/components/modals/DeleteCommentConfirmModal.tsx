import React from 'react';
import Modal from './Modal';
import Confirm from '../Confirm';
import { ModalName } from '../../stores/modal/slice';
import { useSelector } from 'react-redux';
import { selectModal } from '../../stores/modal/selector';

type Props = {
  okAction: () => void;
  cancelAction: () => void;
};

const DeleteCommentConfirmModal: React.FC<Props> = ({ okAction, cancelAction }) => {
  const modal = useSelector(selectModal);

  if (modal !== ModalName.DELETE_COMMENT_CONFIRM) {
    return null;
  }

  return (
    <Modal isCompactMode={true}>
      <Confirm
        message='コメントを削除しますがよろしいですか？'
        okLabel='削除'
        okAction={okAction}
        cancelAction={cancelAction}
      />
    </Modal>
  );
};

export default DeleteCommentConfirmModal;
