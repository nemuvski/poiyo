import React, {useEffect, useState} from 'react';
import {Board, Boards} from "../libs/models/Board";
import BoardItem from "./BoardItem";

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
      {boards.length == 0
        ? <p className="board-list__not-found">ボードが見つかりませんでした。</p>
        : boards.map((board) => {
          return (<BoardItem key={board.boardId} board={board} />);
        })
      }
    </div>
  );
}

export default BoardList;
