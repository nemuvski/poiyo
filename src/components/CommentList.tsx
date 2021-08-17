import React, { useEffect, useState } from 'react';
import CompactLoading from './CompactLoading';
import CommentItem from './CommentItem';
import notFound from '../assets/not-found.svg';
import SentryTracking from '../utilities/SentryTracking';
import { Board } from '../models/Board';
import { useGetCommentsLazyQuery } from '../stores/comment/api';
import { buildCommentsQueryParams, Comment } from '../models/Comment';
import '../styles/components/comment-list.scss';

type Props = {
  board: Board;
};

const CommentList: React.FC<Props> = ({ board }) => {
  const [getCommentsTrigger, { data: fetchedData, isLoading, isFetching, error }] = useGetCommentsLazyQuery();
  const [commentList, setCommentList] = useState<Array<Comment> | null>(null);
  const [nextPage, setNextPage] = useState(-1);
  const [clickedMoreButton, setClickedMoreButton] = useState(false);

  // 初期表示の処理
  useEffect(() => {
    getCommentsTrigger(buildCommentsQueryParams(1, board.boardId));
  }, []);
  // コメント取得時にエラーが発生した場合の処理
  useEffect(() => {
    if (error) {
      setCommentList(null);
      setNextPage(-1);
      SentryTracking.exception('コメントデータの取得時にエラーが発生しました。');
    }
  }, [error]);
  // 取得したデータが変わったときの処理
  useEffect(() => {
    if (fetchedData) {
      setCommentList(commentList && clickedMoreButton ? commentList.concat(fetchedData.items) : fetchedData.items);
      setNextPage(fetchedData.nextPage ?? -1);
      setClickedMoreButton(false);
    }
  }, [fetchedData]);

  return (
    <div className='comment-list'>
      {commentList &&
        (commentList.length === 0 ? (
          <p className='comment-list__not-found'>
            <img alt='何も見つかりませんでした。' src={notFound} />
            まだコメントされていません。
          </p>
        ) : (
          commentList.map((comment) => {
            return <CommentItem key={comment.commentId} comment={comment} />;
          })
        ))}
      {(isLoading || isFetching) && <CompactLoading />}
      {commentList && nextPage > 0 && (
        <div className='comment-list__more'>
          <button
            type='button'
            disabled={isFetching}
            onClick={() => {
              setClickedMoreButton(true);
              getCommentsTrigger(buildCommentsQueryParams(nextPage, board.boardId));
            }}
          >
            さらにコメントを読み込む
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentList;
