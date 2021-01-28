import React, {useEffect, useState} from 'react';
import {Board, Boards} from "../libs/models/Board";

type Props = {
  resource: Boards | null;
};

const BoardList: React.FC<Props> = (props: Props) => {
  const [boards, setBoards] = useState<Array<Board>>([]);

  console.log('BoardList');

  // ここの処理は、ページャーにするかどうするか検討.
  useEffect(() => {
    if (!props.resource) {
      setBoards([]);
      return;
    }
    setBoards(props.resource.items);
  }, [props.resource]);

  // TODO: 0件のときの表示を考える.
  return (
    <div className="board-list">
      {boards.map((board) => {
        return (<div key={board.boardId}>{board.title}</div>);
      })}
    </div>
  );
}

export default BoardList;
