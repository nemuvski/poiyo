import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectOperatingComment } from '~/stores/comment/selector'
import { Comment } from '~/models/Comment'
import { clearOperatingComment, setOperatingComment } from '~/stores/comment/slice'

export const useOperatingComment = (): {
  operatingComment: Comment | null
  setOperatingComment: (comment: Comment) => void
  clearOperatingComment: () => void
} => {
  const dispatch = useDispatch()
  const operatingComment = useSelector(selectOperatingComment)

  const setOperatingCommentAction = useCallback(
    (comment) => {
      dispatch(setOperatingComment(comment))
    },
    [dispatch]
  )

  const clearOperatingCommentAction = useCallback(() => {
    dispatch(clearOperatingComment())
  }, [dispatch])

  useEffect(
    () => () => {
      dispatch(clearOperatingComment())
    },
    [dispatch]
  )

  return {
    operatingComment,
    setOperatingComment: setOperatingCommentAction,
    clearOperatingComment: clearOperatingCommentAction,
  }
}
