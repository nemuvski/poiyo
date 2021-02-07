import React, {useContext, useEffect} from 'react';
import {CommentListProps} from "../libs/models/Comment";
import CompactLoading from "./CompactLoading";
import CommentItem from "./CommentItem";
import {CommentListContext} from "../contexts/CommentListContext";
import "../styles/components/comment-list.scss";

const CommentList: React.FC<CommentListProps> = (props: CommentListProps) => {
  const {
    commentList,
    nextPage,
    loading,
    loadLatestPage,
    loadNextPage
  } = useContext(CommentListContext);

  useEffect(() => {
    loadLatestPage(props.board.boardId);
  }, [])

  return (
    <div className="comment-list">
      {commentList != null && (
        commentList.length == 0
          ? <p className="comment-list__not-found">まだコメントされていません。</p>
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
  );
};

export default CommentList;
