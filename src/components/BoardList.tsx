import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Board, BoardListProps} from "../libs/models/Board";
import BoardItem from "./BoardItem";
import BoardsService from "../libs/services/BoardsService";
import {AuthenticationContext} from "../contexts/AuthenticationContext";
import CompactLoading from "./CompactLoading";
import '../styles/components/board-list.scss';

const BoardList: React.FC<BoardListProps> = (props: BoardListProps) => {
  const { account } = useContext(AuthenticationContext);
  const [boardList, setBoardList] = useState<Array<Board> | null>(null);
  const [loading, setLoading] = useState(false);
  const [nextPage, setNextPage] = useState(-1);

  const getResources = async (targetPage: number) => {
    if (!(account && account.token)) {
      throw new Error('アカウント情報がないため、検索できませんでした。');
    }
    return await BoardsService.get(account.token, props.keyword, props.accountId, targetPage);
  };

  const handleClickMore = useCallback(() => {
    setLoading(true);
    getResources(nextPage)
      .then(resources => {
        setBoardList(boardList != null ? boardList.concat(resources.items) : resources.items);
        setNextPage(resources.nextPage ? resources.nextPage : -1);
      })
      .catch(error => {
        console.error(error);
        setBoardList([]);
        setNextPage(-1);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [props.keyword, props.accountId, nextPage]);

  useEffect(() => {
    setLoading(true);
    setBoardList(null);
    getResources(1)
      .then(resources => {
        setBoardList(resources.items);
        setNextPage(resources.nextPage ? resources.nextPage : -1);
      })
      .catch(error => {
        console.error(error);
        setBoardList(null);
        setNextPage(-1);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [props.keyword, props.accountId]);

  return (
    <div className="board-list">
      {boardList != null && (
        boardList.length == 0
          ? <p className="board-list__not-found">ボードが見つかりませんでした。</p>
          : boardList.map((board) => {
            return (<BoardItem key={board.boardId} board={board} />);
          })
      )}

      {loading && <CompactLoading />}

      {(boardList != null && nextPage >= 1) && (
        <div className="board-list__more">
          <button type="button" onClick={handleClickMore} disabled={loading}>さらにボードを読み込む</button>
        </div>
      )}
    </div>
  );
};

export default React.memo(BoardList);
