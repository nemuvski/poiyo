import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Comment, CommentListProps} from "../libs/models/Comment";
import {AuthenticationContext} from "../contexts/AuthenticationContext";
import CommentsService from "../libs/services/CommentsService";
import CompactLoading from "./CompactLoading";
import "../styles/components/comment-list.scss";
import CommentItem from "./CommentItem";

const CommentList: React.FC<CommentListProps> = (props: CommentListProps) => {
  const { account } = useContext(AuthenticationContext);
  const [commentList, setCommentList] = useState<Array<Comment> | null>(null);
  const [loading, setLoading] = useState(false);
  const [nextPage, setNextPage] = useState(-1);

  const handleClickMore = useCallback(() => {
    setLoading(true);
    getResources(nextPage)
      .then(resources => {
        setCommentList(commentList != null ? commentList.concat(resources.items) : resources.items);
        setNextPage(resources.nextPage ? resources.nextPage : -1);
      })
      .catch(error => {
        console.error(error);
        setCommentList([]);
        setNextPage(-1);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [nextPage])

  const getResources = async (targetPage: number) => {
    if (!(account && account.token)) {
      throw new Error('アカウント情報がないため、データを取得できませんでした。');
    }
    return await CommentsService.get(account.token, props.board.boardId, targetPage);
  };

  useEffect(() => {
    setLoading(true);
    getResources(1)
      .then(resources => {
        setCommentList(resources.items);
        setNextPage(resources.nextPage ? resources.nextPage : -1);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [])

  return (
    <div className="comment-list">
      {commentList != null && (
        commentList.length == 0
          ? <p className="comment-list__not-found">コメントはまだされていません。</p>
          : commentList.map((comment) => {
            return (<CommentItem key={comment.commentId} comment={comment} />);
          })
      )}

      {loading && <CompactLoading />}

      {(commentList != null && nextPage >= 1) && (
        <div className="comment-list__more">
          <button type="button" onClick={handleClickMore}>さらにコメントを読み込む</button>
        </div>
      )}
    </div>
  );
};

export default React.memo(CommentList);
