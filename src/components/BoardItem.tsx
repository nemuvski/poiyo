import React from 'react';
import {Link} from 'react-router-dom';
import {Board, BoardLocationState} from "../libs/models/Board";
import Dayjs, {formatYMD} from '../libs/common/Dayjs';
import '../styles/components/board-item.scss';

type Props = {
  board: Board;
};

const BoardItem: React.FC<Props> = (props: Props) => {
  return (
    <div className="board-item">
      <Link
        to={{
          pathname: `/board/${props.board.boardId}`,
          state: {board: props.board} as BoardLocationState,
        }}
        className="board-item__link"
      >
        <span className="board-item__title">{props.board.title}</span>
        <time className="board-item__date">
          {formatYMD(Dayjs(props.board.createdAt))}
        </time>
      </Link>
    </div>
  );
}

export default BoardItem;
