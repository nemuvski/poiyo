import React from 'react';
import CommentForm from '../CommentForm';
import Modal, { ModalName } from './Modal';
import { Board } from '../../libs/models/Board';

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
