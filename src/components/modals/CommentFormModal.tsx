import React from 'react';
import CommentForm from '../CommentForm';
import Modal from './Modal';
import { Board } from '../../models/Board';
import { ModalName } from '../../stores/modal/slice';
import { useSelector } from 'react-redux';
import { selectModal } from '../../stores/modal/selector';

type Props = {
  board: Board;
};

const CommentFormModal: React.FC<Props> = ({ board }) => {
  const modal = useSelector(selectModal);

  if (modal !== ModalName.COMMENT_FORM) {
    return null;
  }

  return (
    <Modal>
      <CommentForm board={board} />
    </Modal>
  );
};

export default CommentFormModal;
