import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectModal } from '../stores/modal/selector'
import { selectFullWideLoading } from '../stores/fullWideLoading/selector'

export const useFixedScroll = (): void => {
  const modal = useSelector(selectModal)
  const isLoading = useSelector(selectFullWideLoading)

  useEffect(() => {
    // モーダルが開いていればスクロール制限する
    const htmlElement = document.documentElement
    if (modal || isLoading) {
      htmlElement.setAttribute('style', 'overflow: hidden')
    } else {
      htmlElement.style['overflow'] = ''
    }

    return () => {
      htmlElement.style['overflow'] = ''
    }
  }, [modal, isLoading])
}
