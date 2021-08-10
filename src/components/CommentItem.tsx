import React, { useContext, useState } from 'react';
import Dayjs, { formatYMDHm } from '../libs/common/Dayjs';
import { Comment } from '../libs/models/Comment';
import { convertMarkdownTextToHTML } from '../libs/common/DOMPurify';
import { CommentListContext } from '../contexts/CommentListContext';
import { ModalContext } from '../contexts/ModalContext';
import settingsIcon from '../assets/icons/settings.svg';
import { useSelector } from 'react-redux';
import { selectAccount } from '../stores/account/selector';
import { ModalName } from './modals/Modal';
import '../styles/components/comment-item.scss';

type Props = {
  comment: Comment;
};

const CommentItem: React.FC<Props> = (props: Props) => {
  const account = useSelector(selectAccount);
  const { setupOperatingComment } = useContext(CommentListContext);
  const [isOpenActions, setIsOpenActions] = useState(false);
  const { openModal } = useContext(ModalContext);

  const handleEditButtonClick = () => {
    // 操作対象のCommentオブジェクトを設定することで、コメント編集フォームに反映される.
    setupOperatingComment(props.comment);
    setIsOpenActions(false);
    openModal(ModalName.COMMENT_FORM);
  };

  const handleDeleteButtonClick = () => {
    setupOperatingComment(props.comment);
    setIsOpenActions(false);
    openModal(ModalName.DELETE_COMMENT_CONFIRM);
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
