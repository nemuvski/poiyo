import React from 'react';
import { Link } from 'react-router-dom';
import { Board, BoardLocationState } from '../models/Board';
import Dayjs, { formatYMDHm } from '../libs/Dayjs';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { selectAccount } from '../stores/account/selector';
import '../styles/components/board-item.scss';

type Props = {
  board: Board;
};

const BoardItem: React.FC<Props> = (props: Props) => {
  const account = useSelector(selectAccount);

  return (
    <div className='board-item'>
      <Link
        to={{
          pathname: `/board/${props.board.boardId}`,
          state: { board: props.board } as BoardLocationState,
        }}
        className={clsx([
          'board-item__link',
          { 'is-mine': account && account.id && account.id == props.board.ownerAccountId },
        ])}
      >
        <span className='board-item__title'>{props.board.title}</span>
        <time className='board-item__date'>{formatYMDHm(Dayjs(props.board.createdTimestamp))}</time>
      </Link>
    </div>
  );
};

export default BoardItem;
