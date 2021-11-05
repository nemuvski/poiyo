import React from 'react'
import { Link } from 'react-router-dom'
import { Board } from '../models/Board'
import Dayjs, { formatYMDHm } from '../libs/Dayjs'
import clsx from 'clsx'
import { useSelector } from 'react-redux'
import { selectAccount } from '../stores/account/selector'
import '../styles/components/board-item.scss'

type Props = {
  board: Board
}

const BoardItem: React.FC<Props> = ({ board }) => {
  const account = useSelector(selectAccount)

  return (
    <div className='board-item'>
      <Link
        to={`/board/${board.boardId}`}
        className={clsx([
          'board-item__link',
          { 'is-mine': account && account.id && account.id == board.ownerAccountId },
        ])}
      >
        <span className='board-item__title'>{board.title}</span>
        <time className='board-item__date'>{formatYMDHm(Dayjs(board.createdTimestamp))}</time>
      </Link>
    </div>
  )
}

export default React.memo(BoardItem)
