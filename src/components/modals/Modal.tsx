import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import closeIcon from '../../assets/icons/modal-close.svg';
import { clearModal } from '../../stores/modal/slice';
import '../../styles/components/modal.scss';

type Props = {
  children?: React.ReactNode;
  isCompactMode?: boolean;
};

/**
 * Modalの表示切り替えはModalContext経由で操作する.
 */
const Modal: React.FC<Props> = ({ isCompactMode = false, children }) => {
  const dispatch = useDispatch();
  const rootElement = document.getElementById('root');

  useEffect(() => {
    return () => {
      dispatch(clearModal());
    };
  }, []);

  return createPortal(
    <div className='modal' onClick={() => dispatch(clearModal())}>
      <div className={clsx(['modal__inner', { 'is-compact': isCompactMode }])}>
        <div className='modal__content' onClick={(event) => event.stopPropagation()}>
          {children}
        </div>
        <div className='modal__close'>
          <img alt='×' src={closeIcon} />
          <span>閉じる</span>
        </div>
      </div>
    </div>,
    rootElement as Element
  );
};

export default Modal;
