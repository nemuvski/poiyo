import React, {useContext} from 'react';
import {createPortal} from "react-dom";
import {ModalContext} from "../contexts/ModalContext";
import closeIcon from "../assets/icons/modal-close.svg";
import '../styles/components/modal.scss';

type Props = {
  children?: React.ReactNode;
}

/**
 * Modalの表示切り替えはModalContext経由で操作する.
 */
const Modal: React.FC<Props> = (props: Props) => {
  const {isModalOpen, closeModal} = useContext(ModalContext);
  const rootElement = document.getElementById('root');
  return (
    createPortal(
      <>
        {isModalOpen && (
          <div className="modal" onClick={() => closeModal()}>
            <div className="modal__inner">
              <div className="modal__content" onClick={event => event.stopPropagation()}>
                {props.children}
              </div>
              <div className="modal__close">
                <img alt="×" src={closeIcon} /><span>閉じる</span>
              </div>
            </div>
          </div>
        )}
      </>
    , rootElement as Element)
  );
}

export default Modal;
