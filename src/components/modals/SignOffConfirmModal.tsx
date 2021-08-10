import React from 'react';
import Modal, { ModalName } from './Modal';
import Confirm from '../Confirm';

type Props = {
  okAction: () => void;
  cancelAction: () => void;
};

const SignOffConfirmModal: React.FC<Props> = ({ okAction, cancelAction }) => {
  return (
    <Modal name={ModalName.SIGN_OFF_CONFIRM} isCompactMode={true}>
      <Confirm
        message='サービスを退会しますがよろしいですか？'
        okLabel='退会'
        okAction={okAction}
        cancelAction={cancelAction}
      />
    </Modal>
  );
};

export default SignOffConfirmModal;
