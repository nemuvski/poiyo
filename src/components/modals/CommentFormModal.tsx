import React from 'react';
import CommentForm from '../CommentForm';
import Modal from './Modal';
import { Board } from '../../libs/models/Board';
import { ModalName } from '../../stores/modal/slice';

type Props = {
  board: Board;
};

const CommentFormModal: React.FC<Props> = ({ board }) => {
  return (
    <Modal name={ModalName.COMMENT_FORM}>
      <CommentForm board={board} />
    </Modal>
  );
};

export default CommentFormModal;
