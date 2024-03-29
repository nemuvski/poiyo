import React, { useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import NotFoundPage from '~/pages/NotFoundPage'
import BoardCard from '~/components/BoardCard'
import { usePageTitle } from '~/hooks/usePageTitle'
import CompactLoading from '~/components/CompactLoading'
import commentIcon from '~/assets/icons/comment.svg'
import CommentList from '~/components/CommentList'
import CommentFormModal from '~/components/modals/CommentFormModal'
import DeleteCommentConfirmModal from '~/components/modals/DeleteCommentConfirmModal'
import { ModalName } from '~/stores/modal/slice'
import { useModal } from '~/hooks/useModal'
import { useOperatingComment } from '~/hooks/useOperatingComment'
import { useGetBoardQuery } from '~/stores/board/api'
import { clearCommentListCurrentPage } from '~/stores/comment/slice'
import '~/styles/pages/page-board-detail.scss'

type Params = {
  bid: string
}

const BoardDetailPage: React.FC = () => {
  usePageTitle('ボード')
  const { bid } = useParams() as Params
  const dispatch = useDispatch()
  const { clearOperatingComment } = useOperatingComment()
  const { openModal } = useModal(ModalName.COMMENT_FORM)
  const { data, isLoading, isError } = useGetBoardQuery(bid)

  useEffect(() => {
    // ページから離れる時にコメント一覧の現在のページをリセットする
    return () => {
      dispatch(clearCommentListCurrentPage())
    }
  }, [dispatch])

  const handleOpenCommentFormModal = useCallback(() => {
    clearOperatingComment()
    openModal()
  }, [clearOperatingComment, openModal])

  if (isLoading) {
    return <CompactLoading />
  }
  // ローディング後にエラー、またはデータがないという場合は404コンテンツを表示する
  if (isError || !data) {
    return <NotFoundPage />
  }

  return (
    <div className='page-board-detail'>
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
      <DeleteCommentConfirmModal board={data} />
    </div>
  )
}

export default BoardDetailPage
