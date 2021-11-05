import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import clsx from 'clsx'
import closeIcon from '../../assets/icons/modal-close.svg'
import { useModal } from '../../hooks/useModal'
import '../../styles/components/modal.scss'

type Props = {
  children?: React.ReactNode
  isCompactMode?: boolean
  // モーダルを閉じる直前に実行する処理
  closeAction?: () => void
}

const Modal: React.FC<Props> = ({ isCompactMode = false, closeAction, children }) => {
  const { closeModal } = useModal()
  const rootElement = document.getElementById('modal')

  useEffect(() => {
    return () => {
      if (closeAction) {
        closeAction()
      }
      closeModal()
    }
  }, [])

  return createPortal(
    <div
      className='modal'
      onClick={() => {
        if (closeAction) {
          closeAction()
        }
        closeModal()
      }}
    >
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
  )
}

export default Modal
