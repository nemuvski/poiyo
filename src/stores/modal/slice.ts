import { createSlice, PayloadAction } from '@reduxjs/toolkit'

/**
 * モーダルの識別名
 */
export const ModalName = {
  COMMENT_FORM: 'comment-form',
  SIGN_OFF_CONFIRM: 'sign-off-confirm',
  DELETE_COMMENT_CONFIRM: 'delete-comment-confirm',
  DELETE_BOARD_CONFIRM: 'delete-board-confirm',
} as const
export type ModalNameType = typeof ModalName[keyof typeof ModalName]

export interface ModalState {
  name: ModalNameType | null
}

const initialState: ModalState = {
  name: null,
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModal: (state, action: PayloadAction<ModalNameType>) => {
      state.name = action.payload
    },
    clearModal: (state) => {
      state.name = null
    },
  },
})

export const { setModal, clearModal } = modalSlice.actions
