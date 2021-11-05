import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Board, BoardLocationState } from '~/models/Board'
import Dayjs, { formatYMDHm } from '~/libs/Dayjs'
import CompactLoading from '~/components/CompactLoading'
import ShadowBox from '~/components/ShadowBox'
import { convertMarkdownTextToHTML } from '~/libs/DOMPurify'
import settingsIcon from '~/assets/icons/settings.svg'
import SentryTracking from '~/utilities/SentryTracking'
import { selectAccount } from '~/stores/account/selector'
import { useModal } from '~/hooks/useModal'
import { ModalName } from '~/stores/modal/slice'
import DeleteBoardConfirmModal from '~/components/modals/DeleteBoardConfirmModal'
import { useDeleteBoardMutation } from '~/stores/board/api'
import '~/styles/components/board-card.scss'

type Props = {
  board: Board | null
}

const BoardCard: React.FC<Props> = ({ board }) => {
  const navigate = useNavigate()
  const account = useSelector(selectAccount)
  const { openModal, closeModal } = useModal(ModalName.DELETE_BOARD_CONFIRM)
  const [isOpenActions, setIsOpenActions] = useState(false)
  const [deleteBoard] = useDeleteBoardMutation()

  const handleDeleteButtonClick = () => {
    if (!board) {
      console.error('処理中に問題があたったため、ボードの削除処理は中断されました。')
      SentryTracking.exception('処理中に問題があたったため、ボードの削除処理は中断されました。')
      return
    }
    deleteBoard(board.boardId)
      .unwrap()
      .catch(() => {
        console.error('ボード削除に失敗しました。')
        SentryTracking.exception('ボード削除に失敗しました。')
      })
      .finally(() => {
        navigate('/search', { replace: true })
      })
  }

  return (
    <div className='board-card'>
      <ShadowBox>
        {board ? (
          <div className='board-card__inner'>
            <h1 className='board-card__title'>{board.title}</h1>
            <div className='board-card__meta'>
              {account && account.id === board.ownerAccountId && (
                <div className='board-card__action-area'>
                  <div className='board-card__toggle' onClick={() => setIsOpenActions(!isOpenActions)}>
                    <img alt='設定' title='編集/削除のメニューを開閉をします。' src={settingsIcon} />
                  </div>
                  {isOpenActions && (
                    <ul className='board-card__actions'>
                      <li
                        onClick={() => {
                          navigate('/edit-board', { state: { board } as BoardLocationState })
                        }}
                      >
                        編集
                      </li>
                      <li
                        onClick={() => {
                          setIsOpenActions(false)
                          openModal()
                        }}
                      >
                        削除
                      </li>
                    </ul>
                  )}
                </div>
              )}
              <time className='board-card__date'>{formatYMDHm(Dayjs(board.createdTimestamp))}</time>
            </div>
            <div className='md board-card__body' dangerouslySetInnerHTML={convertMarkdownTextToHTML(board.body)} />
          </div>
        ) : (
          <CompactLoading />
        )}
      </ShadowBox>

      <DeleteBoardConfirmModal okAction={() => handleDeleteButtonClick()} cancelAction={() => closeModal()} />
    </div>
  )
}

export default BoardCard
