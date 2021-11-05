import React from 'react'
import '../styles/components/confirm.scss'

type Props = {
  message: string
  okLabel?: string
  okAction: () => void
  cancelLabel?: string
  cancelAction: () => void
}

const Confirm: React.FC<Props> = ({
  message,
  okLabel = '実行',
  okAction,
  cancelLabel = 'キャンセル',
  cancelAction,
}) => {
  return (
    <div className='confirm'>
      <p className='confirm__message'>{message}</p>
      <div className='confirm__actions'>
        <button
          className='confirm__button confirm__button--cancel is-white'
          type='button'
          onClick={() => cancelAction()}
        >
          {cancelLabel}
        </button>
        <button className='confirm__button confirm__button--ok is-red' type='button' onClick={() => okAction()}>
          {okLabel}
        </button>
      </div>
    </div>
  )
}

export default Confirm
