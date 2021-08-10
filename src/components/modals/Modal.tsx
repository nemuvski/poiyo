import React, { useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalContext } from '../../contexts/ModalContext';
import closeIcon from '../../assets/icons/modal-close.svg';
import '../../styles/components/modal.scss';
import clsx from 'clsx';

/**
 * モーダルの識別名
 */
export const ModalName = {
  COMMENT_FORM: 'comment-form',
  SIGN_OFF_CONFIRM: 'sign-off-confirm',
  DELETE_COMMENT_CONFIRM: 'delete-comment-confirm',
  DELETE_BOARD_CONFIRM: 'delete-board-confirm',
} as const;
export type ModalNameType = typeof ModalName[keyof typeof ModalName];

type Props = {
  children?: React.ReactNode;
  name: ModalNameType;
  isCompactMode?: boolean;
};

/**
 * Modalの表示切り替えはModalContext経由で操作する.
 */
const Modal: React.FC<Props> = ({ name, isCompactMode = false, children }) => {
  const { isOpen, closeModal, setupModal } = useContext(ModalContext);
  const rootElement = document.getElementById('root');

  useEffect(() => {
    setupModal(name);

    return () => {
      closeModal(name);
    };
  }, []);

  return createPortal(
    <>
      {isOpen(name) && (
        <div className='modal' onClick={() => closeModal(name)}>
          <div className={clsx(['modal__inner', { 'is-compact': isCompactMode }])}>
            <div className='modal__content' onClick={(event) => event.stopPropagation()}>
              {children}
            </div>
            <div className='modal__close'>
              <img alt='×' src={closeIcon} />
              <span>閉じる</span>
            </div>
          </div>
        </div>
      )}
    </>,
    rootElement as Element
  );
};

export default Modal;
