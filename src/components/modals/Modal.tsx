import React, { useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalContext } from '../../contexts/ModalContext';
import closeIcon from '../../assets/icons/modal-close.svg';
import '../../styles/components/modal.scss';

type Props = {
  children?: React.ReactNode;
  name: string;
};

/**
 * Modalの表示切り替えはModalContext経由で操作する.
 */
const Modal: React.FC<Props> = (props: Props) => {
  const { isOpen, closeModal, setupModal } = useContext(ModalContext);
  const rootElement = document.getElementById('root');

  useEffect(() => {
    setupModal(props.name);

    return () => {
      closeModal(props.name);
    };
  }, []);

  return createPortal(
    <>
      {isOpen(props.name) && (
        <div className='modal' onClick={() => closeModal(props.name)}>
          <div className='modal__inner'>
            <div className='modal__content' onClick={(event) => event.stopPropagation()}>
              {props.children}
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
