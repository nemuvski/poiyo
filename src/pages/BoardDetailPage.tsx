import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { setDocumentTitle } from '../utilities/DocumentTitle';
import NotFoundPage from './NotFoundPage';
import BoardCard from '../components/BoardCard';
import commentIcon from '../assets/icons/comment.svg';
import CommentList from '../components/CommentList';
import CommentFormModal from '../components/modals/CommentFormModal';
import { CommentListContext } from '../contexts/CommentListContext';
import { ModalName } from '../stores/modal/slice';
import { useModal } from '../hooks/useModal';
import { useGetBoardQuery } from '../stores/board/api';
import '../styles/pages/page-board-detail.scss';

type Params = {
  bid: string;
};

const BoardDetailPage: React.FC = () => {
  const { bid } = useParams<Params>();
  const { setupOperatingComment } = useContext(CommentListContext);
  const { openModal } = useModal(ModalName.COMMENT_FORM);
  const { data } = useGetBoardQuery(bid);

  useEffect(() => {
    setDocumentTitle('ボード');
  }, []);

  const handleOpenCommentFormModal = () => {
    setupOperatingComment(null);
    openModal();
  };

  return (
    <div className='page-board-detail'>
      {data ? (
        <>
          <div className='page-board-detail__inner'>
            <div className='page-board-detail__card'>
              <BoardCard board={data} />
            </div>
            <div className='page-board-detail__comment-list'>
              <button
                type='button'
                className='page-board-detail__comment-button is-black'
                onClick={() => handleOpenCommentFormModal()}
              >
                <img aria-hidden='true' alt='コメント' title='コメントのフォームを開きます。' src={commentIcon} />
                ボードにコメントする
              </button>

              <CommentList board={data} />
            </div>
          </div>

          <button
            type='button'
            className='page-board-detail__fixed-comment-button is-black'
            onClick={() => handleOpenCommentFormModal()}
          >
            <img aria-hidden='true' alt='コメント' title='コメントのフォームを開きます。' src={commentIcon} />
          </button>

          <CommentFormModal board={data} />
        </>
      ) : (
        <NotFoundPage />
      )}
    </div>
  );
};

export default BoardDetailPage;
