import React, {useContext, useState} from 'react';
import {useHistory} from "react-router-dom";
import Dayjs, {formatYMD} from '../libs/common/Dayjs';
import {Comment} from "../libs/models/Comment";
import {convertMarkdownTextToHTML} from "../libs/common/DOMPurify";
import {AuthenticationContext} from "../contexts/AuthenticationContext";
import {CommentListContext} from "../contexts/CommentListContext";
import CommentsService from "../libs/services/CommentsService";
import "../styles/components/comment-item.scss";
import settingsIcon from "../assets/icons/settings.svg";

type Props = {
  comment: Comment;
};

const CommentItem: React.FC<Props> = (props: Props) => {
  const history = useHistory();
  const { account } = useContext(AuthenticationContext);
  const { deleteComment } = useContext(CommentListContext);
  const [isOpenActions, setIsOpenActions] = useState(false);

  const handleDeleteButtonClick = () => {
    if (!account) {
      console.error('問題が発生したため処理を中断し、ダッシュボードへ遷移します。');
      history.replace('/dashboard');
      return;
    }
    if (!confirm('コメントを削除しますがよろしいですか？')) {
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
        <div className="comment-item__action-area">
          <div className="comment-item__toggle" onClick={() => setIsOpenActions(!isOpenActions)}>
            <img alt="設定" title="編集/削除のメニューを開閉をします。" src={settingsIcon} />
          </div>
          {isOpenActions && (
            <ul className="comment-item__actions">
              <li>編集</li>
              <li onClick={() => handleDeleteButtonClick()}>削除</li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default CommentItem;
