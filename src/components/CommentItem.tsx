import React, { useContext, useState } from 'react';
import Dayjs, { formatYMDHm } from '../libs/Dayjs';
import { Comment } from '../models/Comment';
import { convertMarkdownTextToHTML } from '../libs/DOMPurify';
import { CommentListContext } from '../contexts/CommentListContext';
import settingsIcon from '../assets/icons/settings.svg';
import { useSelector } from 'react-redux';
import { selectAccount } from '../stores/account/selector';
import { useModal } from '../hooks/useModal';
import { ModalName } from '../stores/modal/slice';
import '../styles/components/comment-item.scss';

type Props = {
  comment: Comment;
};

const CommentItem: React.FC<Props> = (props: Props) => {
  const account = useSelector(selectAccount);
  const { setupOperatingComment } = useContext(CommentListContext);
  const [isOpenActions, setIsOpenActions] = useState(false);
  const commentFormModal = useModal(ModalName.COMMENT_FORM);
  const deleteCommentConfirmModal = useModal(ModalName.DELETE_COMMENT_CONFIRM);

  const handleEditButtonClick = () => {
    // 操作対象のCommentオブジェクトを設定することで、コメント編集フォームに反映される.
    setupOperatingComment(props.comment);
    setIsOpenActions(false);
    commentFormModal.openModal();
  };

  const handleDeleteButtonClick = () => {
    setupOperatingComment(props.comment);
    setIsOpenActions(false);
    deleteCommentConfirmModal.openModal();
  };

  return (
    <div className='comment-item'>
      <div className='md comment-item__body' dangerouslySetInnerHTML={convertMarkdownTextToHTML(props.comment.body)} />
      <time className='comment-item__date'>{formatYMDHm(Dayjs(props.comment.createdTimestamp))}</time>

      {props.comment.ownerAccountId == account?.id && (
        <div className='comment-item__action-area'>
          <div className='comment-item__toggle' onClick={() => setIsOpenActions(!isOpenActions)}>
            <img alt='設定' title='編集/削除のメニューを開閉をします。' src={settingsIcon} />
          </div>
          {isOpenActions && (
            <ul className='comment-item__actions'>
              <li onClick={() => handleEditButtonClick()}>編集</li>
              <li onClick={() => handleDeleteButtonClick()}>削除</li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
