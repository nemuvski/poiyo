import { RootState } from '../store'

export const selectFullWideLoading = (state: RootState): boolean => state.fullWideLoadingReducer.isActive
