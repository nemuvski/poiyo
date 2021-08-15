import React, { useContext, useEffect } from 'react';
import { CommentListProps } from '../models/Comment';
import CompactLoading from './CompactLoading';
import CommentItem from './CommentItem';
import { CommentListContext } from '../contexts/CommentListContext';
import notFound from '../assets/not-found.svg';
import SentryTracking from '../utilities/SentryTracking';
import DeleteCommentConfirmModal from './modals/DeleteCommentConfirmModal';
import { useModal } from '../hooks/useModal';
import '../styles/components/comment-list.scss';

const CommentList: React.FC<CommentListProps> = (props: CommentListProps) => {
  const { closeModal } = useModal();
  const { commentList, nextPage, loading, loadLatestPage, loadNextPage, deleteComment } =
    useContext(CommentListContext);

  const handleDeleteButtonClick = () => {
    deleteComment()
      .catch((error) => {
        SentryTracking.exception(error);
      })
      .finally(() => {
        closeModal();
      });
  };

  useEffect(() => {
    loadLatestPage(props.board.boardId);
  }, []);

  return (
    <>
      <div className='comment-list'>
        {commentList != null &&
          (commentList.length == 0 ? (
            <p className='comment-list__not-found'>
              <img alt='何も見つかりませんでした。' src={notFound} />
              まだコメントされていません。
            </p>
          ) : (
            commentList.map((comment) => {
              return <CommentItem key={comment.commentId} comment={comment} />;
            })
          ))}

        {loading && <CompactLoading />}

        {commentList != null && nextPage >= 1 && (
          <div className='comment-list__more'>
            <button type='button' onClick={() => loadNextPage(props.board.boardId)}>
              さらにコメントを読み込む
            </button>
          </div>
        )}
      </div>

      <DeleteCommentConfirmModal okAction={() => handleDeleteButtonClick()} cancelAction={() => closeModal()} />
    </>
  );
};

export default CommentList;
