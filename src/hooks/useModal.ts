import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectModal } from '../stores/modal/selector';
import { clearModal, ModalNameType, setModal } from '../stores/modal/slice';

export const useModal = (name?: ModalNameType): { openModal: () => void; closeModal: () => void } => {
  const dispatch = useDispatch();
  return {
    openModal: () => {
      if (name) {
        dispatch(setModal(name));
      }
    },
    closeModal: () => {
      dispatch(clearModal());
    },
  };
};

export const useModalFixedScroll = (): void => {
  const modal = useSelector(selectModal);

  useEffect(() => {
    // モーダルが開いていればスクロール制限する
    const htmlElement = document.documentElement;
    if (modal) {
      htmlElement.setAttribute('style', 'overflow: hidden');
    } else {
      htmlElement.style['overflow'] = '';
    }

    return () => {
      htmlElement.style['overflow'] = '';
    };
  }, [modal]);
};
