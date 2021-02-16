import React, {useContext, useState} from 'react';
import Dayjs, {formatYMD} from '../libs/common/Dayjs';
import {Comment} from "../libs/models/Comment";
import {convertMarkdownTextToHTML} from "../libs/common/DOMPurify";
import {AuthenticationContext} from "../contexts/AuthenticationContext";
import {CommentListContext} from "../contexts/CommentListContext";
import {ModalContext} from "../contexts/ModalContext";
import settingsIcon from "../assets/icons/settings.svg";
import "../styles/components/comment-item.scss";
import SentryTracking from "../utilities/SentryTracking";
import Confirm from "./Confirm";
import Modal from "./Modal";

type Props = {
  comment: Comment;
};

const CommentItem: React.FC<Props> = (props: Props) => {
  const { account } = useContext(AuthenticationContext);
  const { deleteComment, setupOperatingComment } = useContext(CommentListContext);
  const [isOpenActions, setIsOpenActions] = useState(false);
  const {openModal, closeModal} = useContext(ModalContext);

  const handleEditButtonClick = () => {
    // 操作対象のCommentオブジェクトを設定することで、コメント編集フォームに反映される.
    setupOperatingComment(props.comment);
    setIsOpenActions(false);
    openModal('edit-comment');
  };

  const handleDeleteButtonClick = () => {
    deleteComment(props.comment)
      .catch(error => {
        SentryTracking.exception(error);
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
              <li onClick={() => handleEditButtonClick()}>編集</li>
              <li onClick={() => {setIsOpenActions(false); openModal('delete-comment');}}>削除</li>
            </ul>
          )}
        </div>
      )}
      <Modal name="delete-comment">
        <Confirm
          message="コメントを削除しますがよろしいですか？"
          cancelAction={() => closeModal('delete-comment')}
          okAction={() => handleDeleteButtonClick()}
          okLabel="削除"
        />
      </Modal>
    </div>
  );
}

export default CommentItem;
