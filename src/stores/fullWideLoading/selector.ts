import { RootState } from '~/stores/store'

export const selectFullWideLoading = (state: RootState): boolean => state.fullWideLoadingReducer.isActive
