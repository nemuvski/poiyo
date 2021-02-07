import React, {useContext} from 'react';
import Dayjs, {formatYMD} from '../libs/common/Dayjs';
import {Comment} from "../libs/models/Comment";
import {convertMarkdownTextToHTML} from "../libs/common/DOMPurify";
import "../styles/components/comment-item.scss";
import {AuthenticationContext} from "../contexts/AuthenticationContext";
import {CommentListContext} from "../contexts/CommentListContext";
import CommentsService from "../libs/services/CommentsService";
import {useHistory} from "react-router-dom";

type Props = {
  comment: Comment;
};

const CommentItem: React.FC<Props> = (props: Props) => {
  const history = useHistory();
  const { account } = useContext(AuthenticationContext);
  const { deleteComment } = useContext(CommentListContext);

  const handleDeleteButtonClick = () => {
    if (!account) {
      console.error('問題が発生したため処理を中断し、ダッシュボードへ遷移します。');
      history.replace('/dashboard');
      return;
    }
    if (!confirm('ボードを削除しますがよろしいですか？')) {
      return;
    }
    deleteComment(props.comment);
    CommentsService.remove(account.token, props.comment.boardId, props.comment.commentId)
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="comment-item">
      <div className="md comment-item__body" dangerouslySetInnerHTML={convertMarkdownTextToHTML(props.comment.body)} />
      <time className="comment-item__date">
        {formatYMD(Dayjs(props.comment.createdAt))}
      </time>

      {props.comment.ownerAccountId == account?.id && (
        <div className="comment-item__actions">
          <button type="button">編集</button>
          <button type="button" className="is-red" onClick={() => handleDeleteButtonClick()}>削除</button>
        </div>
      )}
    </div>
  );
}

export default CommentItem;
