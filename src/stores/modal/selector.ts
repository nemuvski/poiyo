import { RootState } from '~/stores/store'
import { ModalNameType } from '~/stores/modal/slice'

export const selectModal = (state: RootState): ModalNameType | null => state.modalReducer.name
