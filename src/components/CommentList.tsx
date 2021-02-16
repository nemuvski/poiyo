import React, {useContext, useEffect} from 'react';
import {CommentListProps} from "../libs/models/Comment";
import CompactLoading from "./CompactLoading";
import CommentItem from "./CommentItem";
import {CommentListContext} from "../contexts/CommentListContext";
import notFound from "../assets/not-found.svg";
import "../styles/components/comment-list.scss";
import Confirm from "./Confirm";
import Modal from "./Modal";
import {ModalContext} from "../contexts/ModalContext";
import SentryTracking from "../utilities/SentryTracking";

const CommentList: React.FC<CommentListProps> = (props: CommentListProps) => {
  const {
    commentList,
    nextPage,
    loading,
    loadLatestPage,
    loadNextPage
  } = useContext(CommentListContext);
  const { closeModal } = useContext(ModalContext);
  const { deleteComment } = useContext(CommentListContext);

  const handleDeleteButtonClick = () => {
    deleteComment()
      .catch(error => {
        SentryTracking.exception(error);
      })
      .finally(() => {
        closeModal('delete-comment');
      });
  };

  useEffect(() => {
    loadLatestPage(props.board.boardId);
  }, [])

  return (
    <>
      <div className="comment-list">
        {commentList != null && (
          commentList.length == 0
            ? (
              <p className="comment-list__not-found">
                <img alt="何も見つかりませんでした。" src={notFound} />
                まだコメントされていません。
              </p>
            )
            : commentList.map((comment) => {
              return (<CommentItem key={comment.commentId} comment={comment} />);
            })
        )}

        {loading && <CompactLoading />}

        {(commentList != null && nextPage >= 1) && (
          <div className="comment-list__more">
            <button type="button" onClick={() => loadNextPage(props.board.boardId)}>さらにコメントを読み込む</button>
          </div>
        )}
      </div>

      <Modal name="delete-comment">
        <Confirm
          message="コメントを削除しますがよろしいですか？"
          cancelAction={() => closeModal('delete-comment')}
          okAction={() => handleDeleteButtonClick()}
          okLabel="削除"
        />
      </Modal>
    </>
  );
};

export default CommentList;
