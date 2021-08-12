import { RootState } from '../store';
import { ModalNameType } from './slice';

export const selectModal = (state: RootState): ModalNameType | null => state.modalReducer.name;
