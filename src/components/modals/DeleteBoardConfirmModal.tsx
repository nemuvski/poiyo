import React from 'react';
import Modal from './Modal';
import Confirm from '../Confirm';
import { ModalName } from '../../stores/modal/slice';

type Props = {
  okAction: () => void;
  cancelAction: () => void;
};

const DeleteBoardConfirmModal: React.FC<Props> = ({ okAction, cancelAction }) => {
  return (
    <Modal name={ModalName.DELETE_BOARD_CONFIRM} isCompactMode={true}>
      <Confirm
        message='ボードを削除しますがよろしいですか？'
        okLabel='削除'
        okAction={okAction}
        cancelAction={cancelAction}
      />
    </Modal>
  );
};

export default DeleteBoardConfirmModal;
