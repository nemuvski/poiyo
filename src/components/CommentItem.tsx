import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import Dayjs, { formatYMDHm } from '~/libs/Dayjs'
import { Comment } from '~/models/Comment'
import { convertMarkdownTextToHTML } from '~/libs/DOMPurify'
import settingsIcon from '~/assets/icons/settings.svg'
import { selectAccount } from '~/stores/account/selector'
import { useModal } from '~/hooks/useModal'
import { ModalName } from '~/stores/modal/slice'
import { useOperatingComment } from '~/hooks/useOperatingComment'
import '~/styles/components/comment-item.scss'

type Props = {
  comment: Comment
}

const CommentItem: React.FC<Props> = ({ comment }) => {
  const account = useSelector(selectAccount)
  const { setOperatingComment } = useOperatingComment()
  const [isOpenActions, setIsOpenActions] = useState(false)
  const commentFormModal = useModal(ModalName.COMMENT_FORM)
  const deleteCommentConfirmModal = useModal(ModalName.DELETE_COMMENT_CONFIRM)

  const handleEditButtonClick = useCallback(() => {
    // 操作対象のCommentオブジェクトを設定することで、コメント編集フォームに反映される.
    setOperatingComment(comment)
    setIsOpenActions(false)
    commentFormModal.openModal()
  }, [comment, setOperatingComment, commentFormModal])

  const handleDeleteButtonClick = useCallback(() => {
    setOperatingComment(comment)
    setIsOpenActions(false)
    deleteCommentConfirmModal.openModal()
  }, [comment, setOperatingComment, deleteCommentConfirmModal])

  return (
    <div className='comment-item'>
      <div className='md comment-item__body' dangerouslySetInnerHTML={convertMarkdownTextToHTML(comment.body)} />
      <time className='comment-item__date'>{formatYMDHm(Dayjs(comment.createdTimestamp))}</time>

      {comment.ownerAccountId == account?.id && (
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
  )
}

export default CommentItem
