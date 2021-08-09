import React, { useCallback, useEffect, useState } from 'react';
import { Board, BoardListProps } from '../libs/models/Board';
import BoardItem from './BoardItem';
import BoardsService from '../libs/services/BoardsService';
import CompactLoading from './CompactLoading';
import SentryTracking from '../utilities/SentryTracking';
import notFound from '../assets/not-found.svg';
import { useSelector } from 'react-redux';
import { selectAccount } from '../stores/account/selector';
import '../styles/components/board-list.scss';

const BoardList: React.FC<BoardListProps> = (props: BoardListProps) => {
  const account = useSelector(selectAccount);
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
      .then((resources) => {
        setBoardList(boardList != null ? boardList.concat(resources.items) : resources.items);
        setNextPage(resources.nextPage ? resources.nextPage : -1);
      })
      .catch((error) => {
        SentryTracking.exception(error);
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
      .then((resources) => {
        setBoardList(resources.items);
        setNextPage(resources.nextPage ? resources.nextPage : -1);
      })
      .catch((error) => {
        SentryTracking.exception(error);
        setBoardList(null);
        setNextPage(-1);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [props.keyword, props.accountId]);

  return (
    <div className='board-list'>
      {boardList != null &&
        (boardList.length == 0 ? (
          <p className='board-list__not-found'>
            <img alt='何も見つかりませんでした。' src={notFound} />
            ボードが見つかりませんでした。
          </p>
        ) : (
          boardList.map((board) => {
            return <BoardItem key={board.boardId} board={board} />;
          })
        ))}

      {loading && <CompactLoading />}

      {boardList != null && nextPage >= 1 && (
        <div className='board-list__more'>
          <button type='button' onClick={() => handleClickMore()} disabled={loading}>
            さらにボードを読み込む
          </button>
        </div>
      )}
    </div>
  );
};

export default React.memo(BoardList);
