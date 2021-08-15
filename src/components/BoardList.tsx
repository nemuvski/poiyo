import React, { useEffect, useState } from 'react';
import { Board, buildBoardQueryParams } from '../libs/models/Board';
import BoardItem from './BoardItem';
import CompactLoading from './CompactLoading';
import SentryTracking from '../utilities/SentryTracking';
import notFound from '../assets/not-found.svg';
import { useGetBoardsMutation } from '../stores/board/api';
import '../styles/components/board-list.scss';

type Props = {
  keyword?: string;
  accountId?: string;
};

const BoardList: React.FC<Props> = ({ accountId, keyword }) => {
  const [getBoards, { isLoading }] = useGetBoardsMutation();
  const [boardList, setBoardList] = useState<Array<Board> | null>(null);
  const [nextPage, setNextPage] = useState(-1);

  const getResources = async (targetPage: number, initialize = false) => {
    try {
      const boards = await getBoards(buildBoardQueryParams(targetPage, accountId, keyword)).unwrap();
      const { items, nextPage } = boards;
      setBoardList(!initialize && boardList ? boardList.concat(items) : items);
      setNextPage(nextPage ?? -1);
    } catch {
      setBoardList(null);
      setNextPage(-1);
      SentryTracking.exception('ボードデータの取得時にエラーが発生しました。');
    }
  };

  useEffect(() => {
    setBoardList(null);
    getResources(1, true);
  }, [keyword, accountId]);

  return (
    <div className='board-list'>
      {boardList &&
        (boardList.length === 0 ? (
          <p className='board-list__not-found'>
            <img alt='何も見つかりませんでした。' src={notFound} />
            ボードが見つかりませんでした。
          </p>
        ) : (
          boardList.map((board) => {
            return <BoardItem key={board.boardId} board={board} />;
          })
        ))}
      {isLoading && <CompactLoading />}
      {nextPage > 0 && (
        <div className='board-list__more'>
          <button
            type='button'
            disabled={isLoading}
            onClick={() => {
              if (nextPage > 0) {
                getResources(nextPage);
              }
            }}
          >
            さらにボードを読み込む
          </button>
        </div>
      )}
    </div>
  );
};

export default React.memo(BoardList);
