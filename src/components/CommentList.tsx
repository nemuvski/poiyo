import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CompactLoading from '~/components/CompactLoading'
import CommentItem from '~/components/CommentItem'
import SentryTracking from '~/utilities/SentryTracking'
import notFound from '~/assets/not-found.svg'
import { selectCommentListCurrentPage } from '~/stores/comment/selector'
import { Board } from '~/models/Board'
import { useGetCommentsLazyQuery } from '~/stores/comment/api'
import { buildCommentsQueryParams, Comment } from '~/models/Comment'
import Pagination from '~/components/Pagination'
import { setCommentListCurrentPage } from '~/stores/comment/slice'
import '~/styles/components/comment-list.scss'

type Props = {
  board: Board
}

const CommentList: React.FC<Props> = ({ board }) => {
  const dispatch = useDispatch()
  const commentListCurrentPage = useSelector(selectCommentListCurrentPage)
  const [getCommentsTrigger, { isLoading, isFetching, error, data: fetchedComments }] = useGetCommentsLazyQuery()
  const [commentList, setCommentList] = useState<Array<Comment>>([])
  const [prevPage, setPrevPage] = useState<number | undefined>()
  const [nextPage, setNextPage] = useState<number | undefined>()

  // 初期表示時の処理
  useEffect(() => {
    getCommentsTrigger(buildCommentsQueryParams(commentListCurrentPage, board.boardId))
  }, [commentListCurrentPage])
  // 取得したデータが変わったときの処理
  useEffect(() => {
    if (fetchedComments) {
      setPrevPage(fetchedComments.currentPage - 1 < 1 ? undefined : fetchedComments.currentPage - 1)
      setNextPage(fetchedComments.nextPage)
      setCommentList(fetchedComments.items)
    }
  }, [fetchedComments])
  // エラー発生時の処理
  useEffect(() => {
    if (error) {
      console.error('コメント取得時に問題が発生したため、処理を中断します。', error)
      SentryTracking.exception('コメント取得時に問題が発生したため、処理を中断します。')
    }
  }, [error])

  return (
    <div className='comment-list'>
      {isLoading || isFetching ? (
        <CompactLoading />
      ) : commentList.length ? (
        <>
          <Pagination
            prevPage={prevPage}
            nextPage={nextPage}
            prevButtonAction={() => dispatch(setCommentListCurrentPage(prevPage ?? 0))}
            nextButtonAction={() => dispatch(setCommentListCurrentPage(nextPage ?? 0))}
          />
          <div className='comment-list__content'>
            {commentList.map((comment) => (
              <CommentItem key={comment.commentId} comment={comment} />
            ))}
          </div>
          <Pagination
            prevPage={prevPage}
            nextPage={nextPage}
            prevButtonAction={() => dispatch(setCommentListCurrentPage(prevPage ?? 0))}
            nextButtonAction={() => dispatch(setCommentListCurrentPage(nextPage ?? 0))}
          />
        </>
      ) : (
        <p className='comment-list__not-found'>
          <img alt='何も見つかりませんでした。' src={notFound} />
          まだコメントされていません。
        </p>
      )}
    </div>
  )
}

export default CommentList
