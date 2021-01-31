import React, {useEffect, useState} from 'react';
import {Board, Boards} from "../libs/models/Board";
import Dayjs, {formatYMD} from '../libs/common/Dayjs';

type Props = {
  resource: Boards | null;
};

const BoardList: React.FC<Props> = (props: Props) => {
  const [boards, setBoards] = useState<Array<Board>>([]);

  // ここの処理は、ページャーにするかどうするか検討.
  useEffect(() => {
    if (!props.resource) {
      setBoards([]);
      return;
    }
    setBoards(props.resource.items);
  }, [props.resource]);

  return (
    <div className="board-list">
      {boards.map((board) => {
        return (<div key={board.boardId}>{board.title} {formatYMD(Dayjs(board.createdAt))}</div>);
      })}
    </div>
  );
}

export default BoardList;
