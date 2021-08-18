import React from 'react';
import Modal from './Modal';
import Confirm from '../Confirm';
import { ModalName } from '../../stores/modal/slice';
import { useSelector } from 'react-redux';
import { selectModal } from '../../stores/modal/selector';
import { useModal } from '../../hooks/useModal';
import { useOperatingComment } from '../../hooks/useOperatingComment';
import { useDeleteCommentMutation } from '../../stores/comment/api';
import { Board } from '../../models/Board';
import SentryTracking from '../../utilities/SentryTracking';

type Props = {
  board: Board;
};

const DeleteCommentConfirmModal: React.FC<Props> = ({ board }) => {
  const [deleteComment] = useDeleteCommentMutation();
  const { closeModal } = useModal();
  const { operatingComment, clearOperatingComment } = useOperatingComment();
  const modal = useSelector(selectModal);

  if (modal !== ModalName.DELETE_COMMENT_CONFIRM) {
    return null;
  }

  return (
    <Modal isCompactMode={true} closeAction={() => clearOperatingComment()}>
      <Confirm
        message='コメントを削除しますがよろしいですか？'
        okLabel='削除'
        okAction={() => {
          if (!operatingComment) {
            console.error('削除対象のコメントが見つからないため処理を中断しました。');
            return;
          }
          deleteComment({ boardId: board.boardId, commentId: operatingComment.commentId })
            .unwrap()
            .catch((error) => {
              console.error('コメント削除時に問題が発生したため、削除されませんでした。', error);
              SentryTracking.exception('コメント削除時に問題が発生したため、削除されませんでした。');
            })
            .finally(() => {
              clearOperatingComment();
              closeModal();
            });
        }}
        cancelAction={() => {
          clearOperatingComment();
          closeModal();
        }}
      />
    </Modal>
  );
};

export default DeleteCommentConfirmModal;
