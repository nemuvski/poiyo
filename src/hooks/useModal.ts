import { useDispatch } from 'react-redux';
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
